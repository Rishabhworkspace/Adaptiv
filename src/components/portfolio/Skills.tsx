"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SkillCategory } from '@/types/portfolio';

interface SkillsProps {
    skillCategories: SkillCategory[];
}

export function Skills({ skillCategories }: SkillsProps) {
    return (
        <section id="skills" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">

            <div className="mb-20 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl"
                >
                    <h2 className="text-sm font-mono tracking-widest text-accent-secondary mb-4 uppercase flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-accent-secondary"></span>
                        <span className="animate-pulse mr-1">●</span> SYSTEM_OPTIMIZED
                        <span className="w-8 h-px bg-accent-secondary"></span>
                    </h2>
                    <h3 className="font-syne text-5xl md:text-7xl font-extrabold tracking-tighter text-text-primary uppercase leading-[0.9]">
                        Technical <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Arsenal</span>
                    </h3>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full"
                    >
                        <GlassCard className="flex flex-col h-full hover:border-accent-secondary/50 hover:bg-bg-glass-hover transition-all duration-300 group rounded-none p-8">

                            <h4 className="font-syne text-2xl font-bold text-text-primary mb-8 border-b border-border-glass pb-4 group-hover:border-accent-secondary/50 transition-colors uppercase tracking-tight">
                                {category.category}
                            </h4>

                            <ul className="space-y-5 flex-grow">
                                {category.items.map((skill) => (
                                    <li key={skill.name} className="flex items-center justify-between group/item">
                                        <span className="text-text-secondary group-hover/item:text-text-primary group-hover/item:-translate-y-0.5 transition-all duration-300 font-medium">
                                            {skill.name}
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-1 bg-text-primary/5 text-text-muted border border-border-glass group-hover/item:border-accent-secondary/30 group-hover/item:text-accent-secondary transition-all rounded-none uppercase tracking-widest">
                                            {skill.proficiency}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Subtle glow effect on hover in the background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/2 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-none -z-10 blur-2xl"></div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
