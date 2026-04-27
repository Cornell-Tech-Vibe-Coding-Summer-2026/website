import { useMemo, useRef } from 'react'
import { useGLTF, useTexture, Decal } from '@react-three/drei'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

// Cornell-Tech-branded mug. Loads "Mug With Office Tool.glb", recenters its
// origin, and projects the Cornell Tech "T" PNG onto the body using drei's
// <Decal> so the logo curves around the mug surface. Leva controls expose
// position/rotation/scale plus a debug flag that draws the decal's
// projection volume so the logo is easy to find.
export function Mug({ onClick }) {
    const base = import.meta.env.BASE_URL
    const gltf = useGLTF(base + 'Mug With Office Tool.glb')
    const logo = useTexture(base + 'CornellTechT.png')

    // Clone scene per-mount and recenter so the mug bottom sits at y=0 of the
    // wrapper group.
    const cloned = useMemo(() => {
        const c = gltf.scene.clone(true)
        const box = new THREE.Box3().setFromObject(c)
        const center = new THREE.Vector3()
        box.getCenter(center)
        c.position.set(-center.x, -box.min.y, -center.z)
        c.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true
                o.receiveShadow = true
            }
        })
        return c
    }, [gltf.scene])

    // Identify the largest mesh as the mug body — that's our decal target.
    const bodyRef = useRef(null)
    const bodyResolved = useMemo(() => {
        let body = null
        let maxVerts = 0
        cloned.traverse((o) => {
            if (o.isMesh && o.geometry) {
                const v = o.geometry.attributes?.position?.count ?? 0
                if (v > maxVerts) {
                    maxVerts = v
                    body = o
                }
            }
        })
        bodyRef.current = body
        return body
    }, [cloned])

    const config = useControls('Mug', {
        Placement: folder({
            position: { value: [-0.618, 0.76, 0.472], step: 0.001 },
            rotationY: { value: -1.93, min: -3.14, max: 3.14, step: 0.01, label: 'Yaw' },
            scale: { value: 1.33, min: 0.05, max: 5, step: 0.01 },
        }),
        Logo: folder({
            // Position is in world coords. The mug body sits at roughly
            // (-0.62, 0.81, 0.47). Defaulting decal slightly in front of it.
            decalX: { value: -0.6, min: -1.5, max: 1.5, step: 0.005 },
            decalY: { value: 0.81, min: 0, max: 2, step: 0.005 },
            decalZ: { value: 0.55, min: -1.5, max: 1.5, step: 0.005 },
            decalYaw: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Yaw' },
            decalPitch: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Pitch' },
            decalSize: { value: 0.06, min: 0.005, max: 0.5, step: 0.005, label: 'Size' },
            logoVisible: { value: true, label: 'Logo on' },
            debug: { value: false, label: 'Debug box' },
        }),
    })

    return (
        <group
            position={config.position}
            rotation={[0, config.rotationY, 0]}
            scale={config.scale}
            onClick={(e) => {
                if (!onClick) return
                e.stopPropagation()
                onClick()
            }}
        >
            <primitive object={cloned} />
            {config.logoVisible && bodyResolved && (
                <Decal
                    mesh={bodyRef}
                    position={[config.decalX, config.decalY, config.decalZ]}
                    rotation={[config.decalPitch, config.decalYaw, 0]}
                    scale={config.decalSize}
                    map={logo}
                    polygonOffsetFactor={-10}
                    debug={config.debug}
                />
            )}
        </group>
    )
}

useGLTF.preload(import.meta.env.BASE_URL + 'Mug With Office Tool.glb')
