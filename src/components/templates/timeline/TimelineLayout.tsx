"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={16} />, linkedin: <Linkedin size={16} />, twitter: <Twitter size={16} />, website: <Globe size={16} />,
};

export function TimelineLayout({ template, data }: Props) {
    const c = template.colorScheme;
    const h = { fontFamily: `'${template.fontHeading}', sans-serif` };

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh" }}>
            {/* Header */}
            <header className="px-6 py-12 text-center" style={{ borderBottom: `1px solid ${c.muted}20` }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    {data.profile.photo && (
                        <img src={data.profile.photo} alt={data.profile.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                            style={{ border: `3px solid ${c.accent}` }} />
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold" style={{ ...h, color: c.primary }}>{data.profile.name}</h1>
                    <p className="text-base mt-1" style={{ color: c.accent }}>{data.profile.title}</p>
                    <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: c.muted }}>{data.profile.bio}</p>
                    <div className="flex justify-center items-center gap-4 mt-4" style={{ color: c.muted }}>
                        {data.profile.location && <span className="flex items-center gap-1 text-xs"><MapPin size={12} /> {data.profile.location}</span>}
                        {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1 text-xs hover:opacity-70"><Mail size={12} /> Email</a>}
                        {data.profile.links && Object.entries(data.profile.links).map(([key, url]) => (
                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70" style={{ color: c.accent }}>
                                {linkIcons[key] || <ExternalLink size={14} />}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </header>

            {/* Timeline */}
            <section className="max-w-3xl mx-auto px-6 py-16">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5" style={{ backgroundColor: c.accent + "25" }} />

                    {/* Skills Node */}
                    {data.skills.length > 0 && (
                        <TimelineNode side="left" label="Skills" accentColor={c.accent} mutedColor={c.muted}>
                            <div className="space-y-4">
                                {data.skills.map((cat, i) => (
                                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                        <h4 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: c.accent }}>{cat.category}</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.items.map((item, j) => (
                                                <span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{
                                                    backgroundColor: item.proficiency === "expert" ? c.accent + "15" : c.surface,
                                                    color: item.proficiency === "expert" ? c.accent : c.text,
                                                }}>{item.name}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </TimelineNode>
                    )}

                    {/* Experience Nodes */}
                    {data.experience.map((exp, i) => (
                        <TimelineNode key={`exp-${i}`} side={i % 2 === 0 ? "right" : "left"} label={exp.duration} accentColor={c.accent} mutedColor={c.muted}>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <h3 className="font-bold" style={{ color: c.primary }}>{exp.role}</h3>
                                <p className="text-sm mb-2" style={{ color: c.accent }}>{exp.company}</p>
                                <p className="text-sm" style={{ color: c.muted }}>{exp.description}</p>
                                {exp.highlights.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {exp.highlights.map((hl, j) => (
                                            <li key={j} className="text-xs" style={{ color: c.muted }}>• {hl}</li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </TimelineNode>
                    ))}

                    {/* Project Nodes */}
                    {data.projects.map((project, i) => (
                        <TimelineNode key={`proj-${i}`} side={i % 2 === 0 ? "left" : "right"} label="Project" accentColor={c.accent} mutedColor={c.muted}>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                                <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-bold" style={{ color: c.primary }}>{project.title}</h3>
                                    <div className="flex gap-2 flex-shrink-0 ml-2">
                                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><ExternalLink size={13} /></a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.accent }}><Github size={13} /></a>}
                                    </div>
                                </div>
                                <p className="text-sm mb-2" style={{ color: c.muted }}>{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.map((tech, j) => (
                                        <span key={j} className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: c.accent + "10", color: c.accent }}>{tech}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </TimelineNode>
                    ))}
                </div>
            </section>

            <footer className="px-6 py-8 text-center" style={{ borderTop: `1px solid ${c.muted}20` }}>
                <p className="text-xs" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

/* Timeline Node Component */
function TimelineNode({ side, label, accentColor, mutedColor, children }: {
    side: "left" | "right"; label: string; accentColor: string; mutedColor: string; children: React.ReactNode;
}) {
    return (
        <div className={`relative mb-12 md:flex ${side === "right" ? "md:flex-row-reverse" : ""}`}>
            {/* Dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: accentColor, boxShadow: `0 0 0 4px ${accentColor}20` }} />

            {/* Content */}
            <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${side === "right" ? "md:mr-auto md:pl-0 md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <span className="text-[10px] font-mono uppercase tracking-wider block mb-2" style={{ color: mutedColor }}>{label}</span>
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${accentColor}08`, border: `1px solid ${accentColor}15` }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
