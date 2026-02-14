import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Model as BlenderScene } from './components/Scene'
import './index.css'

export default function App() {
  const [target, setTarget] = useState(null)

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden">
      <Canvas shadows camera={{ position: [2, 1.5, 2], fov: 50 }}>
        {/* Lights - matching your Blender setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 2, 0]} intensity={35} decay={2} />
        <pointLight position={[-0.5, 1, 0.5]} intensity={5} decay={2} />
        <Environment preset="city" />

        {/* Your Blender Scene */}
        <Suspense fallback={null}>
          <BlenderScene />
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
