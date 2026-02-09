import React from 'react'

export function PhoneContent() {
    const reels = [
        { id: 1, title: 'How to vibe code in 30s', author: '@hauke.haus', color: 'bg-indigo-900', emoji: '🚀' },
        { id: 2, title: 'Why code needs values', author: '@ethic.vision', color: 'bg-rose-900', emoji: '⚖️' },
        { id: 3, title: 'Summer 2026: Join the class!', author: '@cornell.tech', color: 'bg-emerald-900', emoji: '🎓' }
    ]

    return (
        <div className="w-[320px] h-[640px] bg-black text-white flex flex-col overflow-y-auto snap-y snap-mandatory select-none custom-scrollbar-none rounded-[40px] border-8 border-[#0b0b0b]">
            {reels.map((reel) => (
                <div key={reel.id} className="flex-shrink-0 w-full h-full snap-start relative flex items-center justify-center border-b border-white/5">
                    <div className={`absolute inset-0 ${reel.color} opacity-40`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />

                    <div className="text-8xl transform hover:scale-110 transition-transform duration-500 z-0">
                        {reel.emoji}
                    </div>

                    <div className="absolute bottom-12 left-6 right-6 z-20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-[10px] font-bold tracking-tight">
                                {reel.author.substring(1, 4).toUpperCase()}
                            </div>
                            <p className="font-black text-sm tracking-tight">{reel.author}</p>
                        </div>
                        <p className="text-lg font-medium leading-tight mb-4">{reel.title}</p>
                        <div className="flex gap-4 opacity-60 text-[10px] font-mono uppercase tracking-[0.2em]">
                            <span>#vibecoding</span>
                            <span>#ethics</span>
                        </div>
                    </div>

                    {/* Side Actions */}
                    <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-30">
                        <div className="flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-rose-500 transition-colors">❤️</div>
                            <span className="text-[10px] font-bold">2.4k</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 transition-colors">💬</div>
                            <span className="text-[10px] font-bold">128</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
