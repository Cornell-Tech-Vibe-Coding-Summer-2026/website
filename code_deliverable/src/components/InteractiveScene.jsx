import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { useControls } from 'leva'
import { easing } from 'maath'
import * as THREE from 'three'
import { SceneLayout } from './SceneLayout'
import { PhoneAnimation } from './PhoneAnimation'

// --- Hitbox Component ---
function Hitbox({ name, onHover, onUnhover, onClick, debug }) {
    // Defaults for different items (Updated with User values)
    const defaults = {
        'Paper Stack': { pos: [-0.76, 0.78, -0.57], scale: [0.34, 0.04, 0.28] }, // User Provided
        'Lamp': { pos: [-0.3, 0.98, -0.8], scale: [0.16, 0.52, 0.14] }, // User Provided
        'Phone': { pos: [-0.56, 0.79, -0.45], scale: [0.34, 0.04, 0.28] }, // User Provided
        // Book Removed as requested
    }

    // Leva controls
    const { position, scale, enabled } = useControls(`Hitboxes.${name}`, {
        enabled: { value: true, label: 'Active' },
        position: { value: defaults[name]?.pos || [0, 0, 0], step: 0.01 },
        scale: { value: defaults[name]?.scale || [0.1, 0.1, 0.1], step: 0.01 },
    })

    if (!enabled) return null

    return (
        <mesh
            position={position}
            onClick={(e) => {
                e.stopPropagation()
                if (onClick) onClick(e)
            }}
            onPointerOver={(e) => {
                e.stopPropagation()
                document.body.style.cursor = 'pointer'
                if (onHover) onHover(name)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                document.body.style.cursor = 'auto'
                if (onUnhover) onUnhover()
            }}
        >
            <boxGeometry args={scale} />
            <meshBasicMaterial
                color="red"
                transparent
                opacity={debug ? 0.3 : 0}
                wireframe={debug}
            />
        </mesh>
    )
}

