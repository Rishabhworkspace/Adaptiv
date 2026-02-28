"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ProjectsProps {
    projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-screen">

            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-glass pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-3xl"
                >
                    <h2 className="text-sm font-mono tracking-widest text-accent-primary mb-4 uppercase flex items-center gap-2">
                        <span className="w-8 h-px bg-accent-primary"></span>
                        Selected Works
                    </h2>
                    <h3 className="font-syne text-5xl md:text-7xl font-extrabold tracking-tighter text-text-primary uppercase leading-[0.9]">
                        Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Products</span>
                    </h3>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-text-secondary max-w-sm text-lg font-light leading-relaxed md:text-right"
                >
                    I build platforms that refuse to be boring. Merging AI capabilities with advanced frontend architecture.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                {projects.map((project, index) => {
                    // Create an asymmetrical layout pattern
                    const isFeatured = index === 0;
                    const colSpan = isFeatured ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4";

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`${colSpan} group relative`}
                        >
                            <GlassCard className={`flex flex-col h-full border-border-glass/40 hover:border-accent-primary/50 transition-colors duration-500 overflow-hidden ${isFeatured ? 'p-10 lg:p-14' : 'p-8'}`}>

                                {/* Background Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <h4 className={`font-syne font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300 ${isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                                        {project.title}
                                    </h4>
                                    <div className="flex space-x-4 text-text-secondary">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors transform hover:scale-110">
                                                <Github size={24} strokeWidth={1.5} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors transform hover:scale-110">
                                                <ExternalLink size={24} strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className={`text-text-secondary leading-relaxed mb-8 flex-grow relative z-10 font-light ${isFeatured ? 'text-xl max-w-2xl' : 'text-lg'}`}>
                                    {project.description}
                                </p>

                                <div className="space-y-4 mb-10 relative z-10">
                                    {project.highlights.slice(0, isFeatured ? 3 : 2).map((highlight, i) => (
                                        <div key={i} className="flex items-start text-sm text-text-secondary/80">
                                            <ArrowRight className="text-accent-secondary mr-3 mt-0.5 flex-shrink-0" size={16} />
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 mt-auto relative z-10">
                                    <div className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 bg-text-primary/5 text-text-primary rounded-none border border-border-glass group-hover:border-accent-primary/20 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 flex justify-center"
            >
                <a
                    href="https://github.com/Rishabhworkspace?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 overflow-hidden border border-border-glass bg-bg-glass text-sm text-text-primary hover:text-bg-primary hover:bg-text-primary transition-all duration-300 font-syne font-bold uppercase tracking-widest"
                >
                    <span className="relative z-10 flex items-center">
                        View Complete Archive
                        <ArrowRight className="ml-3 transition-transform group-hover:translate-x-2" size={18} />
                    </span>
                </a>
            </motion.div>
        </section>
    );
}
