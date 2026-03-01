"use client";

import { SkillCategory } from "@/types/portfolio";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Skills({ categories }: { categories: SkillCategory[] }) {
    return (
        <section id="skills" className="py-32 scroll-mt-20">
            <div className="flex items-center gap-4 mb-24">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Expertise</h2>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-grow mt-2"></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24">
                {categories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start group"
                    >
                        {/* Category Title */}
                        <div className="w-full lg:w-1/3 shrink-0">
                            <h3 className="text-2xl lg:text-3xl font-light text-secondary group-hover:text-primary transition-colors duration-500">
                                {category.category}
                            </h3>
                        </div>

                        {/* Skills List */}
                        <div className="w-full lg:w-2/3">
                            <ul className="flex flex-wrap gap-x-8 gap-y-4">
                                {category.items.map((skill, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="relative group/item flex items-center"
                                    >
                                        <span className={`text-lg lg:text-xl font-medium tracking-tight transition-colors duration-300 ${skill.isHighlight ? "text-accent" : skill.proficiency === "expert" ? "text-primary" : "text-secondary"}`}>
                                            {skill.name}
                                        </span>
                                        {skill.isHighlight ? (
                                            <span className="ml-2 flex items-center justify-center text-accent/80 animate-pulse" title="Highly relevant to the target role">
                                                <Sparkles size={14} />
                                            </span>
                                        ) : skill.proficiency === "expert" ? (
                                            <span className="ml-2 w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                        ) : null}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
