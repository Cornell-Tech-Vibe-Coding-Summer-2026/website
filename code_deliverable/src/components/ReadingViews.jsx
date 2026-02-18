export function SuggestedReadingsView({ onClose }) {
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

export function ReadingView({ onClose }) {
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
