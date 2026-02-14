import { useState, Suspense, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import './index.css'
import * as THREE from 'three'

// Camera positions from Blender (actual values from your scene!)
const CAMERA_POSITIONS = {
  default: { position: [-1.773, 1.589, -1.109], target: [0, 0.5, 0] },
  monitor: { position: [-1.017, 1.211, -0.155], target: [-0.5, 0.7, 0] },
  phone: { position: [-0.645, 1.058, -0.449], target: [-0.4, 0.7, -0.2] },
}

function InteractiveScene({ onMonitorClick, onPhoneClick }) {
  const { nodes, materials } = useGLTF('/scene-transformed-transformed.glb')

  // Debug: log all available mesh nodes
  console.log('Available meshes:', Object.keys(nodes))

  return (
    <group dispose={null}>
      {/* Non-interactive meshes */}
      <mesh geometry={nodes['Blank_Picture_Frame|Node007|Dupli|'].geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes['cornell-tech-sky'].geometry} material={materials['cornell-tech-sky']} />
      <mesh geometry={nodes['VAP-cover'].geometry} material={materials['VAP-cover']} />
      <mesh geometry={nodes.Message_Board.geometry} material={materials.Mat} />

      {/* Interactive Monitor */}
      <mesh
        geometry={nodes['Monitor001|iMac|Dupli|'].geometry}
        material={materials['Mat.008']}
        onClick={(e) => {
          e.stopPropagation()
          onMonitorClick()
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      />

      {/* Monitor Plane (screen placeholder) */}
      <mesh geometry={nodes.Monitor_Plane.geometry} material={materials.PaletteMaterial002} />
    </group>
  )
}

function CameraController({ targetView }) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame(() => {
    const config = CAMERA_POSITIONS[targetView] || CAMERA_POSITIONS.default
    targetPosition.current.set(...config.position)
    targetLookAt.current.set(...config.target)

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05)

    // Update OrbitControls target
    const controls = camera.userData.controls
    if (controls) {
      controls.target.lerp(targetLookAt.current, 0.05)
      controls.update()
    }
  })

  return null
}

export default function App() {
  const [view, setView] = useState('default')
  const controlsRef = useRef()

  const handleMonitorClick = () => {
    setView(view === 'monitor' ? 'default' : 'monitor')
  }

  const handlePhoneClick = () => {
    setView(view === 'phone' ? 'default' : 'phone')
  }

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden">
      <Canvas shadows camera={{ position: [-1.773, 1.589, -1.109], fov: 50 }}>
        {/* Lights - reduced intensity */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 2, 0]} intensity={15} decay={2} />
        <pointLight position={[-0.5, 1, 0.5]} intensity={3} decay={2} />
        <Environment preset="city" />

        {/* Camera Controller */}
        <CameraController targetView={view} />

        {/* Your Blender Scene */}
        <Suspense fallback={null}>
          <InteractiveScene
            onMonitorClick={handleMonitorClick}
            onPhoneClick={handlePhoneClick}
          />
          <ContactShadows
            opacity={0.4}
            scale={20}
            blur={2.4}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          enablePan={false}
          autoRotate={view === 'default'}
          autoRotateSpeed={0.5}
          onUpdate={(controls) => {
            if (controls) {
              controls.object.userData.controls = controls
            }
          }}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-2">Vibe Coding Ethics</h1>
        <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Designing with Character • Cornell Tech 2026</p>
      </div>

      {/* View indicator and back button */}
      {view !== 'default' && (
        <button
          onClick={() => setView('default')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-transform"
        >
          Back to Desktop
        </button>
      )}

      {/* Instructions */}
      {view === 'default' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 text-xs pointer-events-none">
          Click on monitor or phone to focus
        </div>
      )}
    </div>
  )
}
