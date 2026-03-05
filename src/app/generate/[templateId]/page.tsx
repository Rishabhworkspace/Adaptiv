"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Sparkles, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { getTemplateById } from "@/data/templates";

interface FormData {
    profile: {
        name: string;
        title: string;
        bio: string;
        email: string;
        phone: string;
        location: string;
        photo: string;
        github: string;
        linkedin: string;
        twitter: string;
        website: string;
    };
    skills: Array<{ category: string; items: Array<{ name: string; proficiency: "expert" | "advanced" | "intermediate" }> }>;
    projects: Array<{ title: string; description: string; techStack: string; liveUrl: string; githubUrl: string }>;
    experience: Array<{ company: string; role: string; duration: string; description: string; highlights: string }>;
}

const emptySkillCategory = () => ({ category: "", items: [{ name: "", proficiency: "intermediate" as const }] });
const emptyProject = () => ({ title: "", description: "", techStack: "", liveUrl: "", githubUrl: "" });
const emptyExperience = () => ({ company: "", role: "", duration: "", description: "", highlights: "" });

export default function GenerateTemplatePage() {
    const params = useParams();
    const router = useRouter();
    const templateId = params.templateId as string;
    const template = getTemplateById(templateId);

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormData>({
        profile: { name: "", title: "", bio: "", email: "", phone: "", location: "", photo: "", github: "", linkedin: "", twitter: "", website: "" },
        skills: [emptySkillCategory()],
        projects: [emptyProject()],
        experience: [emptyExperience()],
    });

    if (!template) {
        return (
            <div className="min-h-screen pt-32 pb-20 section-padding">
                <div className="container-custom max-w-2xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Template not found.</h1>
                    <Link href="/templates" className="minimal-button outline">← Back to Templates</Link>
                </div>
            </div>
        );
    }

    const steps = ["Profile", "Skills", "Projects", "Experience", "Review"];

    const updateProfile = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ templateId, inputs: formData }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to generate portfolio");

            router.push(`/p/${data.slug}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 section-padding">
            <div className="container-custom max-w-3xl mx-auto px-4">
                {/* Header */}
                <div className="mb-10">
                    <Link href="/templates" className="text-sm text-secondary font-mono hover:text-primary transition-colors flex items-center gap-1 mb-6">
                        <ArrowLeft size={14} /> Back to Templates
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg" style={{ background: template.previewGradient }} />
                        <div>
                            <h1 className="text-3xl font-bold">{template.name}</h1>
                            <p className="text-sm text-secondary font-mono">{template.category} · {template.layoutType}</p>
                        </div>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
                    {steps.map((s, i) => (
                        <button
                            key={s}
                            onClick={() => setStep(i)}
                            className={`text-xs font-mono px-4 py-2 rounded-full border transition-all whitespace-nowrap ${i === step
                                ? "border-transparent font-bold"
                                : "border-border-subtle text-secondary hover:border-border-strong"
                                }`}
                            style={i === step ? { backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" } : {}}
                        >
                            {i + 1}. {s}
                        </button>
                    ))}
                </div>

                {/* Form Steps */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {step === 0 && (
                        <div className="minimal-card flex flex-col gap-5">
                            <h2 className="text-xl font-bold mb-2">Your Profile</h2>
                            <InputField label="Full Name *" value={formData.profile.name} onChange={(v) => updateProfile("name", v)} placeholder="e.g. John Doe" />
                            <InputField label="Professional Title *" value={formData.profile.title} onChange={(v) => updateProfile("title", v)} placeholder="e.g. Full-Stack Developer" />
                            <TextareaField label="Bio *" value={formData.profile.bio} onChange={(v) => updateProfile("bio", v)} placeholder="A short paragraph about yourself..." />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="Email *" value={formData.profile.email} onChange={(v) => updateProfile("email", v)} placeholder="you@email.com" />
                                <InputField label="Phone" value={formData.profile.phone} onChange={(v) => updateProfile("phone", v)} placeholder="+1 234 567 8900" />
                            </div>
                            <InputField label="Location" value={formData.profile.location} onChange={(v) => updateProfile("location", v)} placeholder="e.g. San Francisco, CA" />
                            <InputField label="Photo URL" value={formData.profile.photo} onChange={(v) => updateProfile("photo", v)} placeholder="https://..." />
                            <div className="w-full h-px bg-border-strong my-2" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">Social Links</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="GitHub" value={formData.profile.github} onChange={(v) => updateProfile("github", v)} placeholder="https://github.com/..." />
                                <InputField label="LinkedIn" value={formData.profile.linkedin} onChange={(v) => updateProfile("linkedin", v)} placeholder="https://linkedin.com/in/..." />
                                <InputField label="Twitter/X" value={formData.profile.twitter} onChange={(v) => updateProfile("twitter", v)} placeholder="https://x.com/..." />
                                <InputField label="Website" value={formData.profile.website} onChange={(v) => updateProfile("website", v)} placeholder="https://yoursite.com" />
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="minimal-card flex flex-col gap-5">
                            <h2 className="text-xl font-bold mb-2">Skills</h2>
                            {formData.skills.map((cat, ci) => (
                                <div key={ci} className="border border-border-subtle rounded-lg p-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <InputField label="Category" value={cat.category} onChange={(v) => {
                                            const updated = [...formData.skills];
                                            updated[ci].category = v;
                                            setFormData((prev) => ({ ...prev, skills: updated }));
                                        }} placeholder="e.g. Frontend, Backend, DevOps" />
                                        {formData.skills.length > 1 && (
                                            <button onClick={() => setFormData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== ci) }))} className="text-red-400 hover:text-red-300 ml-3 mt-5"><Trash2 size={16} /></button>
                                        )}
                                    </div>
                                    {cat.items.map((item, ii) => (
                                        <div key={ii} className="flex gap-3 items-end">
                                            <div className="flex-1">
                                                <InputField label={`Skill #${ii + 1}`} value={item.name} onChange={(v) => {
                                                    const updated = [...formData.skills];
                                                    updated[ci].items[ii].name = v;
                                                    setFormData((prev) => ({ ...prev, skills: updated }));
                                                }} placeholder="e.g. React, Python, Docker" />
                                            </div>
                                            <select
                                                value={item.proficiency}
                                                onChange={(e) => {
                                                    const updated = [...formData.skills];
                                                    updated[ci].items[ii].proficiency = e.target.value as "expert" | "advanced" | "intermediate";
                                                    setFormData((prev) => ({ ...prev, skills: updated }));
                                                }}
                                                className="minimal-input bg-bg-primary w-36 text-sm"
                                            >
                                                <option value="expert">Expert</option>
                                                <option value="advanced">Advanced</option>
                                                <option value="intermediate">Intermediate</option>
                                            </select>
                                            {cat.items.length > 1 && (
                                                <button onClick={() => {
                                                    const updated = [...formData.skills];
                                                    updated[ci].items = updated[ci].items.filter((_, i) => i !== ii);
                                                    setFormData((prev) => ({ ...prev, skills: updated }));
                                                }} className="text-red-400 hover:text-red-300 mb-1"><Trash2 size={14} /></button>
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={() => {
                                        const updated = [...formData.skills];
                                        updated[ci].items.push({ name: "", proficiency: "intermediate" });
                                        setFormData((prev) => ({ ...prev, skills: updated }));
                                    }} className="text-xs text-accent font-mono flex items-center gap-1 hover:underline"><Plus size={12} /> Add Skill</button>
                                </div>
                            ))}
                            <button onClick={() => setFormData((prev) => ({ ...prev, skills: [...prev.skills, emptySkillCategory()] }))} className="minimal-button outline text-sm flex items-center gap-2"><Plus size={14} /> Add Category</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="minimal-card flex flex-col gap-5">
                            <h2 className="text-xl font-bold mb-2">Projects</h2>
                            {formData.projects.map((proj, pi) => (
                                <div key={pi} className="border border-border-subtle rounded-lg p-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-secondary">Project #{pi + 1}</h3>
                                        {formData.projects.length > 1 && (
                                            <button onClick={() => setFormData((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== pi) }))} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                        )}
                                    </div>
                                    <InputField label="Title" value={proj.title} onChange={(v) => {
                                        const updated = [...formData.projects];
                                        updated[pi].title = v;
                                        setFormData((prev) => ({ ...prev, projects: updated }));
                                    }} placeholder="My Awesome Project" />
                                    <TextareaField label="Description" value={proj.description} onChange={(v) => {
                                        const updated = [...formData.projects];
                                        updated[pi].description = v;
                                        setFormData((prev) => ({ ...prev, projects: updated }));
                                    }} placeholder="What does this project do?" />
                                    <InputField label="Tech Stack (comma-separated)" value={proj.techStack} onChange={(v) => {
                                        const updated = [...formData.projects];
                                        updated[pi].techStack = v;
                                        setFormData((prev) => ({ ...prev, projects: updated }));
                                    }} placeholder="React, Node.js, PostgreSQL" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="Live URL" value={proj.liveUrl} onChange={(v) => {
                                            const updated = [...formData.projects];
                                            updated[pi].liveUrl = v;
                                            setFormData((prev) => ({ ...prev, projects: updated }));
                                        }} placeholder="https://..." />
                                        <InputField label="GitHub URL" value={proj.githubUrl} onChange={(v) => {
                                            const updated = [...formData.projects];
                                            updated[pi].githubUrl = v;
                                            setFormData((prev) => ({ ...prev, projects: updated }));
                                        }} placeholder="https://github.com/..." />
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setFormData((prev) => ({ ...prev, projects: [...prev.projects, emptyProject()] }))} className="minimal-button outline text-sm flex items-center gap-2"><Plus size={14} /> Add Project</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="minimal-card flex flex-col gap-5">
                            <h2 className="text-xl font-bold mb-2">Experience</h2>
                            {formData.experience.map((exp, ei) => (
                                <div key={ei} className="border border-border-subtle rounded-lg p-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-secondary">Experience #{ei + 1}</h3>
                                        {formData.experience.length > 1 && (
                                            <button onClick={() => setFormData((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== ei) }))} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="Company" value={exp.company} onChange={(v) => {
                                            const updated = [...formData.experience];
                                            updated[ei].company = v;
                                            setFormData((prev) => ({ ...prev, experience: updated }));
                                        }} placeholder="Google" />
                                        <InputField label="Role" value={exp.role} onChange={(v) => {
                                            const updated = [...formData.experience];
                                            updated[ei].role = v;
                                            setFormData((prev) => ({ ...prev, experience: updated }));
                                        }} placeholder="Senior Engineer" />
                                    </div>
                                    <InputField label="Duration" value={exp.duration} onChange={(v) => {
                                        const updated = [...formData.experience];
                                        updated[ei].duration = v;
                                        setFormData((prev) => ({ ...prev, experience: updated }));
                                    }} placeholder="Jan 2022 - Present" />
                                    <TextareaField label="Description" value={exp.description} onChange={(v) => {
                                        const updated = [...formData.experience];
                                        updated[ei].description = v;
                                        setFormData((prev) => ({ ...prev, experience: updated }));
                                    }} placeholder="What did you do here?" />
                                    <TextareaField label="Highlights (one per line)" value={exp.highlights} onChange={(v) => {
                                        const updated = [...formData.experience];
                                        updated[ei].highlights = v;
                                        setFormData((prev) => ({ ...prev, experience: updated }));
                                    }} placeholder="Built X that improved Y by Z%..." />
                                </div>
                            ))}
                            <button onClick={() => setFormData((prev) => ({ ...prev, experience: [...prev.experience, emptyExperience()] }))} className="minimal-button outline text-sm flex items-center gap-2"><Plus size={14} /> Add Experience</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="minimal-card flex flex-col gap-5">
                            <h2 className="text-xl font-bold mb-2">Review & Generate</h2>
                            <div className="space-y-4 text-sm">
                                <ReviewSection title="Profile" items={[
                                    `Name: ${formData.profile.name || "—"}`,
                                    `Title: ${formData.profile.title || "—"}`,
                                    `Email: ${formData.profile.email || "—"}`,
                                    `Location: ${formData.profile.location || "—"}`,
                                ]} />
                                <ReviewSection title="Skills" items={formData.skills.map((c) => `${c.category || "Uncategorized"}: ${c.items.map((i) => i.name).filter(Boolean).join(", ") || "—"}`)} />
                                <ReviewSection title="Projects" items={formData.projects.map((p) => p.title || "Untitled")} />
                                <ReviewSection title="Experience" items={formData.experience.map((e) => `${e.role || "—"} at ${e.company || "—"}`)} />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm font-mono bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={loading || !formData.profile.name || !formData.profile.title || !formData.profile.email}
                                className="minimal-button primary flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <><Loader2 size={18} className="animate-spin" /> Generating...</>
                                ) : (
                                    <><Sparkles size={18} /> Generate Portfolio</>
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="minimal-button outline disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </button>
                    {step < 4 && (
                        <button
                            onClick={() => setStep((s) => Math.min(4, s + 1))}
                            className="minimal-button primary"
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="minimal-input text-sm font-mono bg-bg-primary"
                autoComplete="off"
            />
        </div>
    );
}

function TextareaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold uppercase tracking-wider text-secondary">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className="minimal-input text-sm font-mono bg-bg-primary resize-y"
            />
        </div>
    );
}

function ReviewSection({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">{title}</h3>
            <ul className="space-y-1 font-mono text-xs text-primary">
                {items.map((item, i) => <li key={i} className="text-text-primary">{item}</li>)}
            </ul>
        </div>
    );
}
