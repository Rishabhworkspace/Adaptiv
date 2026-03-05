"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function MagazineLayout({ template, data }: Props) {
    const c = template.colorScheme;
    const h = { fontFamily: `'${template.fontHeading}', serif` };

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }}>
            {/* Full-width Hero */}
            <section className="px-6 md:px-16 pt-24 pb-20" style={{ borderBottom: `1px solid ${c.muted}20` }}>
                <div className="max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: c.accent }}>{data.profile.title}</p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6" style={{ ...h, color: c.primary }}>
                            {data.profile.name}
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-end gap-8 mt-8">
                            <p className="text-lg leading-relaxed max-w-xl" style={{ color: c.muted }}>{data.profile.bio}</p>
                            <div className="flex-shrink-0 flex items-center gap-4" style={{ color: c.muted }}>
                                {data.profile.location && <span className="flex items-center gap-1 text-sm"><MapPin size={14} /> {data.profile.location}</span>}
                                {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1 text-sm hover:opacity-70"><Mail size={14} /> Mail</a>}
                                {data.profile.links && Object.entries(data.profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70" style={{ color: c.accent }}>
                                        {linkIcons[key] || <ExternalLink size={16} />}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects — editorial style */}
            {data.projects.length > 0 && (
                <section className="px-6 md:px-16 py-20" style={{ borderBottom: `1px solid ${c.muted}20` }}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-12" style={{ color: c.accent }}>Selected Work</h2>
                        <div className="space-y-16">
                            {data.projects.map((project, i) => (
                                <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                    <div className="md:col-span-1">
                                        <span className="text-4xl font-bold" style={{ ...h, color: c.muted + "30" }}>{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ ...h, color: c.primary }}>{project.title}</h3>
                                        <p className="text-base mb-4 leading-relaxed" style={{ color: c.muted }}>{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.map((tech, j) => (
                                                <span key={j} className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded" style={{ backgroundColor: c.surface, color: c.accent }}>{tech}</span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:opacity-70 underline underline-offset-4" style={{ color: c.accent }}><ExternalLink size={13} /> View</a>}
                                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:opacity-70 underline underline-offset-4" style={{ color: c.accent }}><Github size={13} /> Source</a>}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills — two-column */}
            {data.skills.length > 0 && (
                <section className="px-6 md:px-16 py-20" style={{ borderBottom: `1px solid ${c.muted}20` }}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-12" style={{ color: c.accent }}>Expertise</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h3 className="font-bold text-sm mb-3" style={{ color: c.primary }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-sm" style={{ color: item.proficiency === "expert" ? c.accent : c.muted }}>
                                                {item.name}{j < cat.items.length - 1 ? " ·" : ""}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience — editorial */}
            {data.experience.length > 0 && (
                <section className="px-6 md:px-16 py-20">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-12" style={{ color: c.accent }}>Experience</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                        <p className="text-sm font-bold" style={{ color: c.muted }}>{exp.duration}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <h3 className="font-bold text-lg" style={{ ...h, color: c.primary }}>{exp.role}</h3>
                                        <p className="text-sm mb-2" style={{ color: c.accent }}>{exp.company}</p>
                                        <p className="text-sm" style={{ color: c.muted }}>{exp.description}</p>
                                        {exp.highlights.length > 0 && (
                                            <ul className="mt-3 space-y-1">
                                                {exp.highlights.map((hl, j) => (
                                                    <li key={j} className="text-sm" style={{ color: c.muted }}>— {hl}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <footer className="px-6 md:px-16 py-8 text-center" style={{ borderTop: `1px solid ${c.muted}20` }}>
                <p className="text-xs" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
