export function About() {
    return (
        <section id="about-details" className="section-padding border-t border-black/5 dark:border-white/5">
            <div className="max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                            Philosophy
                        </h2>
                        <div className="w-12 h-[2px] bg-accent"></div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert">
                        <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light mb-6">
                            I build digital experiences that are minimal, accessible, and remarkably fast. Complexity should reside in the code, invisible, while the user interface remains effortless and intuitive.
                        </p>
                        <p className="text-secondary leading-relaxed">
                            With a strong focus on frontend architecture and design systems, my work aims to solve real problems through elegant, systematic thinking and deep technical execution.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
