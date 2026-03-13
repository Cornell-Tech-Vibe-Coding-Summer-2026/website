import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { useControls } from 'leva'
import { easing } from 'maath'
import * as THREE from 'three'
import { SceneLayout } from './SceneLayout'
import { PhoneAnimation } from './PhoneAnimation'

// --- Hitbox Component ---
function Hitbox({ name, onHover, onUnhover, onClick, debug, position, scale }) {
    // Defaults for different items (Updated with User values)
    const defaults = {
        'Paper Stack': { pos: [-0.76, 0.78, -0.57], scale: [0.327, 0.215, 0.279] },
        'Lamp': { pos: [-0.428, 0.997, -0.698], scale: [0.232, 0.536, 0.168] },
        'Phone': { pos: [-0.56, 0.81, -0.45], scale: [0.34, 0.08, 0.28] },
    }

    // Leva controls - use passed props as defaults
    const { position: finalPosition, scale: finalScale, enabled } = useControls(`Hitboxes.${name}`, {
        enabled: { value: true, label: 'Active' },
        position: { value: position || defaults[name]?.pos || [0, 0, 0], step: 0.001 },
        scale: { value: scale || defaults[name]?.scale || [0.1, 0.1, 0.1], step: 0.001 },
    })

    if (!enabled) return null

    return (
        <mesh
            position={finalPosition}
            onClick={(e) => {
                e.stopPropagation()
                if (onClick) onClick(e)
            }}
            onPointerOver={(e) => {
                if (onHover) {
                    e.stopPropagation()
                    document.body.style.cursor = 'pointer'
                    onHover(name)
                }
            }}
            onPointerOut={(e) => {
                if (onHover) {
                    e.stopPropagation()
                    document.body.style.cursor = 'auto'
                    if (onUnhover) onUnhover()
                }
            }}
        >
            <boxGeometry args={finalScale} />
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
    paperStackPos,
    setShowLeva
}) {
    const { scene } = useGLTF('/scene-unmerged.glb')

    // Debugging and Specialized controls
    const { debugHitboxes } = useControls('Debugging', {
        debugHitboxes: { value: false, label: 'Show Hitboxes' }
    })

    const notebookConfig = useControls('Notebook Tuning', {
        position: { value: [-0.038, 3.985, 0.89], step: 0.001 },
        rotation: { value: [3.58, -3.17, 0], step: 0.01 },
        scale: { value: 1.0, step: 0.01 }
    })

    // Interaction State
    const [hoveredTarget, setHoveredTarget] = useState(null)
    const liftableMeshes = useRef([])
    const initialY = useRef({})

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

    // Define clickable objects
    const clickableObjects = {
        // Phone: only match the phone body/group - no 'screen' to avoid extending hover to right/bottom
        'Phone': { handler: onPhoneClick, contains: ['phone', 'smartphone'], excludes: ['desk', 'table', 'keyboard', 'mouse'], lift: false },
        'notepad': { handler: onNotepadClick, contains: ['notebook', 'notepad', 'notepad_plane'], excludes: ['stack', 'paper', 'papers'], lift: false },
        'keyboard': { handler: onMonitorClick, contains: ['keyboard', 'keys'], lift: true },
        'mouse': { handler: onMonitorClick, contains: ['mouse'], excludes: ['pad'], lift: true },
        'book': { handler: onReadingClick, contains: ['book', 'values', 'play'], excludes: ['notebook', 'phone', 'node003'], lift: true },
        'Lamp': { handler: onToggleLight, contains: ['lamp', 'bulb', 'light'], excludes: ['floor', 'spot'], lift: false },
    }

    // 1. Initial Traversal: Cache meshes for lift and apply fixed transforms
    useEffect(() => {
        const meshes = []

        // Pre-seed with exact named containers discovered from GLTF inspection.
        // These are seeded FIRST so the traversal's dedup check skips all child meshes.
        // 'Keyboard' is an Object3D containing all key meshes.
        // 'Paper' is a Group containing all paper sheet meshes.
        const namedRoots = [
            { name: 'Keyboard', key: 'keyboard' },
            { name: 'Paper',    key: 'Paper Stack' },
        ]
        for (const { name, key } of namedRoots) {
            const found = scene.getObjectByName(name)
            if (found) {
                meshes.push({ node: found, key })
                if (initialY.current[found.uuid] === undefined) {
                    initialY.current[found.uuid] = found.position.y
                }
            }
        }

        scene.traverse((obj) => {
            const name = obj.name.toLowerCase()

            // Fix: Lift Book Group
            if (name.includes('book') || name.includes('values')) {
                if (obj.isMesh || obj.type === 'Group') {
                    if (!obj.userData.correctedHeight) {
                        obj.position.y += 0.015
                        obj.updateMatrixWorld()
                        obj.userData.correctedHeight = true
                    }
                }
            }

            // Performance: Filter meshes for lift animation
            if (obj.isMesh || obj.type === 'Group') {
                let targetKey = null
                for (const [key, config] of Object.entries(clickableObjects)) {
                    if (config.lift && config.contains.some(str => name.includes(str))) {
                        if (config.excludes && config.excludes.some(str => name.includes(str))) continue
                        targetKey = key
                        break
                    }
                }
                if (!targetKey) {
                    if (name.includes('stack') || name.includes('paper')) targetKey = 'Paper Stack'
                    else if ((name.includes('book') || name.includes('values')) && !name.includes('notebook')) targetKey = 'book'
                }

                // Only add if no entry exists for this key yet (named roots claim keys first)
                if (targetKey && !meshes.some(m => m.key === targetKey)) {
                    meshes.push({ node: obj, key: targetKey })
                    if (initialY.current[obj.uuid] === undefined) {
                        initialY.current[obj.uuid] = obj.position.y
                    }
                }
            }
        })
        liftableMeshes.current = meshes
    }, [scene])

    // 2. Notebook Tuning Effect
    useEffect(() => {
        scene.traverse((obj) => {
            const name = obj.name.toLowerCase()
            if (name.includes('notebook') || name.includes('notepad')) {
                if (obj.isMesh || obj.type === 'Group') {
                    obj.position.set(...notebookConfig.position)
                    obj.rotation.set(...notebookConfig.rotation)
                    obj.scale.setScalar(notebookConfig.scale)
                    obj.updateMatrixWorld()
                }
            }
        })
    }, [scene, notebookConfig])

    const contentRef = useRef()
    const stackRef = useRef()

    // 3. Animation Loop
    useFrame((state, delta) => {
        // Sync Paper Stack Position from Leva
        if (!stackRef.current) {
            stackRef.current = scene.getObjectByName('Paper') || scene.getObjectByName('Paper_1') || scene.getObjectByName('Stack')
        }
        if (paperStackPos && stackRef.current) {
            stackRef.current.position.set(...paperStackPos)
        }

        // Lift Animation
        liftableMeshes.current.forEach(({ node, key }) => {
            const isHovered = hoveredTarget === key || (key === 'book' && hoveredTarget === 'Book')
            const targetY = isHovered ? initialY.current[node.uuid] + 0.05 : initialY.current[node.uuid]
            easing.damp(node.position, 'y', targetY, 0.1, delta)
        })
    })

    // 4. Material and Shadow Setup
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                const name = child.name.toLowerCase()

                // Disable raycasting for meshes covered by Hitboxes
                const isHitboxItem = ['stack', 'paper'].some(str => name.includes(str))
                if (isHitboxItem && !name.includes('notepad')) {
                    child.raycast = () => null
                }

                // Shadows
                const isEnabled = shadowConfig.enabled
                const mode = shadowConfig.mode
                child.receiveShadow = isEnabled && mode !== 'none'
                if (isEnabled && mode === 'all') {
                    child.castShadow = true
                } else if (isEnabled && mode === 'essential') {
                    const isKey = ['phone', 'monitor', 'lamp', 'book', 'keyboard', 'mouse', 'cup', 'stack', 'paper', 'frame'].some(str => name.includes(str))
                    child.castShadow = isKey
                } else {
                    child.castShadow = false
                }

                // Smooth shading for small items
                if (name.includes('cup') && !child.userData.normalsComputed) {
                    child.geometry.computeVertexNormals()
                    child.userData.normalsComputed = true
                }

                // Mug Toggle
                if (name.includes('cup')) {
                    child.userData.onMugClick = () => setShowLeva(v => !v)
                }
            }
        })
    }, [scene, shadowConfig, setShowLeva])

    return (
        <group>
            <PhoneAnimation scene={scene} view={view} config={{ ...overlayConfig, dampFactor: 0.05, onPhoneFound: setPhoneMesh }} contentRef={contentRef} hovered={hoveredTarget === 'Phone'} />

            <primitive
                object={scene}
                onClick={(e) => {
                    e.stopPropagation()
                    if (view !== 'default') return // Prevent clicks on generic scene objects when zoomed in

                    const clickedNode = e.object
                    const name = clickedNode.name.toLowerCase()

                    if (name.includes('desk') || name.includes('wall') || name.includes('floor')) return

                    let targetFound = false
                    let curr = clickedNode
                    while (curr) {
                        const currName = curr.name.toLowerCase()
                        for (const [key, config] of Object.entries(clickableObjects)) {
                            if (config.contains.some(str => currName.includes(str))) {
                                if (config.excludes && config.excludes.some(str => currName.includes(str))) continue
                                config.handler(key === 'book' || key === 'notepad' ? getScreenPos(curr, e.camera) : null)
                                targetFound = true
                                break
                            }
                        }
                        if (targetFound) break
                        curr = curr.parent
                    }

                    if (!targetFound && clickedNode.userData.onMugClick) {
                        clickedNode.userData.onMugClick()
                        targetFound = true
                    }

                    if (!targetFound && onObjectClick) onObjectClick(clickedNode.name)
                }}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    if (view !== 'default') return // Prevent hovers on generic scene objects when zoomed in

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

            {/* Hitboxes - Paper Stack and Lamp only. */}
            <Hitbox name="Notepad" position={[-0.25, 0.1, 0.45]} scale={[0.4, 0.1, 0.4]} onHover={view === 'default' ? setHoveredTarget : undefined} onUnhover={() => setHoveredTarget(null)} onClick={view === 'default' ? onNotepadClick : undefined} debug={debugHitboxes} />
            {/* Paper Stack hitbox - shifted far right of lamp */}
            <Hitbox name="Paper Stack" position={[-0.68, 0.78, -0.55]} scale={[0.16, 0.22, 0.20]} onHover={view === 'default' ? setHoveredTarget : undefined} onUnhover={() => setHoveredTarget(null)} onClick={view === 'default' ? handlePaperClick : undefined} debug={debugHitboxes} />
            {/* Lamp hitbox - positioned on head/shade only, not overlapping phone or paper stack */}
            <Hitbox name="Lamp" position={[-0.428, 0.997, -0.698]} scale={[0.232, 0.536, 0.168]} onHover={view === 'default' ? setHoveredTarget : undefined} onUnhover={() => setHoveredTarget(null)} onClick={view === 'default' ? onToggleLight : undefined} debug={debugHitboxes} />


            <SceneLayout
                view={view}
                onBack={onBack}
                onPhoneClick={onPhoneClick}
                onMonitorClick={onMonitorClick}
                onPhoneHover={() => setHoveredTarget('Phone')}
                onPhoneUnhover={() => setHoveredTarget(null)}
                onMonitorHover={() => setHoveredTarget('Monitor')}
                onMonitorUnhover={() => setHoveredTarget(null)}
                scene={scene}
                config={overlayConfig}
                phoneContentRef={contentRef}
                hoveredTarget={hoveredTarget}
            />
        </group>
    )
}
