"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={18} />, linkedin: <Linkedin size={18} />, twitter: <Twitter size={18} />, website: <Globe size={18} />,
};

export function MinimalLayout({ template, data }: Props) {
    const c = template.colorScheme;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }}>
            {/* Hero */}
            <section style={{ paddingTop: "8rem", paddingBottom: "6rem" }} className="px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {data.profile.photo && (
                            <img src={data.profile.photo} alt={data.profile.name} className="w-24 h-24 rounded-full object-cover mb-6" style={{ border: `3px solid ${c.accent}` }} />
                        )}
                        <h1 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                            {data.profile.name}
                        </h1>
                        <p style={{ color: c.accent, fontSize: "1.25rem", marginTop: "0.75rem", fontWeight: 500 }}>{data.profile.title}</p>
                        <p style={{ color: c.muted, marginTop: "1.5rem", lineHeight: 1.8, maxWidth: "600px" }}>{data.profile.bio}</p>

                        <div className="flex flex-wrap items-center gap-4 mt-6" style={{ color: c.muted }}>
                            {data.profile.location && <span className="flex items-center gap-1.5 text-sm"><MapPin size={14} /> {data.profile.location}</span>}
                            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity"><Mail size={14} /> {data.profile.email}</a>}
                        </div>

                        {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                            <div className="flex gap-3 mt-4">
                                {Object.entries(data.profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                                        {linkIcons[key] || <ExternalLink size={18} />}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Skills</h2>
                        <div className="space-y-6">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.muted }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-sm px-3 py-1.5 rounded-full" style={{
                                                backgroundColor: item.proficiency === "expert" ? c.accent + "20" : c.surface,
                                                color: item.proficiency === "expert" ? c.accent : c.text,
                                                border: `1px solid ${item.proficiency === "expert" ? c.accent + "40" : c.surface}`,
                                            }}>
                                                {item.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Projects</h2>
                        <div className="space-y-6">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}20` }}>
                                    <h3 className="text-lg font-bold mb-2" style={{ color: c.primary }}>{project.title}</h3>
                                    <p className="text-sm mb-4" style={{ color: c.muted }}>{project.description}</p>
                                    {project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.techStack.map((tech, j) => (
                                                <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: c.accent + "15", color: c.accent }}>{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: c.accent }}><ExternalLink size={14} /> Live</a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: c.accent }}><Github size={14} /> Code</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="px-6 pb-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="relative pl-6" style={{ borderLeft: `2px solid ${c.accent}30` }}>
                                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.accent }} />
                                    <h3 className="font-bold" style={{ color: c.primary }}>{exp.role}</h3>
                                    <p className="text-sm mb-1" style={{ color: c.accent }}>{exp.company} · {exp.duration}</p>
                                    <p className="text-sm mb-2" style={{ color: c.muted }}>{exp.description}</p>
                                    {exp.highlights.length > 0 && (
                                        <ul className="space-y-1">
                                            {exp.highlights.map((h, j) => (
                                                <li key={j} className="text-sm flex gap-2" style={{ color: c.muted }}>
                                                    <span style={{ color: c.accent }}>→</span> {h}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="px-6 py-8 text-center" style={{ borderTop: `1px solid ${c.muted}20` }}>
                <p className="text-xs" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
