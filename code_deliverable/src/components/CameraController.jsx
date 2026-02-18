import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'

export function CameraController({ targetView, cameraPositions }) {
    const { camera, pointer } = useThree()
    const targetPosition = useRef(new THREE.Vector3())
    const targetLookAt = useRef(new THREE.Vector3())

    useFrame((state, delta) => {
        const config = cameraPositions[targetView] || cameraPositions.default

        // Base target position
        targetPosition.current.set(...config.position)
        targetLookAt.current.set(...config.target)

        // Apply Parallax ONLY in default view (Orbit around desktop)
        if (targetView === 'default') {
            const offsetAngle = pointer.x * 0.015 // Extremely subtle rotation strength
            const basePos = new THREE.Vector3(...config.position)
            const targetVec = new THREE.Vector3(...config.target)

            // Vector from Target to Camera
            const relativePos = basePos.clone().sub(targetVec)

            // Rotate around Y-axis
            relativePos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -offsetAngle)

            // Apply new position
            targetPosition.current.copy(targetVec.clone().add(relativePos))
        }

        // Smooth camera movement
        easing.damp3(camera.position, targetPosition.current, 0.4, delta)

        // Update OrbitControls target
        const controls = camera.userData.controls
        if (controls) {
            if (targetView === 'reading') {
                // Auto-position for reading (overhead or zoomed)
            }

            easing.damp3(controls.target, targetLookAt.current, 0.4, delta)
            controls.update()
        }
    })

    return null
}
