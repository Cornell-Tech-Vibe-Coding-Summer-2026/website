import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'

export function PhoneAnimation({ scene, view, config, contentRef, hovered }) {
    const phoneRef = useRef()

    // Reusable vectors to avoid GC in loop
    const vec = useRef(new THREE.Vector3())
    const quat = useRef(new THREE.Quaternion())

    useFrame((state, delta) => {
        // Find phone group/mesh if not already found
        if (!phoneRef.current) {
            scene.traverse(obj => {
                // Broad check for Phone object
                // REMOVED Node003_1 as it likely refers to the Desk/Surface
                // Re-added Node003_1 based on user request/debugging, BUT we must be careful.
                // If Node003_1 IS the phone body, then OK.
                if (obj.name.includes('Phone') || obj.name.includes('Smartphone')) {
                    // Prefer Groups, but accept Meshes if no Group found yet
                    if (obj.type === 'Group' || !phoneRef.current) {
                        phoneRef.current = obj
                        if (config && config.onPhoneFound) config.onPhoneFound(obj)
                        console.log("Found Phone (Animation Target):", obj.name, obj.type)
                    }
                }
            })
        }

        if (phoneRef.current) {
            const isFocused = view === 'phone'
            const isHovered = hovered

            // Store base transform
            if (!phoneRef.current.userData.basePos) {
                phoneRef.current.userData.basePos = phoneRef.current.position.clone()
                phoneRef.current.userData.baseRot = phoneRef.current.rotation.clone()
            }

            const basePos = phoneRef.current.userData.basePos
            const baseRot = phoneRef.current.userData.baseRot

            const targetPos = basePos.clone()
            const targetRot = baseRot.clone()

            if (isFocused) {
                targetPos.y += config.phoneLift || 0.185
                targetPos.x += config.phoneSlideX || -0.098
                targetPos.z += config.phoneSlideZ || 0.067
                targetRot.x += config.phoneTilt || 0.004
            } else if (isHovered && view === 'default') {
                // Hover lift (smaller, just vertical)
                targetPos.y += 0.05
            }

            // 1. Animate Phone Mesh (Local Transform)
            easing.damp3(phoneRef.current.position, targetPos, 0.4, delta)
            easing.dampE(phoneRef.current.rotation, targetRot, 0.4, delta)

            // 2. Sync Content to WORLD Position (Crucial fix for nested GLTF)
            if (contentRef && contentRef.current) {
                // Force update local transform to world matrix so we get fresh data
                phoneRef.current.updateMatrixWorld()

                // Get exact world position/rotation
                phoneRef.current.getWorldPosition(vec.current)
                phoneRef.current.getWorldQuaternion(quat.current)

                // Apply to Content Group (which is at Scene Root)
                contentRef.current.position.copy(vec.current)
                contentRef.current.quaternion.copy(quat.current)
            }
        }
    })
    return null
}
