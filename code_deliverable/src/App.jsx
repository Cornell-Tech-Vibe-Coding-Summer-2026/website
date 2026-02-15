import { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, Html } from '@react-three/drei'
import { useControls, folder, button } from 'leva'
import { easing } from 'maath'
import { MonitorContent } from './components/MonitorContent'
import * as THREE from 'three'

function PhoneAnimation({ scene, view }) {
  const phoneRef = useRef()

  useFrame((state, delta) => {
    // Find phone group/mesh if not already found
    if (!phoneRef.current) {
      scene.traverse(obj => {
        if (obj.name === 'Smartphone' || obj.name === 'Node003_1') {
          phoneRef.current = obj
          console.log("Found Phone node:", obj.name)
        }
      })
    }

    if (phoneRef.current) {
      // Simple "pick up" animation
      const isFocused = view === 'phone'

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
        targetPos.y += 0.1 // Lift slightly
        targetPos.x += 0.05
        targetRot.x -= 0.2
      }

      easing.damp3(phoneRef.current.position, targetPos, 0.4, delta)
      easing.dampE(phoneRef.current.rotation, targetRot, 0.4, delta)
    }
  })
  return null
}

function InteractiveScene({ onMonitorClick, onPhoneClick, onObjectClick, view }) {
  const { scene } = useGLTF('/scene-unmerged.glb')

  // Ref for the monitor pivot to attach content
  const [monitorRef, setMonitorRef] = useState(null)

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
      // Look for monitor screen to attach content
      if (child.name === 'Monitor' || child.name === 'Message_Board') {
        if (!monitorRef) setMonitorRef(child)
      }
    })
  }, [scene])

  // Define clickable objects (using correct names)
  const clickableObjects = {
    'monitor': { handler: onMonitorClick, contains: ['monitor', 'imac', 'message_board'] },
    'phone': { handler: onPhoneClick, contains: ['smartphone', 'phone', 'node003_1'] },
  }

  return (
    <group>
      <PhoneAnimation scene={scene} view={view} />
      <primitive
        object={scene}
        onClick={(e) => {
          e.stopPropagation()
          const clickedNode = e.object
          let targetFound = false

          console.log('Clicked Leaf:', clickedNode.name)

          // Traverse up to find a matching interactive parent
          let curr = clickedNode
          while (curr) {
            const name = curr.name.toLowerCase()
            console.log(' Checking ancestor:', name)

            // Check against all clickable objects
            for (const [key, config] of Object.entries(clickableObjects)) {
              if (config.contains.some(str => name.includes(str))) {
                console.log('Triggering handler for:', key, 'on node:', name)
                config.handler()
                targetFound = true
                break
              }
            }
            if (targetFound) break
            curr = curr.parent
          }

          if (!targetFound && onObjectClick) onObjectClick(clickedNode.name)
        }}
        onPointerOver={(e) => {
          // similar logic for hover if needed
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      />

      {/* Inject Monitor Content */}
      {monitorRef && (
        <primitive object={monitorRef}>
          <Html
            transform
            distanceFactor={0.1}
            position={[0, 0, 0.05]}
            rotation={[-1.57, 0, 0]}
            style={{
              width: '1024px',
              height: '768px',
              transform: 'scale(0.1)',
              background: '#000',
              pointerEvents: 'none'
            }}
          >
            <MonitorContent />
          </Html>
        </primitive>
      )}
    </group>
  )
}

function CameraController({ targetView, cameraPositions }) {
  const { camera, pointer } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    const config = cameraPositions[targetView] || cameraPositions.default

    // Base target position
    targetPosition.current.set(...config.position)
    targetLookAt.current.set(...config.target)

    // Apply Parallax ONLY in default view
    if (targetView === 'default') {
      targetPosition.current.x += (pointer.x * 0.2)
      targetPosition.current.y += (pointer.y * 0.2)
    }

    // Smooth camera movement
    easing.damp3(camera.position, targetPosition.current, 0.4, delta)

    // Update OrbitControls target
    const controls = camera.userData.controls
    if (controls) {
      easing.damp3(controls.target, targetLookAt.current, 0.4, delta)
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
    if (view === 'default') setView('monitor')
  }

  const handlePhoneClick = () => {
    if (view === 'default') setView('phone')
  }

  // Back on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setView('default')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
            view={view}
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
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
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
