import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'

export function CameraRig({ target, config }) {
    const targets = {
        pc: {
            position: new THREE.Vector3().fromArray(config.pc.position),
            lookAt: new THREE.Vector3().fromArray(config.pc.lookAt)
        },
        phone: {
            position: new THREE.Vector3().fromArray(config.phone.position),
            lookAt: new THREE.Vector3().fromArray(config.phone.lookAt)
        },
        papers: {
            position: new THREE.Vector3().fromArray(config.papers.position),
            lookAt: new THREE.Vector3().fromArray(config.papers.lookAt)
        },
        default: {
            position: new THREE.Vector3().fromArray(config.initial),
            lookAt: new THREE.Vector3(0, 0, 0)
        }
    }

    const current = targets[target] || targets.default

    useFrame((state, delta) => {
        // Smoothly interpolate camera position
        easing.damp3(state.camera.position, current.position, 0.35, delta)

        // Smoothly interpolate camera lookAt
        const targetVec = current.lookAt.clone()
        state.camera.lookAt(targetVec)
    })

    return null
}