export function InteractiveScene({
    onMonitorClick,
    onPhoneClick,
    onObjectClick,
    onToggleLight,
    onNotepadClick,
    view,
    overlayConfig,
    shadowConfig,
    onBack,
    setPhoneMesh,
    phoneMesh,
    onReadingClick,
    onPapersClick,
    paperStackPos
}) {
    const { scene } = useGLTF('/scene-unmerged.glb')

    // Debugging controls for Hitboxes
    const { debugHitboxes } = useControls('Debugging', {
        debugHitboxes: { value: true, label: 'Show Hitboxes' }
    })

    // Interaction State
    const [hoveredTarget, setHoveredTarget] = useState(null)

    // Helper to calculate screen position for zoom transitions
    const getScreenPos = (obj, camera) => {
        const vector = new THREE.Vector3()
        obj.getWorldPosition(vector)
        vector.project(camera)
        const x = (vector.x + 1) / 2 * window.innerWidth
        const y = -(vector.y - 1) / 2 * window.innerHeight
        return { x, y }
    }

    // Interactive Handler Wrappers
    const handlePaperClick = (e) => {
        const screenPos = getScreenPos(e.object, e.camera)
        onPapersClick(screenPos)
    }

    // Define clickable objects (Restored for Book, Notepad, Keyboard, Mouse)
    const clickableObjects = {
        'notepad': { handler: onNotepadClick, contains: ['notebook', 'notepad', 'notepad_plane'], excludes: ['stack', 'paper', 'papers'], lift: false },
        'keyboard': { handler: onMonitorClick, contains: ['keyboard', 'keys'], lift: true },
        'mouse': { handler: onMonitorClick, contains: ['mouse'], excludes: ['pad'], lift: true },
        'book': { handler: onReadingClick, contains: ['book', 'values', 'play'], excludes: ['notebook', 'phone', 'node003'], lift: true },
        // Phone, Lamp, Paper Stack handled by Hitboxes
    }

    // Fix: Lift Book and Notebook slightly to avoid Z-fighting/Occlusion with Desk
    useEffect(() => {
        scene.traverse((obj) => {
            const name = obj.name.toLowerCase()
            // Lift Book Group
            if (name.includes('book') || name.includes('values')) {
                // Apply to Groups or Meshes
                if (obj.isMesh || obj.type === 'Group') {
                    // Check if already corrected
                    if (!obj.userData.correctedHeight) {
                        obj.position.y += 0.015
                        obj.updateMatrixWorld()
                        obj.userData.correctedHeight = true
                    }
                }
            }
        })
    }, [scene])

    const contentRef = useRef()
    const stackRef = useRef()

    // Apply Paper Stack Position
    useFrame(() => {
        if (!stackRef.current) {
            const paperGroup = scene.getObjectByName('Paper')
            if (paperGroup) {
                stackRef.current = paperGroup
            } else {
                const stack = scene.getObjectByName('Paper_1') || scene.getObjectByName('Stack')
                if (stack) stackRef.current = stack
            }
        }
        // Sync Mesh Stack to Config
        if (paperStackPos && stackRef.current) {
            stackRef.current.position.set(...paperStackPos)
        }
    })

    // Animation Loop for Hover Lift
    const initialY = useRef({})

    useFrame((state, delta) => {
        scene.traverse((child) => {
            if (child.isMesh || child.type === 'Group') {
                let targetKey = null
                const name = child.name.toLowerCase()

                // Check classic clickable objects for lift
                for (const [key, config] of Object.entries(clickableObjects)) {
                    if (config.lift && config.contains.some(str => name.includes(str))) {
                        if (config.excludes && config.excludes.some(str => name.includes(str))) continue
                        targetKey = key
                        break
                    }
                }

                // Check Hitbox targets for lift
                if (!targetKey) {
                    if (name.includes('stack') || name.includes('paper')) targetKey = 'Paper Stack'
                    else if (name.includes('book') || name.includes('values')) targetKey = 'book' // using classic key 'book' for matching below
                }

                if (targetKey) {
                    if (initialY.current[child.uuid] === undefined) {
                        initialY.current[child.uuid] = child.position.y
                    }

                    // For Book, we use 'book' from classic or 'Book' from Hitbox
                    const isHovered = hoveredTarget === targetKey || (targetKey === 'book' && hoveredTarget === 'Book')

                    const targetY = isHovered
                        ? initialY.current[child.uuid] + 0.05 // Lift amount
                        : initialY.current[child.uuid]

                    // Smoothly damp to target
                    easing.damp(child.position, 'y', targetY, 0.1, delta)
                }
            }
        })
    })


    // Enable shadows on all meshes, fix materials, and disable raycasting on Hitbox items
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                const name = child.name.toLowerCase()

                // Disable raycasting for meshes purely covered by Hitboxes
                // This lets the raycaster pass right through the visible model and hit our invisible box
                const isHitboxItem = ['lamp', 'light', 'phone', 'screen', 'node003_1', 'stack', 'paper'].some(str => name.includes(str))
                const isSafeToDisable = isHitboxItem && !name.includes('notepad') && !name.includes('wall')

                if (isSafeToDisable) {
                    child.raycast = () => null
                }

                const isEnabled = shadowConfig.enabled
                const mode = shadowConfig.mode

                if (!isEnabled || mode === 'none') {
                    child.castShadow = false
                    child.receiveShadow = false
                } else if (mode === 'all') {
                    child.castShadow = true
                    child.receiveShadow = true
                } else if (mode === 'essential') {
                    const name = child.name.toLowerCase()
                    const isDesk = name.includes('desk') || name.includes('wall') || name.includes('floor')
                    const isKeyObject = name.includes('phone') || name.includes('monitor') || name.includes('lamp') || name.includes('book') || name.includes('keyboard') || name.includes('mouse') || name.includes('cup')
                    child.receiveShadow = true
                    child.castShadow = isKeyObject
                }

                if (child.material.type === 'MeshBasicMaterial') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: child.material.map,
                        color: child.material.color,
                        transparent: child.material.transparent,
                        opacity: child.material.opacity,
                        side: child.material.side,
                        roughness: 0.5,
                        metalness: 0.1
                    })
                }

                // Specific Polish Fixes for Coffee Cup
                if (name.includes('cup') || name.includes('mug')) {
                    if (child.geometry) {
                        child.geometry.computeVertexNormals() // Force smooth shading normals
                    }
                    if (child.material) {
                        child.material.roughness = 0.2 // Make it glossy
                        child.material.metalness = 0.0
                    }
                }

                if (child.material) {
                    child.material.envMapIntensity = 0.5
                    child.material.needsUpdate = true
                }
            }
        })
    }, [scene, shadowConfig])

    return (
        <group>
            {/* Added dampFactor to config for snappier animation */}
            <PhoneAnimation scene={scene} view={view} config={{ ...overlayConfig, dampFactor: 0.05, onPhoneFound: setPhoneMesh }} contentRef={contentRef} hovered={hoveredTarget === 'Phone'} />

            {/* Primitive Scene - Restore Generic Interactions for Untroubled Items */}
            <primitive
                object={scene}
                onClick={(e) => {
                    e.stopPropagation()
                    const clickedNode = e.object
                    const name = clickedNode.name.toLowerCase()

                    // Strict exclusion of environment meshes to prevent loose targeting
                    if (name.includes('desk') || name.includes('wall') || name.includes('floor')) {
                        return
                    }

                    let targetFound = false
                    let curr = e.object
                    while (curr) {
                        const currName = curr.name.toLowerCase()

                        for (const [key, config] of Object.entries(clickableObjects)) {
                            if (config.contains.some(str => currName.includes(str))) {
                                // Check excludes
                                if (config.excludes && config.excludes.some(str => currName.includes(str))) continue

                                // Calculate Screen Position for Transitions (Book/Notepad)
                                let screenPos = null
                                if (key === 'book' || key === 'notepad') {
                                    const vector = new THREE.Vector3()
                                    curr.getWorldPosition(vector)
                                    vector.project(e.camera)

                                    // Convert NDC to pixel coordinates
                                    const x = (vector.x + 1) / 2 * window.innerWidth
                                    const y = -(vector.y - 1) / 2 * window.innerHeight
                                    screenPos = { x, y }
                                }

                                config.handler(screenPos)
                                targetFound = true
                                break
                            }
                        }
                        if (targetFound) break
                        curr = curr.parent
                    }

                    if (!targetFound && onObjectClick) onObjectClick(clickedNode.name)
                }}
                onPointerOver={(e) => {
                    // Similar traversal logic for hover
                    e.stopPropagation()

                    // Disable hover interactions when zoomed in specific views
                    if (view === 'phone' || view === 'monitor') {
                        document.body.style.cursor = 'auto'
                        return
                    }

                    // Find hover target
                    let curr = e.object
                    while (curr) {
                        const name = curr.name.toLowerCase()

                        for (const [key, config] of Object.entries(clickableObjects)) {
                            if (config.contains.some(str => name.includes(str))) {
                                if (config.excludes && config.excludes.some(str => name.includes(str))) continue
                                document.body.style.cursor = 'pointer'
                                setHoveredTarget(key)
                                return
                            }
                        }
                        curr = curr.parent
                    }
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto'
                    setHoveredTarget(null)
                }}
            />

            {/* HITBOXES (The Robust Fix for Troubled Items) */}
            <Hitbox
                name="Paper Stack"
                debug={debugHitboxes}
                onClick={handlePaperClick}
                onHover={() => setHoveredTarget('Paper Stack')}
                onUnhover={() => setHoveredTarget(null)}
            />

            <Hitbox
                name="Lamp"
                debug={debugHitboxes}
                onClick={onToggleLight}
                onHover={() => setHoveredTarget('Lamp')}
                onUnhover={() => setHoveredTarget(null)}
            />

            <Hitbox
                name="Phone"
                debug={debugHitboxes}
                onClick={onPhoneClick}
                onHover={() => setHoveredTarget('Phone')}
                onUnhover={() => setHoveredTarget(null)}
            />

            {/* Visual Scene Layout for Content Planes */}
            <SceneLayout view={view} onBack={onBack} onPhoneClick={onPhoneClick} onMonitorClick={onMonitorClick} scene={scene} config={overlayConfig} phoneContentRef={contentRef} />
        </group>
    )
}
