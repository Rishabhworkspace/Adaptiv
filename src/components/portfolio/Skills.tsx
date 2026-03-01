"use client";

import { SkillCategory } from "@/types/portfolio";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const proficiencyWidth: Record<string, string> = {
    expert: "w-full",
    advanced: "w-[70%]",
    intermediate: "w-[40%]",
};

const proficiencyLabel: Record<string, string> = {
    expert: "Expert",
    advanced: "Advanced",
    intermediate: "Intermediate",
};

export function Skills({ categories }: { categories: SkillCategory[] }) {
    return (
        <section id="skills" className="py-32 scroll-mt-20">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Expertise</h2>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-grow mt-2"></div>
            </div>

            <div className="flex flex-col gap-20">
                {categories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Category Header with Index */}
                        <div className="flex items-baseline gap-4 mb-10">
                            <span className="text-xs font-mono text-accent/60 tracking-widest">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
                                {category.category}
                            </h3>
                            <div className="h-px bg-black/5 dark:bg-white/5 flex-grow"></div>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                            {category.items.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.06,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className={`
                                        group/tile relative overflow-hidden rounded-xl
                                        border transition-all duration-300 cursor-default
                                        px-4 py-4 md:px-5 md:py-5
                                        hover:-translate-y-1
                                        ${skill.isHighlight
                                            ? "border-accent/40 bg-accent/5 hover:border-accent/70 hover:shadow-[0_8px_30px_-8px_var(--accent)]"
                                            : "border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:border-accent/30 hover:shadow-[0_8px_30px_-12px_var(--accent)]"
                                        }
                                    `}
                                >
                                    {/* Skill Name + Icons */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span
                                            className={`text-sm md:text-base font-semibold tracking-tight leading-tight transition-colors duration-300 ${skill.isHighlight
                                                    ? "text-accent"
                                                    : "text-primary group-hover/tile:text-accent"
                                                }`}
                                        >
                                            {skill.name}
                                        </span>
                                        {skill.isHighlight && (
                                            <span className="text-accent shrink-0 animate-pulse">
                                                <Sparkles size={14} />
                                            </span>
                                        )}
                                    </div>

                                    {/* Proficiency Label */}
                                    <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-secondary/60 mb-2">
                                        {proficiencyLabel[skill.proficiency] || skill.proficiency}
                                    </span>

                                    {/* Proficiency Bar */}
                                    <div className="w-full h-[3px] rounded-full bg-black/[0.04] dark:bg-white/[0.04] overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.8,
                                                delay: i * 0.06 + 0.3,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className={`h-full rounded-full ${proficiencyWidth[skill.proficiency]} ${skill.isHighlight
                                                    ? "bg-accent"
                                                    : "bg-accent/40 group-hover/tile:bg-accent transition-colors duration-300"
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
