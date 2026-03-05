"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { TemplateConfig } from "@/data/templates";
import type { PortfolioData } from "../PortfolioRenderer";

interface Props { template: TemplateConfig; data: PortfolioData; }

function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.substring(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 15);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);
    return <span>{displayed}<span className="animate-pulse">▊</span></span>;
}

export function TerminalLayout({ template, data }: Props) {
    const c = template.colorScheme;
    const font = `'${template.fontHeading}', 'Fira Code', monospace`;

    return (
        <div style={{ backgroundColor: c.background, color: c.text, fontFamily: font, minHeight: "100vh", fontSize: "14px", lineHeight: 1.7 }}>
            {/* Window chrome */}
            <div className="sticky top-0 z-50 px-4 py-2 flex items-center gap-2" style={{ backgroundColor: c.surface, borderBottom: `1px solid ${c.muted}30` }}>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs ml-3" style={{ color: c.muted }}>{data.profile.name.toLowerCase().replace(/\s/g, "-")}@portfolio ~ $</span>
            </div>

            <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
                {/* whoami */}
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <p style={{ color: c.muted }}>$ <span style={{ color: c.accent }}>whoami</span></p>
                    <div className="mt-2 pl-4">
                        <p className="text-2xl font-bold" style={{ color: c.primary }}><TerminalText text={data.profile.name} /></p>
                        <p style={{ color: c.accent }}><TerminalText text={data.profile.title} delay={500} /></p>
                        <p className="mt-3" style={{ color: c.muted }}>{data.profile.bio}</p>
                        <div className="flex flex-wrap gap-4 mt-3" style={{ color: c.muted }}>
                            {data.profile.location && <span>📍 {data.profile.location}</span>}
                            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="hover:underline" style={{ color: c.accent }}>✉ {data.profile.email}</a>}
                        </div>
                        {data.profile.links && Object.keys(data.profile.links).length > 0 && (
                            <div className="flex gap-3 mt-3">
                                {Object.entries(data.profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: c.accent }}>
                                        [{key}]
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.section>

                <div style={{ borderTop: `1px dashed ${c.muted}40` }} />

                {/* skills */}
                {data.skills.length > 0 && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <p style={{ color: c.muted }}>$ <span style={{ color: c.accent }}>cat skills.json</span></p>
                        <div className="mt-2 pl-4">
                            <pre style={{ color: c.text }}>{"{"}</pre>
                            {data.skills.map((cat, i) => (
                                <div key={i} className="pl-4">
                                    <pre><span style={{ color: c.accent }}>&quot;{cat.category}&quot;</span>: [</pre>
                                    {cat.items.map((item, j) => (
                                        <pre key={j} className="pl-4">
                                            <span style={{ color: c.secondary }}>&quot;{item.name}&quot;</span>
                                            <span style={{ color: c.muted }}> // {item.proficiency}</span>
                                            {j < cat.items.length - 1 ? "," : ""}
                                        </pre>
                                    ))}
                                    <pre>]{i < data.skills.length - 1 ? "," : ""}</pre>
                                </div>
                            ))}
                            <pre>{"}"}</pre>
                        </div>
                    </motion.section>
                )}

                <div style={{ borderTop: `1px dashed ${c.muted}40` }} />

                {/* projects */}
                {data.projects.length > 0 && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <p style={{ color: c.muted }}>$ <span style={{ color: c.accent }}>ls ./projects/</span></p>
                        <div className="mt-2 pl-4 space-y-4">
                            {data.projects.map((project, i) => (
                                <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: c.surface, border: `1px solid ${c.muted}20` }}>
                                    <p className="font-bold" style={{ color: c.primary }}>
                                        <span style={{ color: c.accent }}>→</span> {project.title}
                                    </p>
                                    <p className="mt-1" style={{ color: c.muted }}>{project.description}</p>
                                    {project.techStack.length > 0 && (
                                        <p className="mt-2 text-xs" style={{ color: c.secondary }}>
                                            stack: [{project.techStack.join(", ")}]
                                        </p>
                                    )}
                                    <div className="flex gap-3 mt-2">
                                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:underline" style={{ color: c.accent }}><ExternalLink size={12} /> demo</a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 hover:underline" style={{ color: c.accent }}><Github size={12} /> src</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                <div style={{ borderTop: `1px dashed ${c.muted}40` }} />

                {/* experience */}
                {data.experience.length > 0 && (
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                        <p style={{ color: c.muted }}>$ <span style={{ color: c.accent }}>git log --oneline --experience</span></p>
                        <div className="mt-2 pl-4 space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <p>
                                        <span style={{ color: c.accent }}>{exp.duration}</span>{" "}
                                        <span className="font-bold" style={{ color: c.primary }}>{exp.role}</span>{" "}
                                        <span style={{ color: c.muted }}>@ {exp.company}</span>
                                    </p>
                                    <p className="pl-4 mt-1" style={{ color: c.muted }}>{exp.description}</p>
                                    {exp.highlights.length > 0 && (
                                        <div className="pl-4 mt-1">
                                            {exp.highlights.map((h, j) => (
                                                <p key={j} style={{ color: c.secondary }}>  - {h}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                <div style={{ borderTop: `1px dashed ${c.muted}40` }} />

                {/* footer */}
                <p className="text-center text-xs pt-4" style={{ color: c.muted }}>
                    <span style={{ color: c.accent }}>$</span> echo &quot;Built with Adaptiv · {new Date().getFullYear()}&quot;
                </p>
            </div>
        </div>
    );
}
