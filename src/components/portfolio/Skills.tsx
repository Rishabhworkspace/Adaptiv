import { SkillCategory } from "@/types/portfolio";
import { GlassCard } from "../ui/GlassCard";

export function Skills({ categories }: { categories: SkillCategory[] }) {
    return (
        <section id="skills" className="py-20 scroll-mt-20">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Tech Stack</h2>
                <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, idx) => (
                    <GlassCard key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <h3 className="text-xl font-semibold mb-6 text-white pb-4 border-b border-white/10">
                            {category.category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {category.items.map((skill, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-sm hover:border-[#6c5ce7]/50 hover:bg-[#6c5ce7]/10 transition-colors"
                                >
                                    <span className={skill.proficiency === "expert" ? "text-white font-medium" : "text-[#b4b4c0]"}>
                                        {skill.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
