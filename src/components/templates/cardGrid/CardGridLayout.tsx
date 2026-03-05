"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink, Github, Linkedin, Twitter, Globe, MapPin } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function CardGridLayout({ template, data }: Props) {
    const c = template.colorScheme;
    const headingStyle = { fontFamily: `'${template.fontHeading}', sans-serif` };

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }} className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                    {/* Hero Card — spans 2 cols */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 lg:col-span-2 p-8 rounded-2xl flex flex-col justify-end min-h-[280px]"
                        style={{ backgroundColor: c.accent, color: c.background }}>
                        {data.profile.photo && (
                            <img src={data.profile.photo} alt={data.profile.name} className="w-20 h-20 rounded-xl object-cover mb-4" style={{ border: `2px solid ${c.background}40` }} />
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={headingStyle}>{data.profile.name}</h1>
                        <p className="text-lg mt-1 opacity-80">{data.profile.title}</p>
                    </motion.div>

                    {/* Bio Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                        className="md:col-span-1 lg:col-span-2 p-6 rounded-2xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: c.muted }}>About</h3>
                        <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{data.profile.bio}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-4" style={{ color: c.muted }}>
                            {data.profile.location && <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {data.profile.location}</span>}
                            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1 text-xs hover:opacity-70"><Mail size={12} /> {data.profile.email}</a>}
                        </div>
                    </motion.div>

                    {/* Links Card */}
                    {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: c.muted }}>Connect</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(data.profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                                        className="p-3 rounded-xl hover:opacity-70 transition-opacity" style={{ backgroundColor: c.accent + "12", color: c.accent }}>
                                        {linkIcons[key] || <ExternalLink size={16} />}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Skills Cards */}
                    {data.skills.map((cat, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                            className="p-6 rounded-2xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: c.accent }}>{cat.category}</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {cat.items.map((item, j) => (
                                    <span key={j} className="text-xs px-2.5 py-1 rounded-lg" style={{
                                        backgroundColor: item.proficiency === "expert" ? c.accent + "15" : c.background,
                                        color: item.proficiency === "expert" ? c.accent : c.text,
                                    }}>{item.name}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Project Cards — each spans different sizes */}
                    {data.projects.map((project, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                            className={`p-6 rounded-2xl ${i === 0 ? "md:col-span-2" : ""}`}
                            style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold" style={{ ...headingStyle, color: c.primary }}>{project.title}</h3>
                                <div className="flex gap-2 flex-shrink-0">
                                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><ExternalLink size={14} /></a>}
                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><Github size={14} /></a>}
                                </div>
                            </div>
                            <p className="text-sm mb-3" style={{ color: c.muted }}>{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {project.techStack.map((tech, j) => (
                                    <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: c.accent + "10", color: c.accent }}>{tech}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Experience Cards */}
                    {data.experience.map((exp, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08 }}
                            className="p-6 rounded-2xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}15` }}>
                            <h3 className="font-bold text-sm" style={{ color: c.primary }}>{exp.role}</h3>
                            <p className="text-xs mb-2" style={{ color: c.accent }}>{exp.company} · {exp.duration}</p>
                            <p className="text-xs" style={{ color: c.muted }}>{exp.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <footer className="mt-8 text-center py-6">
                    <p className="text-[10px]" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    );
}
