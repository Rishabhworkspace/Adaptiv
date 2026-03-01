import { Experience as ExperienceType } from "@/types/portfolio";
import { motion } from "framer-motion";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
    return (
        <section id="experience" className="py-32 scroll-mt-20">
            <div className="flex items-center gap-4 mb-24">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Journey Log</h2>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-grow mt-2"></div>
            </div>

            <div className="flex flex-col gap-24">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start group"
                    >
                        {/* Timeframe & Company (Left Side) */}
                        <div className="w-full lg:w-1/3 shrink-0 lg:text-right flex flex-col items-start lg:items-end">
                            <h3 className="text-2xl lg:text-3xl font-light text-secondary group-hover:text-primary transition-colors duration-500">
                                {exp.company}
                            </h3>
                            <span className="text-accent font-mono text-sm tracking-widest uppercase mt-2 opacity-80">
                                {exp.duration}
                            </span>
                        </div>

                        {/* Role & Details (Right Side) */}
                        <div className="w-full lg:w-2/3 border-t border-black/10 dark:border-white/10 lg:border-t-0 lg:border-l lg:pl-20 pt-8 lg:pt-0 relative">
                            {/* Minimal timeline knot indicator visible purely on desktop */}
                            <div className="hidden lg:block absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 group-hover:bg-accent transition-colors duration-500"></div>

                            <h4 className="text-3xl font-bold tracking-tight text-primary mb-6">
                                {exp.role}
                            </h4>

                            <p className="text-xl text-secondary mb-10 leading-relaxed font-light">
                                {exp.description}
                            </p>

                            <ul className="mb-10 space-y-4">
                                {exp.highlights.map((highlight, i) => (
                                    <li key={i} className="text-lg text-secondary flex items-start gap-4 font-light">
                                        <span className="text-accent mt-1 opacity-60 text-sm">▹</span>
                                        <span className="leading-relaxed">{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-3">
                                {exp.techUsed.map(tech => (
                                    <span key={tech} className="text-xs font-mono px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-primary rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
