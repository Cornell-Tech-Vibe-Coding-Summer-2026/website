import { useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

// Cornell-Tech-branded mug. Loads "Mug With Office Tool.glb", recenters its
// origin, repaints the body white, and stamps the Cornell Tech "T" PNG on
// a small plane positioned against the front of the mug.
//
// We tried drei's <Decal> projection (so the logo would curve around the
// cylinder) but it wouldn't render reliably with the wrapper's scale/yaw
// chain. A flat plane is robust, and visually almost indistinguishable for
// a small logo at this distance.
export function Mug({ onClick }) {
    const base = import.meta.env.BASE_URL
    const gltf = useGLTF(base + 'Mug With Office Tool.glb')
    const logo = useTexture(base + 'CornellTechT.png')

    // Clone scene per-mount and recenter; recolor the body so the red logo
    // shows up against it.
    const cloned = useMemo(() => {
        const c = gltf.scene.clone(true)
        const box = new THREE.Box3().setFromObject(c)
        const center = new THREE.Vector3()
        box.getCenter(center)
        c.position.set(-center.x, -box.min.y, -center.z)

        let bodyMesh = null
        let maxVerts = 0
        c.traverse((o) => {
            if (o.isMesh && o.geometry) {
                const v = o.geometry.attributes?.position?.count ?? 0
                if (v > maxVerts) { maxVerts = v; bodyMesh = o }
                o.castShadow = true
                o.receiveShadow = true
            }
        })
        if (bodyMesh) {
            bodyMesh.material = new THREE.MeshStandardMaterial({
                color: '#f1efe8',
                roughness: 0.55,
                metalness: 0.05,
            })
        }
        return c
    }, [gltf.scene])

    const config = useControls('Mug', {
        Placement: folder({
            position: { value: [-0.618, 0.76, 0.472], step: 0.001 },
            rotationY: { value: -1.93, min: -3.14, max: 3.14, step: 0.01, label: 'Yaw' },
            scale: { value: 1.33, min: 0.05, max: 5, step: 0.01 },
        }),
        Logo: folder({
            // The logo sits on a thin cylindrical-segment shell that wraps
            // around the mug's central Y axis, slightly larger radius than
            // the body so it floats in front. All values in mug-local space.
            logoY: { value: 0.045, min: 0, max: 0.15, step: 0.001, label: 'Y (height on mug)' },
            logoYaw: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Yaw (which side)' },
            logoRadius: { value: 0.034, min: 0.005, max: 0.1, step: 0.0005, label: 'Radius' },
            logoHeight: { value: 0.045, min: 0.005, max: 0.2, step: 0.001, label: 'Height' },
            logoArc: { value: 0.55, min: 0.1, max: 2.5, step: 0.01, label: 'Arc width (rad)' },
            logoVisible: { value: true, label: 'Logo on' },
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
            {config.logoVisible && (
                <mesh
                    position={[0, config.logoY, 0]}
                    rotation={[0, config.logoYaw, 0]}
                    renderOrder={5}
                >
                    <cylinderGeometry
                        args={[
                            config.logoRadius,
                            config.logoRadius,
                            config.logoHeight,
                            32,
                            1,
                            true,
                            -config.logoArc / 2,
                            config.logoArc,
                        ]}
                    />
                    <meshBasicMaterial
                        map={logo}
                        transparent
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />
                </mesh>
            )}
        </group>
    )
}

useGLTF.preload(import.meta.env.BASE_URL + 'Mug With Office Tool.glb')
