import { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, Html } from '@react-three/drei'
import { useControls, folder, Leva } from 'leva'
import { easing } from 'maath'
import { Perf } from 'r3f-perf'
import { SceneLayout } from './components/SceneLayout'
import { PhoneContent } from './components/PhoneContent'
import * as THREE from 'three'

function PhoneAnimation({ scene, view, config, contentRef, hovered }) {
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

function SuggestedReadingsView({ onClose }) {
  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#eaeaea] text-gray-900 w-full max-w-5xl h-[90vh] p-8 rounded shadow-2xl overflow-hidden relative flex flex-col" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-2xl opacity-50 hover:opacity-100 z-10">✕</button>

        <h2 className="text-3xl font-bold mb-6 text-center text-[#333]">Suggested Readings</h2>

        <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-center space-x-8 px-4 pb-4 snap-x">
          {/* Paper 1 */}
          <div className="flex-shrink-0 w-[400px] h-[600px] bg-white shadow-lg transform transition-transform hover:scale-105 cursor-pointer border border-gray-200 p-8 flex flex-col relative snap-center group">
            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-xs text-right">PDF</div>
            <h3 className="text-xl font-bold mb-2 font-serif">Bias in Computer Systems</h3>
            <p className="text-sm text-gray-500 italic mb-6">Batya Friedman and Helen Nissenbaum (1996)</p>
            <div className="flex-1 bg-gray-50 text-[10px] text-gray-400 p-4 font-serif leading-relaxed overflow-hidden text-justify select-none">
              <p>ABSTRACT: From an analysis of bias in computer systems, we identify three categories: preexisting, technical, and emergent. Preexisting bias has its roots in social institutions, practices, and attitudes. Technical bias arises from technical constraints or considerations. Emergent bias arises in a context of use...</p>
              <div className="mt-4 h-full w-full bg-linear-to-b from-transparent to-white/90 absolute bottom-0 left-0"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <span className="text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Read Full Paper →</span>
            </div>
          </div>

          {/* Paper 2 */}
          <div className="flex-shrink-0 w-[400px] h-[600px] bg-white shadow-lg transform transition-transform hover:scale-105 cursor-pointer border border-gray-200 p-8 flex flex-col relative snap-center group">
            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-xs text-right">PDF</div>
            <h3 className="text-xl font-bold mb-2 font-serif">Value Sensitive Design</h3>
            <p className="text-sm text-gray-500 italic mb-6">Batya Friedman et al.</p>
            <div className="flex-1 bg-gray-50 text-[10px] text-gray-400 p-4 font-serif leading-relaxed overflow-hidden text-justify select-none">
              <p>Value Sensitive Design (VSD) is a theoretically grounded approach to the design of technology that accounts for human values in a principled and comprehensive manner. Throughout the design process, VSD emphasizes the ethical import of design decisions...</p>
              <div className="mt-4 h-full w-full bg-linear-to-b from-transparent to-white/90 absolute bottom-0 left-0"></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <span className="text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Read Full Paper →</span>
            </div>
          </div>

          {/* Paper 3 - Placeholder */}
          <div className="flex-shrink-0 w-[400px] h-[600px] bg-gray-50 shadow-inner flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <p className="font-bold text-lg">More Resources</p>
              <p className="text-sm">Public Interest Tech</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-gray-400 text-xs">
          Scroll horizontally to view papers
        </div>
      </div>
    </div>
  )
}

