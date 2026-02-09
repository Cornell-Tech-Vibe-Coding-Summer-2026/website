import React, { useState } from 'react'
import { useGLTF, Html, useCursor, PivotControls, DragControls, useTexture } from '@react-three/drei'
import { MonitorContent } from './MonitorContent'
import { PhoneContent } from './PhoneContent'
import { NotepadContent } from './NotepadContent'
import * as THREE from 'three'

export function Desk({ onFocus, config, handlePivotEnd }) {
    const { nodes, materials } = useGLTF('/Desk.glb')

    // Load new assets
    const gavel = useGLTF('/Gavel.glb')
    const msgBoard = useGLTF('/Message board.glb')
    const notebook = useGLTF('/Notebook.glb')
    const thinBook = useGLTF('/Thin Book.glb')

    // Load textures
    const vapCover = useTexture('/VAP-cover.jpg')
    const ctSky = useTexture('/cornell-tech-sky.jpg')

    // Reverse texture Y-axis for standard mapping if needed, 
    // but typically useTexture handles this.
    vapCover.flipY = false
    ctSky.flipY = false

    const [hovered, setHovered] = useState(null)

    // Use cursor pointer when hovering interactive elements
    useCursor(!!hovered)

    // Interaction handlers
    const handlePointerOver = (e, name) => {
        e.stopPropagation()
        setHovered(name)
    }

    const handlePointerOut = () => {
        setHovered(null)
    }

    const handleClick = (e, target) => {
        e.stopPropagation()
        onFocus(target)
    }

    return (
        <group dispose={null}>
            {/* PC / Monitor Section - INDEPENDENT MESH AND SCREEN */}
            <group position={config.monMeshPos} rotation={config.monMeshRot}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['Monitor001|iMac|Dupli|'].geometry}
                    material={materials['Mat.008']}
                    scale={1.135}
                />
            </group>

            <group position={config.monScreenPos} rotation={config.monScreenRot}>
                <PivotControls
                    visible={config.showGizmos}
                    activeAxes={[true, true, true]}
                    depthTest={false}
                    scale={0.5}
                    onDragEnd={(matrix) => handlePivotEnd('monitor', matrix)}
                >
                    <group
                        onPointerOver={(e) => handlePointerOver(e, 'pc')}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => handleClick(e, 'pc')}
                    >
                        <Html
                            transform
                            distanceFactor={config.monDist}
                            portal={null}
                            occlude
                        >
                            <div style={{ opacity: hovered === 'pc' ? 1 : 0.9, transition: 'opacity 0.2s', pointerEvents: 'auto' }}>
                                <MonitorContent />
                            </div>
                        </Html>
                    </group>
                </PivotControls>
            </group>

            {/* Smartphone Section - INDEPENDENT MESH AND SCREEN */}
            <group position={config.phoneMeshPos} rotation={config.phoneMeshRot}>
                <group scale={5618.099}>
                    <mesh castShadow receiveShadow geometry={nodes.Phone_1.geometry} material={materials['White.001']} />
                    <mesh castShadow receiveShadow geometry={nodes.Phone_2.geometry} material={materials['Grey.001']} />
                    <mesh castShadow receiveShadow geometry={nodes.Phone_3.geometry} material={materials['Black.003']} />
                </group>
            </group>

            <group position={config.phoneScreenPos} rotation={config.phoneScreenRot}>
                <PivotControls
                    visible={config.showGizmos}
                    activeAxes={[true, true, true]}
                    depthTest={false}
                    scale={0.2}
                    onDragEnd={(matrix) => handlePivotEnd('phone', matrix)}
                >
                    <group
                        onPointerOver={(e) => handlePointerOver(e, 'phone')}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => handleClick(e, 'phone')}
                    >
                        <Html
                            transform
                            distanceFactor={config.phoneDist}
                            portal={null}
                        >
                            <div style={{ opacity: hovered === 'phone' ? 1 : 0.8, transition: 'opacity 0.2s', pointerEvents: 'auto' }}>
                                <PhoneContent />
                            </div>
                        </Html>
                    </group>
                </PivotControls>
            </group>

            {/* NEW ASSETS INTEGRATION */}

            {/* Gavel */}
            <group position={config.gavelPos}>
                <primitive object={gavel.scene} scale={0.5} />
            </group>

            {/* Message Board */}
            <group position={config.msgBoardPos}>
                <primitive object={msgBoard.scene} scale={1} />
            </group>

            {/* Notebook */}
            <group position={config.notebookPos}>
                <primitive object={notebook.scene} scale={1} />
            </group>

            {/* Thin Book with Custom VAP Cover */}
            <group position={config.thinBookPos} rotation={config.thinBookRot}>
                <primitive object={thinBook.scene} />
                {/* Find the cover mesh and apply texture - assuming it's the first mesh for now */}
                <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.01}>
                    <planeGeometry args={[0.2, 0.3]} />
                    <meshStandardMaterial map={vapCover} />
                </mesh>
            </group>

            {/* Paper Stack */}
            <group
                onPointerOver={(e) => handlePointerOver(e, 'papers')}
                onPointerOut={handlePointerOut}
                onClick={(e) => handleClick(e, 'papers')}
            >
                <group position={[-1.015, 0.946, -5.544]} rotation={[-Math.PI / 2, 0, 0.024]} scale={219.88}>
                    <mesh castShadow receiveShadow geometry={nodes.Paper_1.geometry} material={materials['mat21.001']} />
                    <mesh castShadow receiveShadow geometry={nodes.Paper_2.geometry} material={materials['mat15.001']} />
                </group>
                <Html
                    transform
                    distanceFactor={0.4}
                    position={[-1.015, 0.95, -5.544]}
                    rotation={[-Math.PI / 2, 0, 0.024]}
                    portal={null}
                    occlude
                >
                    <div style={{ opacity: hovered === 'papers' ? 1 : 0.8, transition: 'opacity 0.2s', pointerEvents: 'auto' }}>
                        <div className="bg-white/5 w-64 h-64 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                            <p className="text-white text-[10px] uppercase tracking-widest opacity-20">Reference Documents</p>
                        </div>
                    </div>
                </Html>
            </group>

            {/* Photo Frame Section with Custom Sky Texture */}
            <group position={[-0.536, 1.037, -4.292]} rotation={[-Math.PI / 2, 0, 1.37]} scale={48.098}>
                <mesh castShadow receiveShadow geometry={nodes['Blank_Picture_Frame|Node007|Dupli|_1'].geometry} material={materials['mat21.009']} />
                <mesh castShadow receiveShadow geometry={nodes['Blank_Picture_Frame|Node007|Dupli|_2'].geometry} material={materials['mat22.006']} />
                {/* Photo part - replacing with sky texture */}
                <mesh castShadow receiveShadow geometry={nodes['Blank_Picture_Frame|Node007|Dupli|_3'].geometry}>
                    <meshStandardMaterial map={ctSky} />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes['Blank_Picture_Frame|Node007|Dupli|_4'].geometry} material={materials['mat24.003']} />
            </group>

            {/* Static / Non-interactive parts grouped for performance */}
            <group>
                {/* Keyboard and Mouse */}
                <group position={[-1.036, 0.921, -4.943]} rotation={[-Math.PI / 2, 0, -1.61]} scale={20.517}>
                    {Object.keys(nodes).filter(k => k.startsWith('Keyboard')).map(key => (
                        <mesh key={key} geometry={nodes[key].geometry} material={materials[nodes[key].material?.name || 'mat21.013']} />
                    ))}
                </group>

                {/* Chair */}
                <group position={[-1.454, 0.633, -4.92]} rotation={[-Math.PI / 2, 0, 1.643]} scale={2.911}>
                    <mesh geometry={nodes.Chair003_1.geometry} material={materials['Executive.003']} />
                    <mesh geometry={nodes.Chair003_2.geometry} material={materials['Executive__1.003']} />
                    <mesh geometry={nodes.Chair003_3.geometry} material={materials['Executive__2.003']} />
                    <mesh geometry={nodes.Chair003_4.geometry} material={materials['Executive__3.003']} />
                </group>

                {/* Desk Lamp */}
                <DragControls>
                    <group position={[-0.564, 1.162, -5.526]} rotation={[-Math.PI / 2, 0, 2.301]} scale={[8561.474, 8561.474, 8561.471]}>
                        <mesh geometry={nodes.Light_Desk001_1.geometry} material={materials['Black.097']} />
                        <mesh geometry={nodes.Light_Desk001_2.geometry} material={materials['LightMetal.027']} />
                        <mesh geometry={nodes.Light_Desk001_3.geometry} material={materials['White.053']} />
                    </group>
                </DragControls>

                {/* Cup */}
                <DragControls>
                    <mesh
                        geometry={nodes['Cup001|Cup|Dupli|'].geometry}
                        material={materials['Mat.006']}
                        position={[-0.8, 0.909, -4.316]}
                        rotation={[-Math.PI / 2, 0, -0.522]}
                        scale={0.219}
                    />
                </DragControls>

                {/* Table / Cabinet Base */}
                <group position={[-0.897, 0.308, -3.493]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={212.203}>
                    <mesh geometry={nodes.Cabinet_Bed_Drawer_Tabl_1.geometry} material={materials.wood} />
                    <mesh geometry={nodes.Cabinet_Bed_Drawer_Tabl_2.geometry} material={materials._defaultMat} />
                    <mesh geometry={nodes.Cabinet_Bed_Drawer_Tabl_3.geometry} material={materials.metal} />
                </group>

                {/* Plant */}
                <DragControls>
                    <group position={[-1.037, 0.957, -2.813]} rotation={[Math.PI, 0, 0]} scale={10000}>
                        <mesh geometry={nodes['Houseplant-bfLOqIV5uP_1'].geometry} material={materials['Black.081']} />
                        <mesh geometry={nodes['Houseplant-bfLOqIV5uP_2'].geometry} material={materials['Brown.033']} />
                        <mesh geometry={nodes['Houseplant-bfLOqIV5uP_3'].geometry} material={materials['Plant_Green.033']} />
                    </group>
                </DragControls>

                {/* Mousepad */}
                <mesh
                    geometry={nodes.Mousepad.geometry}
                    material={materials.Mousepad}
                    position={[-1.026, 0.915, -4.458]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[17.231, 20.977, 0.228]}
                />

                {/* Mouse */}
                <DragControls>
                    <mesh
                        geometry={nodes.Mouse.geometry}
                        material={materials['Material.001']}
                        position={[-1.038, 0.913, -4.453]}
                        rotation={[-Math.PI / 2, 0, -1.417]}
                        scale={14736.426}
                    />
                </DragControls>
            </group>
        </group>
    )
}

useGLTF.preload('/Desk.glb')
useGLTF.preload('/Gavel.glb')
useGLTF.preload('/Message board.glb')
useGLTF.preload('/Notebook.glb')
useGLTF.preload('/Thin Book.glb')
