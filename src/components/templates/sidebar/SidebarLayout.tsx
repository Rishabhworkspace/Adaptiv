"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function SidebarLayout({ template, data }: Props) {
    const c = template.colorScheme;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif` }} className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="md:w-[300px] md:fixed md:top-0 md:left-0 md:h-screen md:overflow-y-auto p-8 text-center"
                style={{ backgroundColor: c.surface, borderRight: `1px solid ${c.muted}15` }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                    {data.profile.photo && (
                        <img src={data.profile.photo} alt={data.profile.name} className="w-32 h-32 rounded-full object-cover mb-4"
                            style={{ border: `4px solid ${c.accent}30` }} />
                    )}
                    <h1 className="text-xl font-bold" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>{data.profile.name}</h1>
                    <p className="text-sm mt-1" style={{ color: c.accent }}>{data.profile.title}</p>

                    <div className="w-8 h-0.5 my-4" style={{ backgroundColor: c.accent + "40" }} />

                    {data.profile.location && <p className="flex items-center justify-center gap-1 text-xs mb-2" style={{ color: c.muted }}><MapPin size={12} /> {data.profile.location}</p>}
                    {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center justify-center gap-1 text-xs hover:opacity-70" style={{ color: c.muted }}><Mail size={12} /> {data.profile.email}</a>}

                    {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Object.entries(data.profile.links).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:opacity-70"
                                    style={{ color: c.accent, backgroundColor: c.accent + "10" }}>
                                    {linkIcons[key] || <ExternalLink size={14} />}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Mini skills in sidebar */}
                    {data.skills.length > 0 && (
                        <div className="mt-6 w-full text-left">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: c.muted }}>Top Skills</h3>
                            <div className="space-y-1.5">
                                {data.skills.flatMap(cat => cat.items).filter(i => i.proficiency === "expert").slice(0, 8).map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span style={{ color: c.text }}>{item.name}</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3].map(d => (
                                                <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: d <= 3 ? c.accent : c.muted + "30" }} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-[9px] mt-8" style={{ color: c.muted }}>Built with Adaptiv</p>
                </motion.div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-[300px] flex-1 p-8 md:p-12">
                {/* Bio */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h2 className="text-lg font-bold mb-4" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>About Me</h2>
                    <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{data.profile.bio}</p>
                </motion.section>

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-bold mb-6" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                    className="p-5 rounded-xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}12` }}>
                                    <h3 className="font-bold text-sm mb-1" style={{ color: c.primary }}>{project.title}</h3>
                                    <p className="text-xs mb-3" style={{ color: c.muted }}>{project.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.techStack.map((tech, j) => (
                                            <span key={j} className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: c.accent + "10", color: c.accent }}>{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:opacity-70" style={{ color: c.accent }}><ExternalLink size={12} /> Live</a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:opacity-70" style={{ color: c.accent }}><Github size={12} /> Code</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Detail */}
                {data.skills.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-lg font-bold mb-6" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>Skills</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: c.accent }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{
                                                backgroundColor: item.proficiency === "expert" ? c.accent + "15" : c.surface,
                                                color: item.proficiency === "expert" ? c.accent : c.text,
                                                border: `1px solid ${c.muted}15`,
                                            }}>{item.name}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-6" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary }}>Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <h3 className="font-bold text-sm" style={{ color: c.primary }}>{exp.role}</h3>
                                        <span className="text-xs" style={{ color: c.accent }}>{exp.company}</span>
                                    </div>
                                    <p className="text-xs mb-1" style={{ color: c.muted }}>{exp.duration}</p>
                                    <p className="text-sm" style={{ color: c.muted }}>{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
