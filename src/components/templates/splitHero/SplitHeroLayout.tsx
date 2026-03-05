"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function SplitHeroLayout({ template, data }: Props) {
    const c = template.colorScheme;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif` }} className="min-h-screen flex flex-col lg:flex-row">
            {/* Fixed Left Panel */}
            <aside className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[380px] p-8 lg:p-12 flex flex-col justify-between"
                style={{ backgroundColor: c.surface, borderRight: `1px solid ${c.muted}15` }}>
                <div>
                    {data.profile.photo && (
                        <motion.img src={data.profile.photo} alt={data.profile.name} className="w-28 h-28 rounded-2xl object-cover mb-6"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ border: `3px solid ${c.accent}` }} />
                    )}
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "2rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                        {data.profile.name}
                    </motion.h1>
                    <p style={{ color: c.accent, fontSize: "1rem", marginTop: "0.5rem", fontWeight: 500 }}>{data.profile.title}</p>
                    <p style={{ color: c.muted, marginTop: "1rem", lineHeight: 1.7, fontSize: "0.9rem" }}>{data.profile.bio}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-6" style={{ color: c.muted }}>
                        {data.profile.location && <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {data.profile.location}</span>}
                        {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1 text-xs hover:opacity-70"><Mail size={12} /> Email</a>}
                    </div>

                    {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                        <div className="flex gap-3 mt-5">
                            {Object.entries(data.profile.links).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                                    style={{ color: c.accent, backgroundColor: c.accent + "10" }}>
                                    {linkIcons[key] || <ExternalLink size={16} />}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-[10px] mt-8" style={{ color: c.muted }}>Built with Adaptiv</p>
            </aside>

            {/* Scrollable Right Content */}
            <main className="lg:ml-[380px] flex-1 p-8 lg:p-16">
                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="mb-16">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Skills</h2>
                        <div className="space-y-5">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: c.muted }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-xs px-3 py-1.5 rounded-lg" style={{
                                                backgroundColor: item.proficiency === "expert" ? c.accent + "18" : c.surface,
                                                color: item.proficiency === "expert" ? c.accent : c.text,
                                                border: `1px solid ${item.proficiency === "expert" ? c.accent + "30" : c.muted + "15"}`,
                                            }}>{item.name}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-16">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Projects</h2>
                        <div className="space-y-5">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}12` }}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold" style={{ color: c.primary }}>{project.title}</h3>
                                        <div className="flex gap-2 flex-shrink-0">
                                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><ExternalLink size={14} /></a>}
                                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><Github size={14} /></a>}
                                        </div>
                                    </div>
                                    <p className="text-sm mb-3" style={{ color: c.muted }}>{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech, j) => (
                                            <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: c.accent + "12", color: c.accent }}>{tech}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className="mb-16">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="pl-5" style={{ borderLeft: `2px solid ${c.accent}40` }}>
                                    <h3 className="font-bold text-sm" style={{ color: c.primary }}>{exp.role}</h3>
                                    <p className="text-xs mb-1" style={{ color: c.accent }}>{exp.company} · {exp.duration}</p>
                                    <p className="text-sm mb-2" style={{ color: c.muted }}>{exp.description}</p>
                                    {exp.highlights.length > 0 && (
                                        <ul className="space-y-1">
                                            {exp.highlights.map((h, j) => (
                                                <li key={j} className="text-xs flex gap-1.5" style={{ color: c.muted }}>
                                                    <span style={{ color: c.accent }}>▸</span> {h}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
