"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '@/types/portfolio';

interface ExperienceProps {
    experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
    return (
        <section id="experience" className="py-32 px-6 lg:px-12 max-w-[1000px] mx-auto min-h-screen">

            <div className="mb-24 flex flex-col items-start md:items-center text-left md:text-center border-b border-border-glass pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-sm font-mono tracking-widest text-accent-primary mb-4 uppercase flex items-center md:justify-center gap-2">
                        <span className="w-8 h-px bg-accent-primary"></span>
                        User.JourneyLog
                        <span className="w-8 h-px bg-accent-primary hidden md:block"></span>
                    </h2>
                    <h3 className="font-syne text-5xl md:text-7xl font-extrabold tracking-tighter text-text-primary uppercase leading-[0.9]">
                        System <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">History</span>
                    </h3>
                </motion.div>
            </div>

            <div className="relative border-l border-border-glass ml-3 md:ml-6 py-4">

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="mb-20 relative pl-8 md:pl-16 group"
                    >
                        {/* Timeline dot */}
                        <span className="absolute -left-[6px] top-2 h-[13px] w-[13px] bg-bg-primary border-2 border-accent-secondary group-hover:bg-accent-secondary group-hover:shadow-teal-glow transition-all duration-500 rounded-none"></span>

                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                            <h4 className="font-syne text-2xl md:text-3xl font-bold text-text-primary flex items-center uppercase tracking-tight">
                                <span className="mr-3 text-accent-secondary opacity-50 font-normal">@</span> {exp.milestone}
                            </h4>
                            <span className="mt-2 md:mt-0 text-[11px] font-mono tracking-widest text-text-muted bg-text-primary/5 px-3 py-1 uppercase border border-border-glass">
                                {exp.duration}
                            </span>
                        </div>

                        <h5 className="font-syne text-lg text-accent-primary mb-6 font-bold uppercase tracking-wider">{exp.role}</h5>

                        <p className="text-text-secondary leading-relaxed mb-8 font-light text-lg max-w-3xl">
                            {exp.description}
                        </p>

                        {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="space-y-3 mb-8">
                                {exp.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start text-text-secondary/90">
                                        <span className="text-accent-secondary mr-3 text-sm mt-1 font-mono">{`>`}</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {exp.techUsed && exp.techUsed.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-6 border-t border-border-glass/50 max-w-3xl">
                                {exp.techUsed.map((tech) => (
                                    <span key={tech} className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-transparent text-text-muted border border-border-glass group-hover:border-accent-primary/20 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                    </motion.div>
                ))}

            </div>

        </section>
    );
}
