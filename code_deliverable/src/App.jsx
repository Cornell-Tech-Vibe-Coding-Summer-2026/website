import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, GizmoHelper, GizmoViewport, PivotControls } from '@react-three/drei'
import { useControls, folder } from 'leva'
import { Desk } from './components/Desk'
import { CameraRig } from './components/CameraRig'
import './index.css'
import * as THREE from 'three'

export default function App() {
  const [target, setTarget] = useState(null)

  // Leva Controls configuration
  const [config, set, get] = useControls(() => ({
    General: folder({
      showGizmos: { value: true, label: 'Show Gizmos' }
    }),
    Desk: folder({
      deskPos: { value: [0.5, -4, 2], label: 'Position', step: 0.01 },
      deskRot: { value: [0, Math.PI / 2, 0], label: 'Rotation', step: 0.01 }
    }),
    Monitor: folder({
      monMeshPos: { value: [-0.546, 0.913, -4.926], label: 'Mesh Position', step: 0.001 },
      monMeshRot: { value: [-Math.PI / 2, 0, 3.105], label: 'Mesh Rotation', step: 0.001 },
      monScreenPos: { value: [-0.546, 1.48, -4.84], label: 'Screen Position', step: 0.001 },
      monScreenRot: { value: [0, 0, 0], label: 'Screen Rotation', step: 0.001 },
      monDist: { value: 1.2, label: 'Dist Factor', min: 0.1, max: 5, step: 0.1 }
    }),
    Phone: folder({
      phoneMeshPos: { value: [-0.721, 0.921, -5.252], label: 'Mesh Position', step: 0.001 },
      phoneMeshRot: { value: [Math.PI / 2, 0, 1.096], label: 'Mesh Rotation', step: 0.001 },
      phoneScreenPos: { value: [-0.721, 0.925, -5.252], label: 'Screen Position', step: 0.001 },
      phoneScreenRot: { value: [-1.57079, 0, 1.096], label: 'Screen Rotation', step: 0.001 },
      phoneDist: { value: 0.15, label: 'Dist Factor', min: 0.01, max: 1, step: 0.01 }
    }),
    "New Assets": folder({
      gavelPos: { value: [-1, 0.91, -4], label: 'Gavel Position', step: 0.01 },
      msgBoardPos: { value: [0, 1.5, -6], label: 'Msg Board Position', step: 0.01 },
      notebookPos: { value: [-0.5, 0.91, -4.2], label: 'Notebook Position', step: 0.01 },
      thinBookPos: { value: [1.5, 0.95, -4.5], label: 'Thin Book Position', step: 0.01 },
      thinBookRot: { value: [0, 0, 0], label: 'Thin Book Rotation', step: 0.1 }
    }),
    Camera: folder({
      camInitial: { value: [5, 2, 5], label: 'Initial Pos', step: 0.1 },
      "PC Focus": folder({
        pcFocusPos: { value: [1.4, 1.4, -3.5], label: 'Focus Pos', step: 0.1 },
        pcLookAt: { value: [-4.9, 1.4, -0.55], label: 'Look At', step: 0.1 }
      }),
      "Phone Focus": folder({
        phoneFocusPos: { value: [1.2, 1.2, -4.5], label: 'Focus Pos', step: 0.1 },
        phoneLookAt: { value: [-5.25, 0.9, -0.72], label: 'Look At', step: 0.1 }
      })
    })
  }))

  const handlePivotEnd = (type, matrix) => {
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    matrix.decompose(position, quaternion, scale)
    const rotation = new THREE.Euler().setFromQuaternion(quaternion)

    // Using get() from Leva to ensure we have the latest values from the UI
    const current = get()

    if (type === 'desk') {
      set({
        deskPos: [current.deskPos[0] + position.x, current.deskPos[1] + position.y, current.deskPos[2] + position.z],
        deskRot: [current.deskRot[0] + rotation.x, current.deskRot[1] + rotation.y, current.deskRot[2] + rotation.z]
      })
    } else if (type === 'monitor') {
      set({
        monScreenPos: [current.monScreenPos[0] + position.x, current.monScreenPos[1] + position.y, current.monScreenPos[2] + position.z],
        monScreenRot: [current.monScreenRot[0] + rotation.x, current.monScreenRot[1] + rotation.y, current.monScreenRot[2] + rotation.z]
      })
    } else if (type === 'phone') {
      set({
        phoneScreenPos: [current.phoneScreenPos[0] + position.x, current.phoneScreenPos[1] + position.y, current.phoneScreenPos[2] + position.z],
        phoneScreenRot: [current.phoneScreenRot[0] + rotation.x, current.phoneScreenRot[1] + rotation.y, current.phoneScreenRot[2] + rotation.z]
      })
    }
  }

  return (
    <div className="w-full h-full bg-[#050505] overflow-hidden">

      <Canvas shadows dpr={[1, 2]} bg="#050505">
        <CameraRig target={target} config={{
          initial: config.camInitial,
          pc: { position: config.pcFocusPos, lookAt: config.pcLookAt },
          phone: { position: config.phoneFocusPos, lookAt: config.phoneLookAt },
          papers: { position: [1.3, 1.3, -4.8], lookAt: [-5.54, 0.95, -1.01] }
        }} />

        {/* Helper Gizmos */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, 5, -5]} intensity={0.5} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <group position={config.deskPos} rotation={config.deskRot}>
            <PivotControls
              visible={config.showGizmos}
              activeAxes={[true, true, true]}
              depthTest={false}
              scale={1}
              offset={[-0.8, 0.9, -4.5]} // Centered on the desk props
              onDragEnd={(matrix) => handlePivotEnd('desk', matrix)}
            >
              <Desk onFocus={setTarget} config={config} handlePivotEnd={handlePivotEnd} />
              <ContactShadows
                opacity={0.4}
                scale={20}
                blur={2.4}
                far={10}
                resolution={256}
                color="#000000"
              />
            </PivotControls>
          </group>
        </Suspense>

        <OrbitControls
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          enablePan={false}
          autoRotate={!target}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-2">Vibe Coding Ethics</h1>
        <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Designing with Character • Cornell Tech 2026</p>
      </div>

      {target && (
        <button
          onClick={() => setTarget(null)}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-transform"
        >
          Back to Desktop
        </button>
      )}
    </div>
  )
}
