import { Experience as ExperienceType } from "@/types/portfolio";
import { GlassCard } from "../ui/GlassCard";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
    return (
        <section id="experience" className="py-20 scroll-mt-20">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Journey Log</h2>
                <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <div className="space-y-8">
                {experiences.map((exp, idx) => (
                    <GlassCard key={exp.id} className="relative group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[#f0f0f5] group-hover:text-[#6c5ce7] transition-colors">{exp.role}</h3>
                                <p className="text-xl text-[#8a8a9a] mt-1">{exp.company}</p>
                            </div>
                            <span className="text-[#00cec9] font-mono whitespace-nowrap md:text-right mt-2 md:mt-0">
                                {exp.duration}
                            </span>
                        </div>

                        <p className="text-[#8a8a9a] mb-6 leading-relaxed">
                            {exp.description}
                        </p>

                        <ul className="mb-6 space-y-2">
                            {exp.highlights.map((highlight, i) => (
                                <li key={i} className="text-[#b4b4c0] flex items-start gap-3">
                                    <span className="text-[#6c5ce7] mt-1">▹</span> {highlight}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {exp.techUsed.map(tech => (
                                <span key={tech} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 text-[#8a8a9a] rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
