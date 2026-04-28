import { useRef, useState } from 'react'
import { useGLTF, useCursor, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls, folder } from 'leva'
import { easing } from 'maath'

const FUNKOS = [
    {
        id: 'hauke',
        label: 'Hauke',
        file: 'Hauke_Funko_Pop.glb',
        url: 'https://hauke.haus/',
        defaultPos: [-0.530, 0.839, -0.269],
    },
    {
        id: 'wendy',
        label: 'Wendy',
        file: 'Wendy_Funko_Pop.glb',
        url: 'https://wendyju.com',
        defaultPos: [-0.523, 0.839, -0.17],
    },
    {
        id: 'jonathan',
        label: 'Jonathan',
        // Asset filename has a double .glb extension as added by the user
        file: 'Jonathan_Funko_Pop.glb.glb',
        url: 'https://jonathansegal.io/',
        defaultPos: [-0.526, 0.845, -0.067],
    },
]

function FunkoPop({ funko, sharedConfig }) {
    const base = import.meta.env.BASE_URL
    const { scene } = useGLTF(base + funko.file)
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    const { position } = useControls(`Funkos.${funko.label}`, {
        position: { value: funko.defaultPos, step: 0.001 },
    })

    useFrame((_, delta) => {
        if (!ref.current) return
        const targetY = position[1] + (hovered ? 0.04 : 0)
        easing.damp(ref.current.position, 'y', targetY, 0.1, delta)
        const targetRotY = sharedConfig.rotY + (hovered ? 0.3 : 0)
        easing.damp(ref.current.rotation, 'y', targetRotY, 0.15, delta)
    })

    const cloned = scene.clone(true)

    return (
        <group
            ref={ref}
            position={[position[0], position[1], position[2]]}
            rotation={[sharedConfig.rotX, sharedConfig.rotY, sharedConfig.rotZ]}
            scale={sharedConfig.scale}
            onClick={(e) => {
                e.stopPropagation()
                window.open(funko.url, '_blank', 'noopener,noreferrer')
            }}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setHovered(false)
            }}
        >
            <primitive object={cloned} />
            {hovered && (
                <Html center distanceFactor={1.2} position={[0, 0.18, 0]} style={{ pointerEvents: 'none' }}>
                    <div className="px-2 py-0.5 rounded-full bg-black/80 text-white text-[10px] font-mono uppercase tracking-widest whitespace-nowrap shadow-lg">
                        {funko.label} ↗
                    </div>
                </Html>
            )}
        </group>
    )
}

export function FunkoPops() {
    const sharedConfig = useControls('Funkos (shared)', {
        Transform: folder({
            scale: { value: 0.085, min: 0.01, max: 1, step: 0.005 },
            rotX: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Rot X' },
            rotY: { value: -1.4, min: -3.14, max: 3.14, step: 0.01, label: 'Rot Y' },
            rotZ: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Rot Z' },
        }),
    })

    return (
        <group>
            {FUNKOS.map((f) => (
                <FunkoPop key={f.id} funko={f} sharedConfig={sharedConfig} />
            ))}
        </group>
    )
}

FUNKOS.forEach((f) => useGLTF.preload(import.meta.env.BASE_URL + f.file))
