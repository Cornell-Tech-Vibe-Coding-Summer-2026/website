import React, { useRef, useEffect } from 'react'
import { Html, TransformControls } from '@react-three/drei'
import { useControls, folder } from 'leva'
import { MonitorContent } from './MonitorContent'
import { PhoneContent } from './PhoneContent'
import { NotepadContent } from './NotepadContent'

function ContentPlane({
    children,
    name,
    config,
    layoutMode
}) {
    const groupRef = useRef()

    // Log transforms when in layout mode for easy copying
    useEffect(() => {
        if (layoutMode && groupRef.current) {
            const interval = setInterval(() => {
                const { position, rotation } = groupRef.current
                console.log(`${name} Transform:`, {
                    pos: [position.x.toFixed(3), position.y.toFixed(3), position.z.toFixed(3)],
                    rot: [rotation.x.toFixed(3), rotation.y.toFixed(3), rotation.z.toFixed(3)]
                })
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [layoutMode, name])

    const content = (
        <group
            ref={groupRef}
            position={[config.x, config.y, config.z]}
            rotation={[config.rotX, config.rotY, config.rotZ]}
        >
            <Html
                transform
                distanceFactor={config.scale}
                style={{
                    width: config.width || '1024px',
                    height: config.height || '768px',
                    background: config.bg || '#1a1a1a',
                    borderRadius: config.radius || '8px',
                    overflow: 'hidden'
                }}
                // Occlusion creates the "hidden behind handle" effect
                occlude="blending"
            >
                <div className="w-full h-full pointer-events-auto" onPointerDown={e => e.stopPropagation()}>
                    {children}
                </div>
            </Html>
        </group>
    )

    if (layoutMode) {
        return (
            <TransformControls
                object={groupRef}
                mode="translate"
            // Switch to rotate if needed, but Leva is safer for rotation.
            // Actually, let's just use Translate for now, user can use Leva for Rot.
            // Or we can toggle. 
            >
                {content}
            </TransformControls>
        )
    }

    return content
}

export function SceneLayout({ view, onBack }) {
    const { layoutMode } = useControls({
        'Layout Mode': folder({
            layoutMode: { value: false, label: 'Enable Gizmos' }
        })
    })

    const { ...monitorConfig } = useControls('Layout - Monitor', {
        x: { value: -0.43, min: -2, max: 2, step: 0.01 },
        y: { value: 1.25, min: 0, max: 3, step: 0.01 },
        z: { value: 0.0, min: -2, max: 2, step: 0.01 },
        rotX: { value: 0, min: -3.14, max: 3.14 },
        rotY: { value: -1.57, min: -3.14, max: 3.14 },
        rotZ: { value: 0, min: -3.14, max: 3.14 },
        scale: { value: 0.5, min: 0.1, max: 2 },
        width: '1024px',
        height: '640px', // Adjusted to match MonitorContent
        bg: '#050505',
        radius: '4px'
    })

    // Defaults for Phone - Tweak these
    const { ...phoneConfig } = useControls('Layout - Phone', {
        x: { value: -0.65, min: -2, max: 2 },
        y: { value: 0.74, min: 0, max: 3 },
        z: { value: -0.5, min: -2, max: 2 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: 1.57, min: -3.14, max: 3.14 },
        scale: { value: 0.15, min: 0.01, max: 1 },
        width: '320px',
        height: '640px',
        bg: 'transparent',
        radius: '40px'
    })

    const { ...notepadConfig } = useControls('Layout - Notepad', {
        x: { value: 0.3, min: -2, max: 2 },
        y: { value: 0.74, min: 0, max: 3 },
        z: { value: -0.3, min: -2, max: 2 },
        rotX: { value: -1.57, min: -3.14, max: 3.14 },
        rotY: { value: 0, min: -3.14, max: 3.14 },
        rotZ: { value: 0, min: -3.14, max: 3.14 },
        scale: { value: 0.25, min: 0.01, max: 1 },
        width: '400px',
        height: '500px',
        bg: '#fdfdfd',
        radius: '2px'
    })

    // Only render overlays if we are NOT in a specific view (unless we want them always visible)
    // User asked for "Scene Layout", implying global placement.
    // We can hide them when focused on something else if performance requires.

    return (
        <>
            <ContentPlane name="Monitor" config={monitorConfig} layoutMode={layoutMode}>
                <MonitorContent onBack={onBack} />
            </ContentPlane>

            <ContentPlane name="Phone" config={phoneConfig} layoutMode={layoutMode}>
                <PhoneContent />
            </ContentPlane>

            <ContentPlane name="Notepad" config={notepadConfig} layoutMode={layoutMode}>
                <NotepadContent />
            </ContentPlane>
        </>
    )
}
