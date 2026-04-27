import React, { useRef, useEffect, useState } from 'react'
import { Html, TransformControls, Text } from '@react-three/drei'
import { useControls, folder } from 'leva'
import { useFrame } from '@react-three/fiber'
import { MonitorContent } from './MonitorContent'
import { PhoneContent } from './PhoneContent'

import * as THREE from 'three'
import { easing } from 'maath'

// --- Configuration Defaults ---
const LAYOUT_DEFAULTS = {
    Monitor: {
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
    },
    Phone: {
        x: { value: -0.537, min: -1, max: 1, step: 0.0001 },
        y: { value: 0.778, min: -1, max: 1, step: 0.0001 },
        z: { value: -0.477, min: -1, max: 1, step: 0.0001 },
        rotX: { value: -1.569, min: -3.14, max: 3.14 },
        rotY: { value: 0.003, min: -3.14, max: 3.14 },
        rotZ: { value: -1.098, min: -3.14, max: 3.14 },
        scale: { value: 0.14, min: 0.01, max: 0.5 },
        width: { value: '320px', render: () => false },
        height: { value: '640px', render: () => false },
        bg: { value: 'transparent', render: () => false },
        radius: { value: '0px', render: () => false }
    },
    Notepad: {
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
    }
}

// --- Components ---

function NotepadText() {
    return (
        <group>
            <Text
                fontSize={0.09}
                lineHeight={1.5}
                letterSpacing={0.02}
                maxWidth={3.0}
                anchorX="left"
                anchorY="top"
                color="black"
            >
                {'Class Prep:\n'}
                {'- Syllabus  ✔️\n'}
                {'- Website  ✔️\n'}
                {'- Slide decks\n'}
                {'- Reading list\n'}
                {'- Guest speakers\n'}
                {'- GitHub Classroom\n'}
                {'- Tool credits'}
            </Text>
        </group>
    )
}

function useLayoutPlane(name, defaults) {
    const [config, setConfig] = useControls(`Layout - ${name}`, () => defaults)
    return { config, setConfig }
}

function ContentPlane({ children, name, config, setConfig, layoutMode, gizmoMode, onClick, onHover, onUnhover, view }) {
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

            // Check for meaningful changes before updating
            if (
                Math.abs(newConfig.x - config.x) > 0.0001 ||
                Math.abs(newConfig.y - config.y) > 0.0001 ||
                Math.abs(newConfig.z - config.z) > 0.0001 ||
                Math.abs(newConfig.rotX - config.rotX) > 0.0001 ||
                Math.abs(newConfig.rotY - config.rotY) > 0.0001 ||
                Math.abs(newConfig.rotZ - config.rotZ) > 0.0001
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
            ) : name === 'Phone' ? (
                // Phone: only render Html when actively zoomed in.
                // At distance, render a cheap black plane so the screen looks dark without any HTML cost.
                view === 'phone' ? (
                    <Html
                        transform
                        distanceFactor={config.scale}
                        style={{
                            width: config.width || '320px',
                            height: config.height || '640px',
                            background: config.bg || 'transparent',
                            borderRadius: config.radius || '0px',
                            overflow: 'hidden',
                            pointerEvents: 'none'
                        }}
                        zIndexRange={[50, 0]}
                        occlude="blending"
                    >
                        {/* Screen turn-on: inject keyframe style + overlay div that fades from black */}
                        <style>{`
                            @keyframes screenOn {
                                0%   { opacity: 1; }
                                30%  { opacity: 0.85; background: #000; }
                                100% { opacity: 0; }
                            }
                            .phone-screen-on-overlay {
                                position: absolute; inset: 0; z-index: 9999;
                                background: #000;
                                animation: screenOn 0.7s ease-out forwards;
                                pointer-events: none;
                            }
                        `}</style>
                        <div className="phone-screen-on-overlay" />
                        <div
                            className="w-full h-full"
                            style={{ pointerEvents: 'auto' }}
                            onPointerDown={e => e.stopPropagation()}
                        >
                            {children}
                        </div>
                    </Html>
                ) : (
                    // Cheap black plane — no HTML, no raycasting, pure geometry
                    <mesh raycast={() => null}>
                        <planeGeometry args={[0.115, 0.22]} />
                        <meshBasicMaterial color="#000000" />
                    </mesh>
                )
            ) : (
                // Generic HTML plane for Monitor and any other planes
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
                    <div
                        className="w-full h-full"
                        style={{
                            pointerEvents: (layoutMode || view !== name.toLowerCase()) ? 'none' : 'auto',
                            cursor: onClick ? 'pointer' : 'auto'
                        }}
                        onPointerDown={e => !layoutMode && e.stopPropagation()}
                        onClick={!layoutMode ? onClick : undefined}
                        onMouseEnter={onHover}
                        onMouseLeave={onUnhover}
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

export function SceneLayout({ view, onBack, onPhoneClick, onMonitorClick, onPhoneHover, onPhoneUnhover, onMonitorHover, onMonitorUnhover, scene, config: overlayConfig, trackObject, phoneContentRef, hoveredTarget }) {
    const { layoutMode, gizmoMode } = useControls({
        'Layout Mode': folder({
            layoutMode: { value: false, label: 'Enable Gizmos' },
            gizmoMode: { value: 'translate', options: ['translate', 'rotate'], label: 'Gizmo Mode' }
        })
    })

    // Layout Configurations
    const { config: monitorConfig, setConfig: setMonitorConfig } = useLayoutPlane('Monitor', LAYOUT_DEFAULTS.Monitor)
    const { config: phoneConfig, setConfig: setPhoneConfig } = useLayoutPlane('Phone', LAYOUT_DEFAULTS.Phone)
    const { config: notepadConfig, setConfig: setNotepadConfig } = useLayoutPlane('Notepad', LAYOUT_DEFAULTS.Notepad)

    return (
        <>
            <ContentPlane
                name="Monitor"
                config={monitorConfig}
                setConfig={setMonitorConfig}
                layoutMode={layoutMode}
                gizmoMode={gizmoMode}
                view={view}
                onClick={onMonitorClick}
                onHover={onMonitorHover}
                onUnhover={onMonitorUnhover}
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
                    onHover={onPhoneHover}
                    onUnhover={onPhoneUnhover}
                    view={view}
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
