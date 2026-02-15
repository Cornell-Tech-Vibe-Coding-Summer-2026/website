import { useState, Suspense, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { useControls, folder } from 'leva'
import './index.css'
import * as THREE from 'three'

function InteractiveScene({ onMonitorClick, onPhoneClick, onObjectClick }) {
  const { scene } = useGLTF('/scene-unmerged.glb')

  // Enable shadows on all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // Define clickable objects (you can add more!)
  const clickableObjects = {
    'monitor': { handler: onMonitorClick, contains: ['monitor', 'imac'] },
    'phone': { handler: onPhoneClick, contains: ['phone'] },
    // Add more clickable objects here as needed
  }

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation()
        const clickedName = e.object.name.toLowerCase()

        // Check against all clickable objects
        for (const [key, config] of Object.entries(clickableObjects)) {
          if (config.contains.some(str => clickedName.includes(str))) {
            config.handler()
            break
          }
        }

        // Log for debugging - you can add more objects to clickableObjects based on this
        console.log('Clicked:', e.object.name)
        if (onObjectClick) onObjectClick(e.object.name)
      }}
      onPointerOver={(e) => {
        const hoveredName = e.object.name.toLowerCase()

        // Check if hovering over any clickable object
        const isClickable = Object.values(clickableObjects).some(config =>
          config.contains.some(str => hoveredName.includes(str))
        )

        if (isClickable) {
          document.body.style.cursor = 'pointer'
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    />
  )
}

function CameraController({ targetView, cameraPositions }) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame(() => {
    const config = cameraPositions[targetView] || cameraPositions.default
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

  // Leva controls for fine-tuning (with your adjusted values)
  const config = useControls({
    'Camera Positions': folder({
      defaultPos: { value: [-1.643, 1.589, 0.361], label: 'Default Position', step: 0.01 },
      defaultTarget: { value: [1.51, 0.09, 0], label: 'Default Target', step: 0.01 },
      monitorPos: { value: [-0.93, 1.25, -0.065], label: 'Monitor Position', step: 0.01 },
      monitorTarget: { value: [5.61, 0.18, 0], label: 'Monitor Target', step: 0.01 },
      phonePos: { value: [-0.805, 1.208, -0.319], label: 'Phone Position', step: 0.01 },
      phoneTarget: { value: [-0.43, 0.66, -0.48], label: 'Phone Target', step: 0.01 },
    }),
    'Lighting': folder({
      ambientIntensity: { value: 0.2, min: 0, max: 2, step: 0.1, label: 'Ambient' },
      ceilingIntensity: { value: 5, min: 0, max: 50, step: 1, label: 'Ceiling Light' },
      ceilingPos: { value: [-1.9, 3.1, -1.5], label: 'Ceiling Position', step: 0.1 },
      deskIntensity: { value: 0.2, min: 0, max: 20, step: 0.5, label: 'Desk Light' },
      deskPos: { value: [-0.7, 1.1, -0.6], label: 'Desk Position', step: 0.1 },
    })
  })

  // Camera positions using Leva controls
  const CAMERA_POSITIONS = {
    default: { position: config.defaultPos, target: config.defaultTarget },
    monitor: { position: config.monitorPos, target: config.monitorTarget },
    phone: { position: config.phonePos, target: config.phoneTarget },
  }

  const handleMonitorClick = () => {
    setView(view === 'monitor' ? 'default' : 'monitor')
  }

  const handlePhoneClick = () => {
    setView(view === 'phone' ? 'default' : 'phone')
  }

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden">
      <Canvas shadows camera={{ position: config.defaultPos, fov: 50 }}>
        {/* Lights - adjustable via Leva */}
        <ambientLight intensity={config.ambientIntensity} />
        <pointLight
          position={config.ceilingPos}
          intensity={config.ceilingIntensity}
          decay={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={config.deskPos}
          intensity={config.deskIntensity}
          decay={2}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <Environment preset="city" />

        {/* Camera Controller */}
        <CameraController targetView={view} cameraPositions={CAMERA_POSITIONS} />

        {/* Your Blender Scene */}
        <Suspense fallback={null}>
          <InteractiveScene
            onMonitorClick={handleMonitorClick}
            onPhoneClick={handlePhoneClick}
            onObjectClick={(name) => console.log('Object clicked:', name)}
          />
          <ContactShadows
            opacity={0.6}
            scale={10}
            blur={1.5}
            far={5}
            resolution={512}
            color="#000000"
            position={[0, 0, 0]}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          enablePan={false}
          enableZoom={false}
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
