"use client";

import { Project } from "@/types/portfolio";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function Projects({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState(0);

    // Track scroll position to determine which project is in view
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const projectElements = Array.from(containerRef.current.children) as HTMLElement[];
            if (projectElements.length === 0) return;

            // Find the project that is closest to the middle of the screen
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
        // Initial call
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle initial state if projects is empty
    if (!projects || projects.length === 0) return null;

    return (
        <section id="projects" className="py-32 scroll-mt-20">
            <div className="flex items-center gap-4 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Works</h2>
                <div className="h-px bg-black/10 dark:bg-white/10 flex-grow mt-2"></div>
            </div>

            {/* Desktop Layout (Sticky Scroll) vs Mobile Layout (Stacked) */}
            <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                {/* Left Side: Sticky Image Container (Hidden on mobile) */}
                <div className="hidden lg:block lg:w-1/2 sticky top-40 h-[60vh] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl bg-black/5 dark:bg-white/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={projects[activeProject].image}
                                alt={projects[activeProject].title}
                                fill
                                className="object-cover object-top opacity-90"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Scrolling Project Details */}
                <div className="w-full lg:w-1/2" ref={containerRef}>
                    {projects.map((project, idx) => {
                        const isActive = idx === activeProject;
                        return (
                            <div key={project.id} className="min-h-[80vh] flex flex-col justify-center py-20 lg:py-40">

                                {/* Mobile Image (Visible only on small screens) */}
                                <div className="lg:hidden w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-10 border border-black/5 dark:border-white/5 shadow-lg">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent pointer-events-none"></div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20%", once: false }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'lg:opacity-40'}`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-accent font-mono text-sm tracking-widest uppercase">
                                            {String(idx + 1).padStart(2, '0')} // {project.category[0] || "Project"}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                                        {project.title}
                                    </h3>

                                    <div className="bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm backdrop-blur-sm mb-8">
                                        <p className="text-secondary text-lg leading-relaxed font-light">
                                            {project.longDescription || project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="text-xs font-mono px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-primary rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-8 items-center">
                                        {project.githubUrl && (
                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group text-secondary hover:text-primary transition-colors font-medium relative">
                                                <span className="absolute -left-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-light">→</span>
                                                <Github size={20} />
                                                <span>Repository</span>
                                            </Link>
                                        )}
                                        {project.liveUrl && (
                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group text-secondary hover:text-primary transition-colors font-medium relative">
                                                <span className="absolute -left-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-light">→</span>
                                                <ExternalLink size={20} />
                                                <span>Live Site</span>
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
