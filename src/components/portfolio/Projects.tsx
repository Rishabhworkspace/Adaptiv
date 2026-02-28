import { Project } from "@/types/portfolio";
import { GlassCard } from "../ui/GlassCard";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Projects({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Selected Works</h2>
                <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <GlassCard key={project.id} className="group flex flex-col h-full overflow-hidden p-0 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        {/* Project Image Placeholder */}
                        <div className="h-48 w-full bg-[#12121a] border-b border-white/5 relative overflow-hidden flex items-center justify-center">
                            <span className="text-[#4a4a5a] font-mono text-sm opacity-50 group-hover:scale-110 transition-transform duration-500">
                                [ {project.title.toUpperCase()} _ UI_PREVIEW ]
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold group-hover:text-[#6c5ce7] transition-colors">{project.title}</h3>
                                <div className="flex gap-3 text-[#b4b4c0]">
                                    {project.githubUrl && (
                                        <Link href={project.githubUrl} target="_blank" className="hover:text-white transition-colors">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {project.liveUrl && (
                                        <Link href={project.liveUrl} target="_blank" className="hover:text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <p className="text-[#8a8a9a] mb-6 flex-grow">{project.description}</p>

                            <ul className="mb-6 space-y-2">
                                {project.highlights.map((highlight, i) => (
                                    <li key={i} className="text-sm text-[#b4b4c0] flex items-start gap-2">
                                        <span className="text-[#00cec9] mt-1">▹</span> {highlight}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-[#00cec9] border border-white/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
