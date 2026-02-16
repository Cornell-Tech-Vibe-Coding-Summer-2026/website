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
    config,
    layoutMode,
    gizmoMode, // 'translate' | 'rotate'
    view, // Current view state for animation
    phoneCofig // Overlay config for Phone animation
}) {
    const groupRef = useRef()

    // Log transforms
    useEffect(() => {
        if (layoutMode && groupRef.current) {
            const interval = setInterval(() => {
                const { position, rotation, scale } = groupRef.current
                console.log(`${name} Transform:`, {
                    pos: [position.x.toFixed(3), position.y.toFixed(3), position.z.toFixed(3)],
                    rot: [rotation.x.toFixed(3), rotation.y.toFixed(3), rotation.z.toFixed(3)],
                    scale: scale.x.toFixed(3)
                })
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [layoutMode, name])

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
                    targetPos.y += phoneCofig.phoneLift || 0.18
                    targetPos.x += phoneCofig.phoneSlideX || -0.1
                    targetPos.z += phoneCofig.phoneSlideZ || 0.06
                    targetRot.x += phoneCofig.phoneTilt || 0.01
                }
            }

            // Smoothly move to target
            easing.damp3(groupRef.current.position, targetPos, 0.4, delta)
            easing.dampE(groupRef.current.rotation, targetRot, 0.4, delta)
        } else if (layoutMode && groupRef.current) {
            // Look, if we are in layout mode, TransformControls handles it.
            // But if we toggle layout mode off, we want it to snap back or animate?
            // For now, let's assume config *is* the source of truth, updated via Leva.
            // If user drags gizmo, they should copy values to Leva.
            // (We don't support two-way binding from Gizmo -> Leva automatically here without complex logic)
        }
    })

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
                        pointerEvents: 'none'
                    }}
                    zIndexRange={[10, 0]}
                    occlude="blending"
                >
                    <div className="w-full h-full pointer-events-auto" onPointerDown={e => e.stopPropagation()}>
                        {children}
                    </div>
                </Html>
            )}
        </group>
    )

    if (layoutMode) {
        return (
            <TransformControls object={groupRef} mode={gizmoMode}>
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

    const { ...monitorConfig } = useControls('Layout - Monitor', {
        x: { value: -0.43, min: -2, max: 2, step: 0.01 },
        y: { value: 1.16, min: 0, max: 3, step: 0.01 },
        z: { value: -0.14, min: -2, max: 2, step: 0.01 },
        rotX: { value: 0, min: -3.14, max: 3.14 },
        rotY: { value: -1.63, min: -3.14, max: 3.14 },
        rotZ: { value: 0, min: -3.14, max: 3.14 },
        scale: { value: 0.26, min: 0.1, max: 2 },
        width: '1024px',
        height: '640px',
        bg: '#050505',
        radius: '4px'
    })

    const { ...phoneConfig } = useControls('Layout - Phone', {
        x: { value: -0.57, min: -2, max: 2, step: 0.01 },
        y: { value: 0.85, min: 0, max: 3, step: 0.01 },
        z: { value: -0.46, min: -2, max: 2, step: 0.01 },
        rotX: { value: -1.51, min: -3.14, max: 3.14 },
        rotY: { value: -0.06, min: -3.14, max: 3.14 },
        rotZ: { value: -1.13, min: -3.14, max: 3.14 },
        scale: { value: 0.13, min: 0.01, max: 1 },
        width: '320px',
        height: '640px',
        bg: 'transparent',
        radius: '40px'
    })

    // Updated Notepad Config based on User Feedback
    const { ...notepadConfig } = useControls('Layout - Notepad', {
        x: { value: -0.52, min: -2, max: 2, step: 0.01 }, // Updated
        y: { value: 0.8, min: 0, max: 3 },
        z: { value: 0.06, min: -2, max: 2 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: -2.16, min: -3.14, max: 3.14 },
        scale: { value: 0.1, min: 0.01, max: 1 }, // Updated
        width: '400px',
        height: '500px',
        bg: 'transparent',
        radius: '2px'
    })

    return (
        <>
            <ContentPlane
                name="Monitor"
                config={monitorConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
            >
                <MonitorContent onBack={onBack} />
            </ContentPlane>

            <ContentPlane
                name="Phone"
                config={phoneConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
                view={view}
                phoneCofig={overlayConfig} // Pass for animation
            >
                <PhoneContent />
            </ContentPlane>

            <ContentPlane
                name="Notepad"
                config={notepadConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
            >
                <NotepadText />
            </ContentPlane>
        </>
    )
}
