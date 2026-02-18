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

function ContentPlane({ children, name, config, setConfig, layoutMode, gizmoMode, trackObject, onClick }) {
    const offsetGroupRef = useRef()

    const handleTransformChange = () => {
        if (offsetGroupRef.current && setConfig) {
            const { position, rotation } = offsetGroupRef.current
            const newConfig = {
                x: Number(position.x.toFixed(3)),
                y: Number(position.y.toFixed(3)),
                z: Number(position.z.toFixed(3)),
                rotX: Number(rotation.x.toFixed(3)),
                rotY: Number(rotation.y.toFixed(3)),
                rotZ: Number(rotation.z.toFixed(3))
            }
            // Avoid infinite loops / redundant updates
            if (
                newConfig.x !== config.x ||
                newConfig.y !== config.y ||
                newConfig.z !== config.z ||
                newConfig.rotX !== config.rotX ||
                newConfig.rotY !== config.rotY ||
                newConfig.rotZ !== config.rotZ
            ) {
                setConfig(newConfig)
            }
        }
    }

    const content = (
        <group
            ref={offsetGroupRef}
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
                    zIndexRange={[name === 'Phone' ? 50 : 10, 0]}
                    // Occlusion enabled via "blending" for correct depth sorting (fixes visible-through-meshes)
                    occlude="blending"
                >
                    <div
                        className="w-full h-full"
                        style={{ pointerEvents: layoutMode ? 'none' : 'auto', cursor: onClick ? 'pointer' : 'auto' }}
                        onPointerDown={e => !layoutMode && e.stopPropagation()}
                        onClick={!layoutMode ? onClick : undefined}
                    >
                        {children}
                    </div>
                </Html>
            )}
        </group>
    )

    if (layoutMode && (name === 'Monitor' || name === 'Notepad' || name === 'Phone')) {
        return (
            <TransformControls
                object={offsetGroupRef}
                mode={gizmoMode}
                onMouseUp={handleTransformChange}
                showX={true}
                showY={true}
                showZ={true}
            >
                {content}
            </TransformControls>
        )
    }

    return content
}

export function SceneLayout({ view, onBack, onPhoneClick, scene, config: overlayConfig, trackObject, phoneContentRef }) {
    const { layoutMode, gizmoMode } = useControls({
        'Layout Mode': folder({
            layoutMode: { value: false, label: 'Enable Gizmos' },
            gizmoMode: { value: 'translate', options: ['translate', 'rotate'], label: 'Gizmo Mode' }
        })
    })

    // Monitor Config 
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

    // Phone Config - Restored for Layout Mode
    const [phoneConfig, setPhoneConfig] = useControls('Layout - Phone', () => ({
        x: { value: -0.2, min: -0.2, max: 0.2, step: 0.0001 },
        y: { value: 0.2, min: -0.2, max: 0.2, step: 0.0001 },
        z: { value: -0.2, min: -0.2, max: 2, step: 0.0001 },
        rotX: { value: -1.552, min: -3.14, max: 3.14 },
        rotY: { value: -0.07, min: -3.14, max: 3.14 },
        rotZ: { value: -1.106, min: -3.14, max: 3.14 },
        scale: { value: 0.14, min: 0.01, max: 0.5 },
        width: { value: '320px', render: () => false },
        height: { value: '640px', render: () => false },
        bg: { value: 'transparent', render: () => false },
        radius: { value: '0px', render: () => false }
    }))

    // Notepad Config (Updated from User)
    const [notepadConfig, setNotepadConfig] = useControls('Layout - Notepad', () => ({
        x: { value: -0.483, min: -2, max: 2, step: 0.001 },
        y: { value: 0.771, min: 0, max: 3, step: 0.001 },
        z: { value: 0.043, min: -2, max: 2, step: 0.001 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: -2.16, min: -3.14, max: 3.14 },
        scale: { value: 0.12, min: 0.01, max: 1 },
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

            {/* Render Phone Content inside the passed ref from App (for sync) */}
            <group ref={phoneContentRef}>
                <ContentPlane
                    name="Phone"
                    config={phoneConfig}
                    setConfig={setPhoneConfig}
                    layoutMode={layoutMode}
                    gizmoMode={gizmoMode}
                    onClick={onPhoneClick}
                >
                    <PhoneContent />
                </ContentPlane>
            </group>

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
