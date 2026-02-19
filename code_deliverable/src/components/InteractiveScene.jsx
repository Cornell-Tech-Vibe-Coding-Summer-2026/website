import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { easing } from 'maath'
import * as THREE from 'three'
import { SceneLayout } from './SceneLayout'
import { PhoneAnimation } from './PhoneAnimation'

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

    // Debug: Identify Paper Stack components - REMOVED after debugging
    // useEffect(() => {
    //     console.log("--- Paper Stack Debug ---")
    //     scene.traverse((obj) => {
    //         const name = obj.name.toLowerCase()
    //         if (name.includes('paper') || name.includes('stack')) {
    //             console.log('Found:', obj.name, obj.type, 'Parent:', obj.parent?.name, 'Pos:', obj.position)
    //         }
    //     })
    //     console.log("-------------------------")
    // }, [scene])

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
            // Notebook is currently managed by Leva default position, no auto-lift needed if Leva is correct.
        })
    }, [scene])

    const contentRef = useRef()
    const [hoveredTarget, setHoveredTarget] = useState(null)
    const stackRef = useRef()

    // Apply Paper Stack Position
    // Apply Paper Stack Position
    useFrame(() => {
        if (!stackRef.current) {
            // Find the Paper GROUP if possible, to move all children (sheets + text lines)
            const paperGroup = scene.getObjectByName('Paper')
            if (paperGroup) {
                stackRef.current = paperGroup
            } else {
                // Fallback: Try to find Stack or Paper_1
                const stack = scene.getObjectByName('Paper_1') || scene.getObjectByName('Stack')
                if (stack) stackRef.current = stack
            }
        }

        if (paperStackPos && stackRef.current) {
            stackRef.current.position.set(...paperStackPos)
        }
    })

    // Define clickable objects 
    const clickableObjects = {
        'notepad': { handler: onNotepadClick, contains: ['notebook', 'notepad', 'notepad_plane'], excludes: ['stack', 'paper', 'papers'], lift: false },
        // Ensure Screen is included in Phone interaction, and Lamp ignores phone
        'phone': { handler: onPhoneClick, contains: ['phone', 'smartphone', 'phone_plane', 'screen', 'node003_1'], lift: false },
        'lamp': { handler: onToggleLight, contains: ['lamp', 'light', 'bulb'], excludes: ['phone', 'screen', 'node003_1'], lift: false },
        // Monitor mesh itself is no longer clickable/hoverable, only peripherals
        'keyboard': { handler: onMonitorClick, contains: ['keyboard', 'keys'], lift: true },
        'mouse': { handler: onMonitorClick, contains: ['mouse'], excludes: ['pad'], lift: true },
        'book': { handler: onReadingClick, contains: ['book', 'values', 'play'], excludes: ['notebook', 'phone', 'node003'], lift: true },
        'paper_stack': { handler: onPapersClick, contains: ['stack', 'paper', 'papers'], lift: true }
    }

    // Animation Loop for Hover Lift
    // We use a ref map to store initial Y positions to avoid drift
    const initialY = useRef({})

    useFrame((state, delta) => {
        scene.traverse((child) => {
            if (child.isMesh || child.type === 'Group') {
                // Identify if this child belongs to a "liftable" interaction
                let targetKey = null
                const name = child.name.toLowerCase()

                for (const [key, config] of Object.entries(clickableObjects)) {
                    if (config.lift && config.contains.some(str => name.includes(str))) {
                        // Check excludes
                        if (config.excludes && config.excludes.some(str => name.includes(str))) continue

                        targetKey = key
                        break
                    }
                }

                if (targetKey) {
                    // Initialize base position
                    if (initialY.current[child.uuid] === undefined) {
                        initialY.current[child.uuid] = child.position.y
                    }

                    const targetY = (hoveredTarget === targetKey)
                        ? initialY.current[child.uuid] + 0.05 // Lift amount
                        : initialY.current[child.uuid]

                    // Smoothly damp to target
                    easing.damp(child.position, 'y', targetY, 0.1, delta)
                }
            }
        })
    })

    // Enable shadows on all meshes and fix materials
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {

                // Shadow Logic based on Config
                const isEnabled = shadowConfig.enabled
                const mode = shadowConfig.mode // 'all', 'essential', 'none'

                if (!isEnabled || mode === 'none') {
                    child.castShadow = false
                    child.receiveShadow = false
                } else if (mode === 'all') {
                    child.castShadow = true
                    child.receiveShadow = true
                } else if (mode === 'essential') {
                    // Essential: Desk receives, Key Objects cast
                    const name = child.name.toLowerCase()
                    const isDesk = name.includes('desk') || name.includes('wall') || name.includes('floor')
                    const isKeyObject = name.includes('phone') || name.includes('monitor') || name.includes('lamp') || name.includes('book') || name.includes('keyboard') || name.includes('mouse') || name.includes('cup')

                    child.receiveShadow = true // Most things should receive for grounding
                    child.castShadow = isKeyObject
                }

                // If material is Basic, it won't receive shadows. Upgrade to Standard.
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
                // Ensure material interacts with light
                if (child.material) {
                    child.material.envMapIntensity = 0.5
                    child.material.needsUpdate = true
                }
            }
        })
    }, [scene, shadowConfig])

    return (
        <group>
            <PhoneAnimation scene={scene} view={view} config={{ ...overlayConfig, onPhoneFound: setPhoneMesh }} contentRef={contentRef} hovered={hoveredTarget === 'phone'} />

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
                    // console.log('Clicked Leaf:', clickedNode.name)

                    let curr = e.object
                    while (curr) {
                        const currName = curr.name.toLowerCase()

                        for (const [key, config] of Object.entries(clickableObjects)) {
                            if (config.contains.some(str => currName.includes(str))) {
                                // Check excludes
                                if (config.excludes && config.excludes.some(str => currName.includes(str))) continue

                                // console.log('Triggering handler for:', key, 'on node:', curr.name)

                                // Calculate Screen Position for Transitions
                                let screenPos = null
                                if (key === 'paper_stack' || key === 'book') {
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
                    e.stopPropagation()

                    // Disable hover interactions when zoomed in specific views
                    if (view === 'phone' || view === 'monitor') {
                        document.body.style.cursor = 'auto'
                        return
                    }

                    const clickedNode = e.object
                    // console.log('Hovered Mesh:', clickedNode.name, 'Parent:', clickedNode.parent ? clickedNode.parent.name : 'None')

                    // Find hover target
                    let curr = e.object
                    while (curr) {
                        const name = curr.name.toLowerCase()

                        for (const [key, config] of Object.entries(clickableObjects)) {
                            if (config.contains.some(str => name.includes(str))) {
                                // Check excludes
                                if (config.excludes && config.excludes.some(str => name.includes(str))) continue

                                // Only change cursor if we found a valid target
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

            {/* Visual Scene Layout for Content Planes (Phone restored) */}
            <SceneLayout view={view} onBack={onBack} onPhoneClick={onPhoneClick} onMonitorClick={onMonitorClick} scene={scene} config={overlayConfig} phoneContentRef={contentRef} />
        </group>
    )
}
