import { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useControls, folder } from 'leva'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'

// Cornell-Tech-branded mug. Loads "Mug With Office Tool.glb", finds the
// largest body mesh, and projects the Cornell Tech "T" logo onto it as a
// decal so the logo curves around the mug's surface.
export function Mug({ onClick }) {
    const base = import.meta.env.BASE_URL
    const gltf = useGLTF(base + 'Mug With Office Tool.glb')
    const logo = useTexture(base + 'CornellTechT.png')

    // Clone the GLB scene per-instance so multiple mounts don't mutate the
    // cached scene graph. Then recenter at origin so the wrapper position is
    // intuitive (the GLB ships with its content offset ~1.2 units up).
    const cloned = useMemo(() => {
        const c = gltf.scene.clone(true)
        const box = new THREE.Box3().setFromObject(c)
        const center = new THREE.Vector3()
        box.getCenter(center)
        // Shift so the bottom of the mug sits at y=0 of the wrapper group.
        c.position.set(-center.x, -box.min.y, -center.z)
        return c
    }, [gltf.scene])

    const config = useControls('Mug', {
        Placement: folder({
            // Defaults match the world position of the original cup mesh in
            // scene-unmerged.glb (centered at -0.618, 0.802, 0.472, ~8cm tall).
            position: { value: [-0.618, 0.76, 0.472], step: 0.001 },
            rotationY: { value: 0, min: -3.14, max: 3.14, step: 0.01, label: 'Yaw' },
            // GLB has a baked 100x mesh-level scale and tiny vertex
            // coordinates — outer scale ~0.8 yields a mug roughly the size of
            // the original cup.
            scale: { value: 0.8, min: 0.05, max: 5, step: 0.01 },
        }),
        Logo: folder({
            logoPos: { value: [0, 0.05, 0.05], step: 0.005, label: 'Decal pos' },
            logoYaw: { value: 0, min: -3.14, max: 3.14, step: 0.05, label: 'Decal yaw' },
            logoSize: { value: 0.04, min: 0.005, max: 0.5, step: 0.005, label: 'Decal size' },
            logoVisible: { value: true, label: 'Logo on' },
        }),
    })

    const decalMeshRef = useRef(null)

    // Find the body mesh once and remember it.
    const bodyMeshRef = useRef(null)
    useEffect(() => {
        let largest = null
        let largestVerts = 0
        cloned.traverse((obj) => {
            if (obj.isMesh && obj.geometry) {
                const verts = obj.geometry.attributes?.position?.count ?? 0
                if (verts > largestVerts) {
                    largestVerts = verts
                    largest = obj
                }
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })
        bodyMeshRef.current = largest
    }, [cloned])

    // Re-project the decal whenever its parameters change.
    useEffect(() => {
        const body = bodyMeshRef.current
        if (!body) return

        // Tear down any prior decal attached to the body.
        if (decalMeshRef.current && decalMeshRef.current.parent) {
            decalMeshRef.current.parent.remove(decalMeshRef.current)
            decalMeshRef.current.geometry?.dispose()
            decalMeshRef.current.material?.dispose()
            decalMeshRef.current = null
        }

        if (!config.logoVisible) return

        // DecalGeometry projects from a position+orientation onto the target
        // mesh. We work in the body mesh's *local* space so the decal moves
        // with the mug as the parent group transforms it.
        body.updateMatrixWorld(true)
        const inverse = new THREE.Matrix4().copy(body.matrixWorld).invert()

        const worldPos = new THREE.Vector3(...config.logoPos)
        const localPos = worldPos.clone().applyMatrix4(inverse)

        // Project radially outward from the mug axis (+Y) toward the logoPos.
        const orient = new THREE.Object3D()
        orient.position.copy(localPos)
        orient.lookAt(new THREE.Vector3(0, localPos.y, 0))
        orient.rotateY(config.logoYaw)

        const size = new THREE.Vector3(config.logoSize, config.logoSize, config.logoSize)
        let geom
        try {
            geom = new DecalGeometry(body, orient.position, orient.rotation, size)
        } catch (e) {
            console.warn('DecalGeometry failed:', e)
            return
        }

        const mat = new THREE.MeshStandardMaterial({
            map: logo,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            roughness: 0.4,
        })
        const decal = new THREE.Mesh(geom, mat)
        decal.renderOrder = 10
        body.add(decal)
        decalMeshRef.current = decal
    }, [config.logoPos, config.logoYaw, config.logoSize, config.logoVisible, logo])

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
        </group>
    )
}

useGLTF.preload(import.meta.env.BASE_URL + 'Mug With Office Tool.glb')
