import { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { useControls, folder, Leva } from 'leva'
import { easing } from 'maath'
import { SceneLayout } from './components/SceneLayout'
import * as THREE from 'three'

function PhoneAnimation({ scene, view, config }) {
  const phoneRef = useRef()

  useFrame((state, delta) => {
    // Find phone group/mesh if not already found
    if (!phoneRef.current) {
      scene.traverse(obj => {
        // Broad check for Phone object
        if (obj.name.includes('Phone') || obj.name.includes('Smartphone') || obj.name === 'Node003_1') {
          // Prefer Groups, but accept Meshes if no Group found yet
          if (obj.type === 'Group' || !phoneRef.current) {
            phoneRef.current = obj
            console.log("Found Phone (Animation Target):", obj.name, obj.type)
          }
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
        targetPos.y += config.phoneLift || 0.08
        targetPos.x += config.phoneSlideX || 0.02
        targetPos.z += config.phoneSlideZ || 0
        targetRot.x += config.phoneTilt || -0.15
      }

      easing.damp3(phoneRef.current.position, targetPos, 0.4, delta)
      easing.dampE(phoneRef.current.rotation, targetRot, 0.4, delta)
    }
  })
  return null
}

function InteractiveScene({ onMonitorClick, onPhoneClick, onObjectClick, onToggleLight, onNotepadClick, view, overlayConfig, onBack }) {
  const { scene } = useGLTF('/scene-unmerged.glb')

  // Define clickable objects 
  const clickableObjects = {
    'notepad': { handler: onNotepadClick, contains: ['notebook', 'paper', 'notepad', 'notepad_plane'] },
    'phone': { handler: onPhoneClick, contains: ['phone', 'smartphone', 'phone_plane'] },
    'lamp': { handler: onToggleLight, contains: ['lamp', 'light', 'bulb'] },
    'monitor': { handler: onMonitorClick, contains: ['monitor', 'imac', 'message_board', 'monitor_plane'] }
  }

  return (
    <group>
      <PhoneAnimation scene={scene} view={view} config={overlayConfig} />
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

            for (const [key, config] of Object.entries(clickableObjects)) {
              if (config.contains.some(str => name.includes(str))) {
                console.log('Triggering handler for:', key)
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
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      />

      {/* Visual Scene Layout for Content Planes */}
      <SceneLayout view={view} onBack={onBack} scene={scene} config={overlayConfig} />
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
      easing.damp3(controls.target, targetLookAt.current, 0.4, delta)
      controls.update()
    }
  })

  return null
}

export default function App() {
  const [view, setView] = useState('default')
  const [deskLightOn, setDeskLightOn] = useState(false)
  const controlsRef = useRef()

  // Leva controls 
  const config = useControls({
    'Camera Positions': folder({
      defaultPos: { value: [-1.643, 1.589, 0.361], label: 'Default Position', step: 0.01 },
      defaultTarget: { value: [1.51, 0.09, 0], label: 'Default Target', step: 0.01 },
      monitorPos: { value: [-0.93, 1.25, -0.065], label: 'Monitor Position', step: 0.01 },
      monitorTarget: { value: [5.61, 0.18, 0], label: 'Monitor Target', step: 0.01 },
      phonePos: { value: [-0.695, 1.22, -0.339], label: 'Phone Position', step: 0.01 },
      phoneTarget: { value: [-0.43, 0.07, -0.48], label: 'Phone Target', step: 0.01 },
      notepadPos: { value: [-1.01, 1.04, 0.1], label: 'Notepad Position', step: 0.01 },
      notepadTarget: { value: [-0.21, 0.43, 0.47], label: 'Notepad Target', step: 0.01 },
    }),
    'Lighting': folder({
      ambientIntensity: { value: 0.2, min: 0, max: 2, step: 0.1, label: 'Ambient' },
      ceilingIntensity: { value: 5, min: 0, max: 50, step: 1, label: 'Ceiling Light' },
      ceilingPos: { value: [-1.9, 3.1, -1.5], label: 'Ceiling Position', step: 0.1 },
      deskIntensity: { value: 1.2, min: 0, max: 20, step: 0.1, label: 'Desk Light' },
      deskPos: { value: [-0.6, 1.0, -0.5], label: 'Desk Position', step: 0.1 },
    }),
    'Phone Interaction': folder({
      phoneLift: { value: 0.18, min: 0, max: 1 },
      phoneTilt: { value: 0.01, min: -1.5, max: 1.5 },
      phoneSlideX: { value: -0.1, min: -0.5, max: 0.5 },
      phoneSlideZ: { value: 0.06, min: -0.5, max: 0.5 },
    })
  })

  // Camera positions using Leva controls
  const CAMERA_POSITIONS = {
    default: { position: config.defaultPos, target: config.defaultTarget },
    monitor: { position: config.monitorPos, target: config.monitorTarget },
    phone: { position: config.phonePos, target: config.phoneTarget },
    notepad: { position: config.notepadPos, target: config.notepadTarget },
  }

  const handleMonitorClick = () => {
    if (view === 'default') setView('monitor')
  }

  const handlePhoneClick = () => {
    if (view === 'default') setView('phone')
  }

  const handleNotepadClick = () => {
    if (view === 'default') setView('notepad')
  }

  const handleToggleLight = () => {
    setDeskLightOn(prev => !prev)
    console.log("Toggled Desk Light")
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
      <Canvas shadows camera={{ position: config.defaultPos, fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}>
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
          intensity={deskLightOn ? config.deskIntensity : 0}
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
            onNotepadClick={handleNotepadClick}
            onToggleLight={handleToggleLight}
            onObjectClick={(name) => console.log('Object clicked:', name)}
            overlayConfig={config}
            onBack={() => setView('default')}
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
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-2 drop-shadow-lg">Vibe Coding Ethics</h1>
        <p className="text-white/60 text-sm font-mono tracking-widest uppercase drop-shadow-md">Designing with Character • Cornell Tech 2026</p>
      </div>

      {/* View indicator and back button */}
      {view !== 'default' && (
        <button
          onClick={() => setView('default')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl"
        >
          Back to Desktop
        </button>
      )}

      {/* Instructions */}
      {view === 'default' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/60 text-xs pointer-events-none">
          Click on monitor, phone, or lamp to interact
        </div>
      )}

      {/* Explicit Leva Panel with high z-index */}
      <div className="absolute top-0 right-0 z-[10000]">
        <Leva flat fill={false} titleBar={false} theme={{
          colors: {
            highlight1: '#ffffff',
            highlight2: '#f0f0f0',
            highlight3: '#f0f0f0',
          }
        }} />
      </div>
      <style>{`
        #leva__root {
          z-index: 100000 !important;
          position: relative;
        }
      `}</style>
    </div>
  )
}
