import React, { useRef, useEffect, useState } from 'react'
import { Html, TransformControls, Text } from '@react-three/drei'
import { useControls, folder } from 'leva'
import { useFrame } from '@react-three/fiber'
import { MonitorContent } from './MonitorContent'
import { PhoneContent } from './PhoneContent'
import * as THREE from 'three'
import { easing } from 'maath'

// Simple text component for Notepad
function NotepadText() {
    return (
        <group>
            <Text
                fontSize={0.15}
                lineHeight={1.5}
                letterSpacing={0.05}
                maxWidth={2}
                anchorX="left"
                anchorY="top"
                color="black"
            >
                PROJECT NOTES{'\n'}
                - User Research{'\n'}
                - Moral Ledger{'\n'}
                - Vibe Check{'\n'}
                - Final Polish
            </Text>
        </group>
    )
}

function ContentPlane({
    children,
    name,
    config, // Value object
    setConfig, // Setter function (from Leva)
    layoutMode,
    gizmoMode, // 'translate' | 'rotate'
    view, // Current view state for animation
    phoneCofig // Overlay config for Phone animation
}) {
    const groupRef = useRef()

    // Animation Logic (Mirroring App.jsx)
    useFrame((state, delta) => {
        // Only animate if NOT in layout mode (layout mode overrides position)
        if (!layoutMode && groupRef.current) {
            const targetPos = new THREE.Vector3(config.x, config.y, config.z)
            const targetRot = new THREE.Euler(config.rotX, config.rotY, config.rotZ)

            // Phone specific animation
            if (name === 'Phone' && phoneCofig) {
                const isFocused = view === 'phone'

                if (isFocused) {
                    targetPos.y += phoneCofig.phoneLift || 0.185
                    targetPos.x += phoneCofig.phoneSlideX || -0.098
                    targetPos.z += phoneCofig.phoneSlideZ || 0.067
                    targetRot.x += phoneCofig.phoneTilt || 0.004
                }
            }

            // Smoothly move to target
            easing.damp3(groupRef.current.position, targetPos, 0.4, delta)
            easing.dampE(groupRef.current.rotation, targetRot, 0.4, delta)
        }
    })

    const handleTransformChange = () => {
        if (groupRef.current && setConfig) {
            const { position, rotation } = groupRef.current
            // Round to 3 decimals to keep Leva values clean
            const newConfig = {
                x: Number(position.x.toFixed(3)),
                y: Number(position.y.toFixed(3)),
                z: Number(position.z.toFixed(3)),
                rotX: Number(rotation.x.toFixed(3)),
                rotY: Number(rotation.y.toFixed(3)),
                rotZ: Number(rotation.z.toFixed(3))
            }
            setConfig(newConfig)
        }
    }

    const content = (
        <group
            ref={groupRef}
            // Initial pos/rot (animated via useFrame later)
            position={[config.x, config.y, config.z]}
            rotation={[config.rotX, config.rotY, config.rotZ]}
            scale={name === 'Notepad' ? [1, 1, 1] : undefined}
        >
            {name === 'Notepad' ? (
                <group scale={config.scale}>
                    {children}
                </group>
            ) : (
                <Html
                    transform
                    distanceFactor={config.scale}
                    style={{
                        width: config.width || '1024px',
                        height: config.height || '768px',
                        background: config.bg || '#1a1a1a',
                        borderRadius: config.radius || '8px',
                        overflow: 'hidden',
                        pointerEvents: 'none' // Always none on container
                    }}
                    zIndexRange={[10, 0]}
                    occlude="blending"
                >
                    <div
                        className="w-full h-full"
                        style={{ pointerEvents: layoutMode ? 'none' : 'auto' }} // Disable interaction in layout mode
                        onPointerDown={e => !layoutMode && e.stopPropagation()}
                    >
                        {children}
                    </div>
                </Html>
            )}
        </group>
    )

    if (layoutMode) {
        return (
            <TransformControls
                object={groupRef}
                mode={gizmoMode}
                onMouseUp={handleTransformChange}
            >
                {content}
            </TransformControls>
        )
    }

    return content
}

export function SceneLayout({ view, onBack, scene, config: overlayConfig }) {
    const { layoutMode, gizmoMode } = useControls({
        'Layout Mode': folder({
            layoutMode: { value: false, label: 'Enable Gizmos' },
            gizmoMode: { value: 'translate', options: ['translate', 'rotate'], label: 'Gizmo Mode' }
        })
    })

    // Monitor Config (Updated from User)
    const [monitorConfig, setMonitorConfig] = useControls('Layout - Monitor', () => ({
        x: { value: -0.424, min: -2, max: 2, step: 0.001 },
        y: { value: 1.18, min: 0, max: 3, step: 0.001 },
        z: { value: -0.151, min: -2, max: 2, step: 0.001 },
        rotX: { value: -1.764, min: -3.14, max: 3.14 },
        rotY: { value: -1.387, min: -3.14, max: 3.14 },
        rotZ: { value: -1.764, min: -3.14, max: 3.14 },
        scale: { value: 0.25, min: 0.1, max: 2 },
        width: { value: '1024px', render: () => false },
        height: { value: '640px', render: () => false },
        bg: { value: '#050505', render: () => false },
        radius: { value: '4px', render: () => false }
    }))

    // Phone Config (Updated with "Zoomed Out" Defaults for Resting State)
    const [phoneConfig, setPhoneConfig] = useControls('Layout - Phone', () => ({
        x: { value: -0.54, min: -2, max: 2, step: 0.001 },
        y: { value: 0.778, min: 0, max: 3, step: 0.001 },
        z: { value: -0.475, min: -2, max: 2, step: 0.001 },
        rotX: { value: -1.562, min: -3.14, max: 3.14 },
        rotY: { value: 0.008, min: -3.14, max: 3.14 },
        rotZ: { value: -1.095, min: -3.14, max: 3.14 },
        scale: { value: 0.14, min: 0.01, max: 1 },
        width: { value: '320px', render: () => false },
        height: { value: '640px', render: () => false },
        bg: { value: 'transparent', render: () => false },
        radius: { value: '40px', render: () => false }
    }))

    // Notepad Config (Updated from User)
    const [notepadConfig, setNotepadConfig] = useControls('Layout - Notepad', () => ({
        x: { value: -0.477, min: -2, max: 2, step: 0.001 },
        y: { value: 0.771, min: 0, max: 3, step: 0.001 },
        z: { value: 0.05, min: -2, max: 2, step: 0.001 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: -2.186, min: -3.14, max: 3.14 },
        scale: { value: 0.13, min: 0.01, max: 1 },
        width: { value: '400px', render: () => false },
        height: { value: '500px', render: () => false },
        bg: { value: 'transparent', render: () => false },
        radius: { value: '2px', render: () => false }
    }))

    return (
        <>
            <ContentPlane
                name="Monitor"
                config={monitorConfig}
                setConfig={setMonitorConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
            >
                <MonitorContent onBack={onBack} />
            </ContentPlane>

            <ContentPlane
                name="Phone"
                config={phoneConfig}
                setConfig={setPhoneConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
                view={view}
                phoneCofig={overlayConfig}
            >
                <PhoneContent />
            </ContentPlane>

            <ContentPlane
                name="Notepad"
                config={notepadConfig}
                setConfig={setNotepadConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
            >
                <NotepadText />
            </ContentPlane>
        </>
    )
}
