"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function GlassDarkLayout({ template, data }: Props) {
    const c = template.colorScheme;
    const h = { fontFamily: `'${template.fontHeading}', sans-serif` };

    const glassCard = {
        backgroundColor: `${c.surface}80`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${c.accent}15`,
        borderRadius: "1rem",
    } as React.CSSProperties;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }} className="relative overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px]"
                    style={{ background: `radial-gradient(circle, ${c.accent}15, transparent 60%)` }} />
                <div className="absolute w-[400px] h-[400px] rounded-full bottom-[20%] left-[-100px]"
                    style={{ background: `radial-gradient(circle, ${c.secondary}15, transparent 60%)` }} />
                <div className="absolute w-[300px] h-[300px] rounded-full top-[40%] right-[20%]"
                    style={{ background: `radial-gradient(circle, ${c.accent}08, transparent 60%)` }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    {data.profile.photo && (
                        <img src={data.profile.photo} alt={data.profile.name} className="w-28 h-28 rounded-2xl object-cover mx-auto mb-6"
                            style={{ border: `2px solid ${c.accent}30`, boxShadow: `0 0 40px ${c.accent}15` }} />
                    )}
                    <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight" style={{ ...h, color: c.primary }}>{data.profile.name}</h1>
                    <p className="text-lg" style={{ color: c.accent }}>{data.profile.title}</p>
                    <p className="text-sm mt-4 max-w-lg mx-auto leading-relaxed" style={{ color: c.muted }}>{data.profile.bio}</p>

                    <div className="flex justify-center items-center gap-4 mt-6" style={{ color: c.muted }}>
                        {data.profile.location && <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {data.profile.location}</span>}
                        {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1 text-xs hover:opacity-70"><Mail size={12} /> Email</a>}
                    </div>

                    {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                        <div className="flex justify-center gap-3 mt-5">
                            {Object.entries(data.profile.links).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl hover:opacity-80 transition-opacity"
                                    style={{ ...glassCard, color: c.accent }}>
                                    {linkIcons[key] || <ExternalLink size={16} />}
                                </a>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Skills */}
                {data.skills.length > 0 && (
                    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-8" style={{ color: c.accent }}>Skills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }} className="p-5" style={glassCard}>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.accent }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-xs px-3 py-1 rounded-full" style={{
                                                backgroundColor: item.proficiency === "expert" ? c.accent + "20" : `${c.muted}10`,
                                                color: item.proficiency === "expert" ? c.accent : c.text,
                                                border: `1px solid ${item.proficiency === "expert" ? c.accent + "30" : c.muted + "15"}`,
                                            }}>{item.name}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-8" style={{ color: c.accent }}>Projects</h2>
                        <div className="space-y-4">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }} className="p-6" style={glassCard}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-lg" style={{ ...h, color: c.primary }}>{project.title}</h3>
                                        <div className="flex gap-2 flex-shrink-0">
                                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70" style={{ color: c.accent }}><ExternalLink size={14} /></a>}
                                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70" style={{ color: c.accent }}><Github size={14} /></a>}
                                        </div>
                                    </div>
                                    <p className="text-sm mb-4" style={{ color: c.muted }}>{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, j) => (
                                            <span key={j} className="text-[10px] font-mono px-2.5 py-1 rounded-full" style={{
                                                backgroundColor: c.accent + "12",
                                                color: c.accent,
                                                border: `1px solid ${c.accent}20`,
                                            }}>{tech}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-8" style={{ color: c.accent }}>Experience</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                    className="p-5" style={glassCard}>
                                    <div className="flex items-baseline justify-between mb-1">
                                        <h3 className="font-bold" style={{ color: c.primary }}>{exp.role}</h3>
                                        <span className="text-[10px] font-mono" style={{ color: c.muted }}>{exp.duration}</span>
                                    </div>
                                    <p className="text-sm mb-2" style={{ color: c.accent }}>{exp.company}</p>
                                    <p className="text-sm" style={{ color: c.muted }}>{exp.description}</p>
                                    {exp.highlights.length > 0 && (
                                        <ul className="mt-3 space-y-1">
                                            {exp.highlights.map((hl, j) => (
                                                <li key={j} className="text-xs flex gap-1.5" style={{ color: c.muted }}>
                                                    <span style={{ color: c.accent }}>◆</span> {hl}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                <footer className="text-center py-8">
                    <p className="text-[10px]" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    );
}
