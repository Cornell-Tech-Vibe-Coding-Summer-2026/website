import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'

const BOOT_LINES = [
    '> initializing course...',
    '> loading desk · monitor · mug · notebook',
    '> module: vibe-coding-ethics',
    '> instructors online: hauke · jonathan · wendy',
]

export function LoadingOverlay() {
    const { progress, active } = useProgress()
    const [hidden, setHidden] = useState(false)
    const [bootIndex, setBootIndex] = useState(0)

    // Cycle through boot lines while loading.
    useEffect(() => {
        const t = setInterval(() => {
            setBootIndex((i) => Math.min(i + 1, BOOT_LINES.length))
        }, 600)
        return () => clearInterval(t)
    }, [])

    // Hide a moment after progress reaches 100, so the fade-out feels intentional.
    useEffect(() => {
        if (!active && progress >= 100) {
            const t = setTimeout(() => setHidden(true), 350)
            return () => clearTimeout(t)
        }
    }, [active, progress])

    return (
        <AnimatePresence>
            {!hidden && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[#050505] pointer-events-auto"
                >
                    {/* Subtle scanlines for that boot-up vibe */}
                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, rgba(0,255,65,0.4) 0 1px, transparent 1px 3px)',
                        }}
                    />

                    {/* Neon T mark with a soft glow + breathing animation */}
                    <motion.img
                        src={`${import.meta.env.BASE_URL}T-Neon-Green.png`}
                        alt=""
                        className="w-28 h-28 mb-8 select-none"
                        style={{
                            filter: 'drop-shadow(0 0 18px rgba(57,255,20,0.55)) drop-shadow(0 0 4px rgba(57,255,20,0.9))',
                        }}
                        animate={{ opacity: [0.7, 1, 0.7], scale: [0.97, 1, 0.97] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Title */}
                    <div className="text-white text-3xl font-black tracking-tighter uppercase mb-1">
                        Ethical Vibe Coding
                    </div>
                    <div className="text-[#39ff14]/80 text-[11px] font-mono tracking-[0.3em] uppercase mb-10">
                        TECHIE 1121 · Cornell Tech · Summer 2026
                    </div>

                    {/* Boot lines */}
                    <div className="font-mono text-[11px] text-[#39ff14]/80 leading-relaxed text-left min-w-[280px] mb-8">
                        {BOOT_LINES.slice(0, bootIndex).map((l, i) => (
                            <div key={i}>{l}</div>
                        ))}
                        {bootIndex < BOOT_LINES.length && (
                            <div className="text-[#39ff14]">
                                <span className="inline-block w-2 h-3 bg-[#39ff14] align-middle animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="w-[280px] h-[3px] bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-[#39ff14]"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(2, progress)}%` }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ boxShadow: '0 0 8px rgba(57,255,20,0.7)' }}
                        />
                    </div>
                    <div className="text-white/50 text-[10px] font-mono tracking-widest uppercase">
                        loading {progress.toFixed(0)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
