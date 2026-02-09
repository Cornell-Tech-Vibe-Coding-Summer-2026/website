import React, { useState, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, GizmoHelper, GizmoViewport, PivotControls } from '@react-three/drei'
import { useControls, folder, button } from 'leva'
import { Desk } from './components/Desk'
import { CameraRig } from './components/CameraRig'
import './index.css'
import * as THREE from 'three'

export default function App() {
  const [target, setTarget] = useState(null)
  const [showExport, setShowExport] = useState(false)
  const [exportJson, setExportJson] = useState('')

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
      gavel: folder({
        gavelPos: { value: [-1, 0.91, -4], label: 'Position', step: 0.01 },
        gavelRot: { value: [0, 0, 0], label: 'Rotation', step: 0.1 },
        gavelScale: { value: 0.01, label: 'Scale', min: 0.0001, max: 1, step: 0.0001 }
      }),
      msgBoard: folder({
        msgBoardPos: { value: [0, 1.5, -6], label: 'Position', step: 0.01 },
        msgBoardRot: { value: [0, 0, 0], label: 'Rotation', step: 0.1 },
        msgBoardScale: { value: 0.01, label: 'Scale', min: 0.0001, max: 1, step: 0.0001 }
      }),
      notebook: folder({
        notebookPos: { value: [-0.5, 0.91, -4.2], label: 'Position', step: 0.01 },
        notebookRot: { value: [0, 0, 0], label: 'Rotation', step: 0.1 },
        notebookScale: { value: 0.01, label: 'Scale', min: 0.0001, max: 1, step: 0.0001 }
      }),
      thinBook: folder({
        thinBookPos: { value: [1.5, 0.95, -4.5], label: 'Position', step: 0.01 },
        thinBookRot: { value: [0, 0, 0], label: 'Rotation', step: 0.1 },
        thinBookScale: { value: 0.01, label: 'Scale', min: 0.0001, max: 1, step: 0.0001 }
      })
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
    }),
  }))

  // Ref to store the latest export logic to avoid Leva closure staleness
  const exportRef = useRef(null)

  // Update ref on every render
  exportRef.current = () => {
    try {
      const json = JSON.stringify(config, null, 2)
      setExportJson(json)
      setShowExport(true)
    } catch (e) {
      console.error("Export failed:", e)
    }
  }

  useControls('Utilities', {
    "Export Config": button(() => {
      if (exportRef.current) exportRef.current()
    })
  })

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
    <div className="relative w-full h-full bg-[#050505] overflow-hidden">

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

      {/* Export Overlay */}
      {showExport && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 w-[600px] max-w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold tracking-widest uppercase text-sm">Layout Configuration</h2>
              <button
                onClick={() => setShowExport(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-white/40 text-xs mb-4">Copy this JSON and paste it into your INITIAL_CONFIG or useControls default values.</p>
            <textarea
              readOnly
              value={exportJson}
              className="w-full h-64 bg-black/50 border border-white/10 rounded-lg p-4 text-xs font-mono text-[#4af] focus:outline-none focus:border-[#4af]"
              onClick={(e) => e.target.select()}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportJson)
                  setShowExport(false)
                }}
                className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-[#ccc]"
              >
                Copy & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
