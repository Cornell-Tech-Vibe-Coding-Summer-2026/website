import React, { useRef, useEffect, useState } from 'react'
import { Html, TransformControls, Text } from '@react-three/drei'
import { useControls, folder } from 'leva'
import { useFrame } from '@react-three/fiber'
import { MonitorContent } from './MonitorContent'
import { PhoneContent } from './PhoneContent'
import * as THREE from 'three'

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
    layoutMode
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

    // Standard static transform application
    const content = (
        <group
            ref={groupRef}
            position={[config.x, config.y, config.z]}
            rotation={[config.rotX, config.rotY, config.rotZ]}
            scale={name === 'Notepad' ? [1, 1, 1] : undefined} // Text handles its own scale better usually
        >
            {name === 'Notepad' ? (
                // Render children directly for Text (no HTML wrapper)
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
                        pointerEvents: 'none' // Html container shouldn't block, children should
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
            <TransformControls object={groupRef} mode="translate">
                {content}
            </TransformControls>
        )
    }

    return content
}

export function SceneLayout({ view, onBack, scene }) {
    const { layoutMode } = useControls({
        'Layout Mode': folder({
            layoutMode: { value: false, label: 'Enable Gizmos' }
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

    // Phone: Reverted to manual positioning (no sync)
    // Adjusted defaults to ensure visibility (slightly higher Y)
    const { ...phoneConfig } = useControls('Layout - Phone', {
        x: { value: -0.57, min: -2, max: 2, step: 0.01 },
        y: { value: 0.85, min: 0, max: 3, step: 0.01 }, // Lifted slightly
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

    const { ...notepadConfig } = useControls('Layout - Notepad', {
        x: { value: -0.64, min: -2, max: 2 },
        y: { value: 0.8, min: 0, max: 3 },
        z: { value: 0.06, min: -2, max: 2 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: -2.16, min: -3.14, max: 3.14 },
        scale: { value: 1, min: 0.1, max: 2 }, // Adjusted for Text component scale
        width: '400px', // Unused for Text
        height: '500px', // Unused for Text
        bg: 'transparent', // Unused for Text
        radius: '2px' // Unused for Text
    })

    return (
        <>
            <ContentPlane name="Monitor" config={monitorConfig} layoutMode={layoutMode}>
                <MonitorContent onBack={onBack} />
            </ContentPlane>

            <ContentPlane name="Phone" config={phoneConfig} layoutMode={layoutMode}>
                <PhoneContent />
            </ContentPlane>

            <ContentPlane name="Notepad" config={notepadConfig} layoutMode={layoutMode}>
                <NotepadText />
            </ContentPlane>
        </>
    )
}
