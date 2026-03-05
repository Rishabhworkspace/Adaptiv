"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Briefcase } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function CorporateLayout({ template, data }: Props) {
    const c = template.colorScheme;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }}>
            {/* Top Bar */}
            <header className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${c.muted}20` }}>
                <span className="font-bold text-sm" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>{data.profile.name}</span>
                <div className="flex items-center gap-3">
                    {data.profile.links && Object.entries(data.profile.links).map(([key, url]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: c.muted }}>
                            {linkIcons[key] || <ExternalLink size={16} />}
                        </a>
                    ))}
                </div>
            </header>

            {/* Hero */}
            <section className="px-6 py-20" style={{ backgroundColor: c.surface }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    {data.profile.photo && (
                        <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            src={data.profile.photo} alt={data.profile.name}
                            className="w-32 h-32 rounded-2xl object-cover shadow-lg flex-shrink-0" style={{ border: `2px solid ${c.accent}` }} />
                    )}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h1 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                            {data.profile.name}
                        </h1>
                        <p style={{ color: c.accent, fontSize: "1.1rem", marginTop: "0.5rem", fontWeight: 500 }}>{data.profile.title}</p>
                        <p style={{ color: c.muted, marginTop: "1rem", lineHeight: 1.7, maxWidth: "550px", fontSize: "0.95rem" }}>{data.profile.bio}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-4" style={{ color: c.muted, fontSize: "0.85rem" }}>
                            {data.profile.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {data.profile.location}</span>}
                            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: c.accent }}><Mail size={14} /> {data.profile.email}</a>}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="py-16" style={{ borderBottom: `1px solid ${c.muted}15` }}>
                        <h2 className="flex items-center gap-2 mb-8" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700 }}>
                            <Briefcase size={20} style={{ color: c.accent }} /> Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="flex gap-6">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.accent }} />
                                        {i < data.experience.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: c.accent + "30" }} />}
                                    </div>
                                    <div className="pb-6">
                                        <h3 className="font-bold" style={{ color: c.primary }}>{exp.role}</h3>
                                        <p className="text-sm" style={{ color: c.accent }}>{exp.company}</p>
                                        <p className="text-xs mt-1 mb-2" style={{ color: c.muted }}>{exp.duration}</p>
                                        <p className="text-sm" style={{ color: c.muted }}>{exp.description}</p>
                                        {exp.highlights.length > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {exp.highlights.map((h, j) => (
                                                    <li key={j} className="text-sm" style={{ color: c.muted }}>• {h}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="py-16" style={{ borderBottom: `1px solid ${c.muted}15` }}>
                        <h2 className="mb-8" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700 }}>Technical Skills</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.accent }}>{cat.category}</h3>
                                    <div className="space-y-2">
                                        {cat.items.map((item, j) => (
                                            <div key={j} className="flex items-center justify-between text-sm">
                                                <span style={{ color: c.text }}>{item.name}</span>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map((level) => (
                                                        <div key={level} className="w-2 h-2 rounded-full" style={{
                                                            backgroundColor: (item.proficiency === "expert" && level <= 3) || (item.proficiency === "advanced" && level <= 2) || (item.proficiency === "intermediate" && level <= 1) ? c.accent : c.muted + "30",
                                                        }} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="py-16">
                        <h2 className="mb-8" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700 }}>Key Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                                    <h3 className="font-bold mb-2" style={{ color: c.primary }}>{project.title}</h3>
                                    <p className="text-sm mb-3" style={{ color: c.muted }}>{project.description}</p>
                                    {project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.techStack.map((tech, j) => (
                                                <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: c.accent + "12", color: c.accent }}>{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: c.accent }}><ExternalLink size={12} /> Live</a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: c.accent }}><Github size={12} /> Code</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Footer */}
            <footer className="px-6 py-8 text-center" style={{ borderTop: `1px solid ${c.muted}15` }}>
                <p className="text-xs" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
