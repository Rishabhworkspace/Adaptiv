"use client";

import { Project } from "@/types/portfolio";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function Projects({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const projectElements = Array.from(containerRef.current.children) as HTMLElement[];
            if (projectElements.length === 0) return;

            const viewportCenter = window.innerHeight / 2;
            let closestProject = 0;
            let minDistance = Infinity;

            projectElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const distance = Math.abs(viewportCenter - elCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestProject = index;
                }
            });

            setActiveProject(prev => {
                if (prev !== closestProject) return closestProject;
                return prev;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!projects || projects.length === 0) return null;

    return (
        <section id="projects" className="py-32 scroll-mt-20">
            <div className="flex items-center gap-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Works</h2>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-grow mt-2"></div>
            </div>

            <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                {/* Left: Sticky Image Showcase */}
                <div className="hidden lg:block lg:w-1/2 sticky top-32 self-start">
                    <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden bg-gradient-to-br from-black/[0.03] to-transparent dark:from-white/[0.04] dark:to-transparent border border-black/5 dark:border-white/[0.05] shadow-sm">

                        {/* Soft background glow */}
                        <div className="absolute inset-0 bg-accent/5 dark:bg-accent/10 blur-3xl opacity-50 rounded-full scale-150 transform-gpu"></div>

                        {/* Browser mockup frame */}
                        <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow-xl dark:shadow-2xl bg-[#1a1a1a] transform-gpu transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
                            {/* Mini browser bar */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-black/[0.05] dark:bg-white/[0.05] border-b border-black/[0.08] dark:border-white/[0.08] backdrop-blur-md">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                                </div>
                                <div className="flex-1 mx-4 flex justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeProject}
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 4 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-3 py-1 rounded-full bg-black/20 text-[10px] font-mono text-white/60 truncate max-w-[200px]"
                                        >
                                            {projects[activeProject].liveUrl?.replace("https://", "") || projects[activeProject].title}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <div className="w-14"></div>
                            </div>

                            {/* Image */}
                            <div className="relative aspect-[16/10] bg-black/20">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject}
                                        initial={{ opacity: 0, filter: "blur(4px)", scale: 1.05 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                        exit={{ opacity: 0, filter: "blur(2px)", scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={projects[activeProject].image}
                                            alt={projects[activeProject].title}
                                            fill
                                            className="object-cover object-top"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex gap-2 mt-8 justify-center">
                        {projects.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === activeProject
                                        ? "w-8 bg-accent shadow-[0_0_10px_var(--accent)]"
                                        : "w-2 bg-black/10 dark:bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Scrolling Project Details */}
                <div className="w-full lg:w-1/2" ref={containerRef}>
                    {projects.map((project, idx) => {
                        const isActive = idx === activeProject;
                        return (
                            <div key={project.id} className="min-h-[70vh] flex flex-col justify-center py-16 lg:py-32">

                                {/* Mobile Image with browser frame & padding */}
                                <div className="lg:hidden w-full relative p-4 rounded-2xl bg-gradient-to-br from-black/[0.03] to-transparent dark:from-white/[0.04] dark:to-transparent border border-black/5 dark:border-white/[0.05] mb-8">
                                    <div className="absolute inset-0 bg-accent/5 blur-2xl opacity-50 rounded-full"></div>
                                    <div className="relative rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow-lg bg-[#1a1a1a]">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-black/[0.05] dark:bg-white/[0.05] border-b border-black/[0.08] dark:border-white/[0.08]">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
                                            </div>
                                            <div className="flex-1 flex justify-center px-2">
                                                <span className="px-2 py-0.5 rounded-full bg-black/20 text-[9px] font-mono text-white/50 truncate max-w-[150px]">
                                                    {project.liveUrl?.replace("https://", "") || project.title}
                                                </span>
                                            </div>
                                            <div className="w-10"></div>
                                        </div>
                                        <div className="relative aspect-[16/10]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20%", once: false }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "lg:opacity-30"}`}
                                >
                                    {/* Index + Category */}
                                    <span className="text-xs font-mono text-accent/70 tracking-[0.2em] uppercase mb-4 block">
                                        {String(idx + 1).padStart(2, "0")} / {project.category[0] || "project"}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-secondary text-base md:text-lg leading-relaxed font-light mb-8 max-w-lg">
                                        {project.longDescription || project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="text-xs font-mono px-3 py-1.5 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-secondary rounded-full hover:text-accent hover:border-accent/30 transition-colors duration-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-6 items-center">
                                        {project.githubUrl && (
                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-secondary hover:text-accent transition-colors text-sm font-medium">
                                                <Github size={16} />
                                                <span>Repository</span>
                                                <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-accent">→</span>
                                            </Link>
                                        )}
                                        {project.liveUrl && (
                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-secondary hover:text-accent transition-colors text-sm font-medium">
                                                <ExternalLink size={16} />
                                                <span>Live Site</span>
                                                <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-accent">→</span>
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
