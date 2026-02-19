import { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei'
import { useControls, folder, Leva } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { InteractiveScene } from './components/InteractiveScene'
import { CameraController } from './components/CameraController'
import { SuggestedReadingsView, ReadingView } from './components/ReadingViews'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

import { AnimatePresence } from 'framer-motion'

export default function App() {
  const [view, setView] = useState('default')
  const [overlayOrigin, setOverlayOrigin] = useState({ x: 0, y: 0 })
  const [deskLightOn, setDeskLightOn] = useState(false)
  const [phoneMesh, setPhoneMesh] = useState(null)
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
      notepadPos: { value: [-1.01, 0.995, 0.1], label: 'Notepad Position', step: 0.01 },
      notepadTarget: { value: [-0.21, 0.43, 0.47], label: 'Notepad Target', step: 0.01 },
      paperStackPos: { value: [0.06, -0.01, 0.19], label: 'Paper Stack Pos', step: 0.01 },
    }),
    'Lighting': folder({
      ambientIntensity: { value: 0.6, min: 0, max: 2, step: 0.1, label: 'Ambient' },
      ceilingIntensity: { value: 5, min: 0, max: 50, step: 1, label: 'Ceiling Light' },
      ceilingPos: { value: [-1.9, 3.1, -1.5], label: 'Ceiling Position', step: 0.1 },
      deskIntensity: { value: 1.2, min: 0, max: 20, step: 0.1, label: 'Desk Light' },
      deskPos: { value: [-0.6, 1.0, -0.5], label: 'Desk Position', step: 0.1 },
    }),
    'Phone Interaction': folder({
      phoneLift: { value: 0.185, min: 0, max: 1 },
      phoneTilt: { value: 0.004, min: -1.5, max: 1.5 },
      phoneSlideX: { value: -0.098, min: -0.5, max: 0.5 },
      phoneSlideZ: { value: 0.067, min: -0.5, max: 0.5 },
    }),
    'Shadows & Performance': folder({
      perfVisible: { value: false, label: 'Show Perf Monitor' },
      shadowsEnabled: { value: true, label: 'Enable Shadows' },
      shadowMode: { value: 'essential', options: ['all', 'essential', 'none'], label: 'Shadow Mode' },
      contactOpacity: { value: 0.7, min: 0, max: 1, label: 'Contact Opacity' },
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

  const handleReadingClick = (origin) => {
    if (origin) setOverlayOrigin(origin)
    if (view === 'default') setView('reading')
  }

  const handlePapersClick = (origin) => {
    if (origin) setOverlayOrigin(origin)
    if (view === 'default') setView('papers')
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

        {/* Lights */}
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

        {/* Interactive Scene */}
        <Suspense fallback={<Loader />}>
          <InteractiveScene
            view={view}
            onMonitorClick={handleMonitorClick}
            onPhoneClick={handlePhoneClick}
            onNotepadClick={handleNotepadClick}
            onReadingClick={handleReadingClick}
            onPapersClick={handlePapersClick}
            onToggleLight={handleToggleLight}
            onObjectClick={(name) => console.log('Object clicked:', name)}
            overlayConfig={config}
            shadowConfig={{ enabled: config.shadowsEnabled, mode: config.shadowMode }}
            onBack={() => setView('default')}
            setPhoneMesh={setPhoneMesh}
            phoneMesh={phoneMesh}
            paperStackPos={config.paperStackPos}
          />
          <ContactShadows
            opacity={config.contactOpacity}
            scale={12}
            blur={2}
            far={5}
            resolution={1024}
            color="#000000"
            position={[0, 0.02, 0]}
          />
          {config.perfVisible && <Perf position="bottom-left" />}
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
      <div className="absolute top-8 left-8 z-[100] pointer-events-none">
        <h1 className="text-white text-5xl font-black tracking-tighter uppercase mb-2 drop-shadow-lg">Vibe Coding Ethics</h1>
        <p className="text-white/60 text-sm font-mono tracking-widest uppercase drop-shadow-md">Designing with Character • Cornell Tech 2026</p>
      </div>

      {/* Reading View Overlay */}
      <AnimatePresence>
        {view === 'reading' && (
          <ReadingView onClose={() => setView('default')} origin={overlayOrigin} />
        )}
        {/* Suggested Readings View Overlay */}
        {view === 'papers' && (
          <SuggestedReadingsView onClose={() => setView('default')} origin={overlayOrigin} />
        )}
      </AnimatePresence>

      {/* View indicator and back button */}
      {view !== 'default' && (
        <button
          onClick={() => setView('default')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl"
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
            accent: '#ffffff',
            bg: '#1a1a1a',
            fg: '#ffffff',
          }
        }} />
      </div>
    </div>
  )
}