function ReadingView({ onClose }) {
  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#f4e4bc] text-gray-900 w-full max-w-4xl h-[90vh] p-12 rounded shadow-2xl overflow-y-auto relative font-serif" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-8 right-8 text-2xl opacity-50 hover:opacity-100">✕</button>

        <h1 className="text-5xl font-bold mb-4 font-serif text-[#2a2a2a]">Values at Play in Digital Games</h1>
        <h2 className="text-2xl italic mb-12 text-[#5a5a5a]">Mary Flanagan and Helen Nissenbaum</h2>

        <div className="grid grid-cols-2 gap-12 text-lg leading-relaxed">
          <div>
            <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
              Values are not just added to technology; they are embedded within it. This core insight drives the "Values at Play" (VAP) framework, offering a systematic approach to identifying, negotiating, and implementing ethical values in game design.
            </p>
            <p className="mb-6">
              Designers must move beyond "neutrality" and recognize that every design choice—from mechanics to narrative to character representation—expresses a value system. The VAP framework empowers creators to make these choices intentional.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4 border-b border-gray-400 pb-2">Core VAP Heuristics</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Discovery:</strong> Translating values into design elements.</li>
              <li><strong>Translation:</strong> Implement values via mechanics.</li>
              <li><strong>Verification:</strong> resolving conflicts.</li>
            </ul>
          </div>
          <div className="space-y-8">
            <div className="p-6 bg-white/50 rounded border border-gray-300">
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Suggested Reading</h4>
              <ul className="space-y-3 text-base">
                <li><a href="#" className="text-blue-800 underline hover:text-blue-600">Introduction to Values at Play</a></li>
                <li><a href="#" className="text-blue-800 underline hover:text-blue-600">Bias in Computer Systems (Friedman)</a></li>
                <li><a href="#" className="text-blue-800 underline hover:text-blue-600">Download Full Syllabus (PDF)</a></li>
              </ul>
            </div>

            <div className="p-6 bg-[#2a2a2a] text-white rounded">
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-yellow-500">Public Interest Tech</h4>
              <p className="text-sm opacity-80 mb-4">
                Explore how technology can serve the public good. Vibe Coding integrates these principles directly into the technical workflow.
              </p>
              <a href="https://pitechethics.github.io/" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 border border-white/30 hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-wider">
                Visit PiTech Ethics
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// Debug: Print Scene Hierarchy once


function InteractiveScene({ onMonitorClick, onPhoneClick, onObjectClick, onToggleLight, onNotepadClick, view, overlayConfig, shadowConfig, onBack, setPhoneMesh, phoneMesh, onReadingClick, onPapersClick, paperStackPos }) {
  const { scene } = useGLTF('/scene-unmerged.glb')

  // Fix: Lift Book and Notebook slightly to avoid Z-fighting/Occlusion with Desk
  useEffect(() => {
    scene.traverse((obj) => {
      const name = obj.name.toLowerCase()
      // Lift Book Group
      if (name.includes('book') || name.includes('values')) {
        // Apply to Groups or Meshes
        if (obj.isMesh || obj.type === 'Group') {
          // Check if already corrected
          if (!obj.userData.correctedHeight) {
            obj.position.y += 0.015
            obj.updateMatrixWorld()
            obj.userData.correctedHeight = true
          }
        }
      }
      // Lift Notebook Group slightly
      if (name.includes('notebook')) {
        if ((obj.isMesh || obj.type === 'Group') && !obj.userData.correctedHeight) {
          obj.position.y += 0.005
          obj.updateMatrixWorld()
          obj.userData.correctedHeight = true
        }
      }
    })
  }, [scene])

  const contentRef = useRef()
  const [hoveredTarget, setHoveredTarget] = useState(null)
  const stackRef = useRef()

  // Apply Paper Stack Position
  useFrame(() => {
    if (paperStackPos && stackRef.current) {
      stackRef.current.position.set(...paperStackPos)
    } else if (!stackRef.current) {
      // Try to find stack
      const stack = scene.getObjectByName('Paper_1') || scene.getObjectByName('Stack')
      if (stack) {
        stackRef.current = stack
        // Save initial pos if needed, but Leva overrides
      }
    }
  })

  // Define clickable objects 
  const clickableObjects = {
    'notepad': { handler: onNotepadClick, contains: ['notebook', 'notepad', 'notepad_plane'], excludes: ['stack', 'paper', 'papers'], lift: false },
    'phone': { handler: onPhoneClick, contains: ['phone', 'smartphone', 'phone_plane', 'node003_1'], lift: false }, // Lift handled by PhoneAnimation
    'lamp': { handler: onToggleLight, contains: ['lamp', 'light', 'bulb'], lift: false },
    // Monitor mesh itself is no longer clickable/hoverable, only peripherals
    'keyboard': { handler: onMonitorClick, contains: ['keyboard', 'keys'], lift: true },
    'mouse': { handler: onMonitorClick, contains: ['mouse'], excludes: ['pad'], lift: true },
    'book': { handler: onReadingClick, contains: ['book', 'values', 'play'], excludes: ['notebook', 'phone', 'node003'], lift: true },
    'paper_stack': { handler: onPapersClick, contains: ['stack', 'paper_1', 'papers'], lift: true }
  }

  // Animation Loop for Hover Lift
  // We use a ref map to store initial Y positions to avoid drift
  const initialY = useRef({})

  useFrame((state, delta) => {
    scene.traverse((child) => {
      if (child.isMesh || child.type === 'Group') {
        // Identify if this child belongs to a "liftable" interaction
        let targetKey = null
        const name = child.name.toLowerCase()

        for (const [key, config] of Object.entries(clickableObjects)) {
          if (config.lift && config.contains.some(str => name.includes(str))) {
            // Check excludes
            if (config.excludes && config.excludes.some(str => name.includes(str))) continue

            targetKey = key
            break
          }
        }

        if (targetKey) {
          // Initialize base position
          if (initialY.current[child.uuid] === undefined) {
            initialY.current[child.uuid] = child.position.y
          }

          const targetY = (hoveredTarget === targetKey)
            ? initialY.current[child.uuid] + 0.05 // Lift amount
            : initialY.current[child.uuid]

          // Smoothly damp to target
          easing.damp(child.position, 'y', targetY, 0.1, delta)
        }
      }
    })
  })

  // Enable shadows on all meshes and fix materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {

        // Shadow Logic based on Config
        const isEnabled = shadowConfig.enabled
        const mode = shadowConfig.mode // 'all', 'essential', 'none'

        if (!isEnabled || mode === 'none') {
          child.castShadow = false
          child.receiveShadow = false
        } else if (mode === 'all') {
          child.castShadow = true
          child.receiveShadow = true
        } else if (mode === 'essential') {
          // Essential: Desk receives, Key Objects cast
          const name = child.name.toLowerCase()
          const isDesk = name.includes('desk') || name.includes('wall') || name.includes('floor')
          const isKeyObject = name.includes('phone') || name.includes('monitor') || name.includes('lamp') || name.includes('book') || name.includes('keyboard') || name.includes('mouse') || name.includes('cup')

          child.receiveShadow = true // Most things should receive for grounding
          child.castShadow = isKeyObject
        }

        // If material is Basic, it won't receive shadows. Upgrade to Standard.
        if (child.material.type === 'MeshBasicMaterial') {
          child.material = new THREE.MeshStandardMaterial({
            map: child.material.map,
            color: child.material.color,
            transparent: child.material.transparent,
            opacity: child.material.opacity,
            side: child.material.side,
            roughness: 0.5,
            metalness: 0.1
          })
        }
        // Ensure material interacts with light
        if (child.material) {
          child.material.envMapIntensity = 0.5
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene, shadowConfig])



  return (
    <group>
      <PhoneAnimation scene={scene} view={view} config={{ ...overlayConfig, onPhoneFound: setPhoneMesh }} contentRef={contentRef} hovered={hoveredTarget === 'phone'} />



      <primitive
        object={scene}
        onClick={(e) => {
          e.stopPropagation()
          const clickedNode = e.object
          let targetFound = false

          console.log('Clicked Leaf:', clickedNode.name)

          let curr = e.object
          while (curr) {
            const name = curr.name.toLowerCase()

            for (const [key, config] of Object.entries(clickableObjects)) {
              if (config.contains.some(str => name.includes(str))) {
                // Check excludes
                if (config.excludes && config.excludes.some(str => name.includes(str))) continue

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
        onPointerOver={(e) => {
          e.stopPropagation()

          // Disable hover interactions when zoomed in specific views
          if (view === 'phone' || view === 'monitor') {
            document.body.style.cursor = 'auto'
            return
          }

          const clickedNode = e.object
          console.log('Hovered Mesh:', clickedNode.name, 'Parent:', clickedNode.parent ? clickedNode.parent.name : 'None')

          // Find hover target
          let curr = e.object
          while (curr) {
            const name = curr.name.toLowerCase()

            // Debugging Book/Notebook overlap
            if (name.includes('book') || name.includes('values') || name.includes('notebook')) {
              console.log('Hover Check:', name, 'on', curr.name)
            }
            for (const [key, config] of Object.entries(clickableObjects)) {
              if (config.contains.some(str => name.includes(str))) {
                // Check excludes
                if (config.excludes && config.excludes.some(str => name.includes(str))) continue

                // Only change cursor if we found a valid target
                document.body.style.cursor = 'pointer'
                setHoveredTarget(key)
                return
              }
            }
            curr = curr.parent
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
          setHoveredTarget(null)
        }}
      />



      {/* Visual Scene Layout for Content Planes (Phone restored) */}
      <SceneLayout view={view} onBack={onBack} onPhoneClick={onPhoneClick} scene={scene} config={overlayConfig} phoneContentRef={contentRef} />
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
      if (targetView === 'reading') {
        // Auto-position for reading (overhead or zoomed)
        // Actually, reading view is an overlay, so we might want to stay in default or zoom to book?
        // Let's keep camera static or move to a "reading" position.
        // For now, let's reuse 'notepad' position or a new one.
        // Let's just use 'default' but maybe slightly zoomed?
        // The user didn't specify strict camera for reading, just "nice looking page".
        // The Overlay covers the screen, so camera position matters less, 
        // but let's drift to "notepad" for context.

        // Let's actually NOT move camera for reading overlay, 
        // or move to a generic "desk focus".
      }

      easing.damp3(controls.target, targetLookAt.current, 0.4, delta)
      controls.update()
    }
  })

  return null
}

export default function App() {
  const [view, setView] = useState('default')
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
      notepadPos: { value: [-1.01, 1.04, 0.1], label: 'Notepad Position', step: 0.01 },
      notepadTarget: { value: [-0.21, 0.43, 0.47], label: 'Notepad Target', step: 0.01 },
      paperStackPos: { value: [0, 0, 0], label: 'Paper Stack Pos', step: 0.01 }, // Placeholder default, will need tuning
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

  const handleReadingClick = () => {
    if (view === 'default') setView('reading')
  }

  const handlePapersClick = () => {
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
        <Suspense fallback={<Html center>Loading 3D Scene...</Html>}>
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
      {view === 'reading' && (
        <ReadingView onClose={() => setView('default')} />
      )}
      {/* Suggested Readings View Overlay */}
      {view === 'papers' && (
        <SuggestedReadingsView onClose={() => setView('default')} />
      )}



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
