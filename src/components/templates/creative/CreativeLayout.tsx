"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

const linkIcons: Record<string, React.ReactNode> = {
    github: <Github size={18} />, linkedin: <Linkedin size={18} />, twitter: <Twitter size={18} />, website: <Globe size={18} />,
};

export function CreativeLayout({ template, data }: Props) {
    const c = template.colorScheme;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: `'${template.fontBody}', sans-serif`, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%", background: `radial-gradient(ellipse, ${c.accent}15, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "60%", height: "60%", background: `radial-gradient(ellipse, ${c.accent}10, transparent 70%)`, pointerEvents: "none" }} />

            {/* Hero */}
            <section style={{ paddingTop: "8rem", paddingBottom: "6rem", position: "relative", zIndex: 1 }} className="px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                        {data.profile.photo && (
                            <img src={data.profile.photo} alt={data.profile.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-8" style={{ border: `3px solid ${c.accent}`, boxShadow: `0 0 40px ${c.accent}30` }} />
                        )}
                        <h1 style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                            {data.profile.name}
                        </h1>
                        <p style={{ color: c.accent, fontSize: "1.5rem", marginTop: "1rem", fontWeight: 600 }}>{data.profile.title}</p>
                        <p style={{ color: c.muted, marginTop: "1.5rem", lineHeight: 1.8, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>{data.profile.bio}</p>

                        <div className="flex flex-wrap justify-center items-center gap-4 mt-6" style={{ color: c.muted }}>
                            {data.profile.location && <span className="flex items-center gap-1.5 text-sm"><MapPin size={14} /> {data.profile.location}</span>}
                            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity"><Mail size={14} /> {data.profile.email}</a>}
                        </div>

                        {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                            <div className="flex justify-center gap-4 mt-6">
                                {Object.entries(data.profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                                        className="p-3 rounded-xl hover:scale-110 transition-transform"
                                        style={{ backgroundColor: c.surface, color: c.accent, boxShadow: `0 0 20px ${c.accent}10` }}>
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
                <section className="px-6 pb-20 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-center mb-12" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "2rem", fontWeight: 700 }}>Skills & Expertise</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.skills.map((cat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: c.surface, border: `1px solid ${c.accent}20` }}>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: c.accent }}>{cat.category}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{
                                                backgroundColor: item.proficiency === "expert" ? c.accent + "30" : c.background + "80",
                                                color: item.proficiency === "expert" ? c.accent : c.muted,
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
                <section className="px-6 pb-20 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-center mb-12" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "2rem", fontWeight: 700 }}>Featured Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.projects.map((project, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                                    className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                    style={{ backgroundColor: c.surface, border: `1px solid ${c.accent}15`, boxShadow: `0 4px 30px ${c.accent}08` }}>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: c.primary }}>{project.title}</h3>
                                    <p className="text-sm mb-4" style={{ color: c.muted }}>{project.description}</p>
                                    {project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.techStack.map((tech, j) => (
                                                <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: c.accent + "20", color: c.accent }}>{tech}</span>
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
                <section className="px-6 pb-20 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center mb-12" style={{ fontFamily: `'${template.fontHeading}', sans-serif`, color: c.primary, fontSize: "2rem", fontWeight: 700 }}>Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                                    className="p-6 rounded-2xl" style={{ backgroundColor: c.surface, border: `1px solid ${c.accent}15` }}>
                                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                                        <h3 className="text-lg font-bold" style={{ color: c.primary }}>{exp.role}</h3>
                                        <span className="text-sm font-mono" style={{ color: c.accent }}>@ {exp.company}</span>
                                    </div>
                                    <p className="text-xs font-mono mb-3" style={{ color: c.muted }}>{exp.duration}</p>
                                    <p className="text-sm mb-3" style={{ color: c.muted }}>{exp.description}</p>
                                    {exp.highlights.length > 0 && (
                                        <ul className="space-y-1.5">
                                            {exp.highlights.map((h, j) => (
                                                <li key={j} className="text-sm flex gap-2" style={{ color: c.muted }}>
                                                    <span style={{ color: c.accent }}>✦</span> {h}
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
            <footer className="relative z-10 px-6 py-8 text-center" style={{ borderTop: `1px solid ${c.accent}15` }}>
                <p className="text-xs" style={{ color: c.muted }}>Built with Adaptiv · {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
