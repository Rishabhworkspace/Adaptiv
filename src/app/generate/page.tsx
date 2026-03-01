"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, CheckCircle2, Link as LinkIcon, ExternalLink, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type SavedLink = {
    id: string;
    company: string;
    role: string;
    url: string;
    createdAt: string;
};

export default function GeneratePage() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("portfolio_saved_links");
        if (stored) {
            try {
                setSavedLinks(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse saved links");
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const baseUrl = `${window.location.protocol}//${window.location.host}/portfolio`;

        if (!company && !role) {
            setGeneratedLink(baseUrl);
            return;
        }

        const params = new URLSearchParams();
        if (company) params.set("company", company);
        if (role) params.set("role", role);

        setGeneratedLink(`${baseUrl}?${params.toString()}`);
        setCopied(false);
    }, [company, role]);

    const handleCopy = useCallback(async () => {
        if (!generatedLink) return;
        try {
            await navigator.clipboard.writeText(generatedLink);
            setCopied(true);

            if (company || role) {
                const newLink: SavedLink = {
                    id: Date.now().toString(),
                    company: company || "General",
                    role: role || "General",
                    url: generatedLink,
                    createdAt: new Date().toISOString()
                };

                setSavedLinks(prev => {
                    const updatedLinks = [newLink, ...prev.filter(l => l.url !== generatedLink)].slice(0, 10);
                    localStorage.setItem("portfolio_saved_links", JSON.stringify(updatedLinks));
                    return updatedLinks;
                });
            }

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }, [generatedLink, company, role]);

    const handleRemoveLink = useCallback((id: string) => {
        setSavedLinks(prev => {
            const updatedLinks = prev.filter(l => l.id !== id);
            localStorage.setItem("portfolio_saved_links", JSON.stringify(updatedLinks));
            return updatedLinks;
        });
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 section-padding">
            <div className="container-custom max-w-2xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Link Generator.</h1>
                    <p className="text-secondary font-mono">Create personalized portfolio URLs for recruiters in seconds.</p>
                </div>

                <div className="minimal-card flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-secondary">
                            Target Company
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Google, Vercel, Stripe"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="minimal-input text-lg font-mono bg-bg-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-secondary">
                            Target Role
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Frontend Engineer, Product Designer"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="minimal-input text-lg font-mono bg-bg-primary"
                        />
                    </div>

                    <div className="w-full h-px bg-border-strong my-2"></div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                            <LinkIcon size={16} /> Generated URL
                        </label>

                        <div className="relative group">
                            <div className="w-full p-4 bg-bg-primary border border-border-strong rounded-lg font-mono text-sm md:text-base break-all select-all transition-colors group-hover:border-accent shadow-inner">
                                {generatedLink}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleCopy}
                                    className={`flex-1 minimal-button ${copied ? 'bg-green-500/10 text-green-600 border-green-500 hover:bg-green-500/20' : 'primary'} flex justify-center items-center gap-2`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle2 size={18} />
                                            <span>Copied to Clipboard</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>

                                <a
                                    href={generatedLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="minimal-button outline flex justify-center items-center gap-2"
                                    title="Test Link in new tab"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/20">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        How this works
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-mono">
                        When the recipient opens this link, the AI engine extracts the company and role, cross-references it with your master dataset, and dynamically rewrites the landing page copy, project descriptions, and highlights specifically for them.
                    </p>
                </div>

                {savedLinks.length > 0 && (
                    <div className="mt-12 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Clock size={24} className="text-accent" />
                                Recent Links
                            </h2>
                            <button
                                onClick={() => {
                                    if (confirm("Clear all saved links?")) {
                                        setSavedLinks([]);
                                        localStorage.removeItem("portfolio_saved_links");
                                    }
                                }}
                                className="text-xs text-secondary hover:text-red-400 font-mono flex items-center gap-1 transition-colors"
                            >
                                <Trash2 size={14} /> Clear All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {savedLinks.map((link) => (
                                <div key={link.id} className="minimal-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-accent/40 transition-colors">
                                    <div>
                                        <div className="font-bold text-lg">{link.company}</div>
                                        <div className="text-sm text-secondary font-mono mb-2">{link.role}</div>
                                        <div className="text-xs text-secondary/60">
                                            {new Date(link.createdAt).toLocaleDateString()} at {new Date(link.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(link.url);
                                                // Could add a toast here
                                            }}
                                            className="minimal-button primary flex-1 sm:flex-none flex justify-center items-center gap-2 py-2 px-3"
                                            title="Copy Link"
                                        >
                                            <Copy size={16} />
                                            <span className="sm:hidden">Copy</span>
                                        </button>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="minimal-button outline flex-1 sm:flex-none flex justify-center items-center gap-2 py-2 px-3"
                                            title="Open Link"
                                        >
                                            <ExternalLink size={16} />
                                            <span className="sm:hidden">Open</span>
                                        </a>
                                        <button
                                            onClick={() => handleRemoveLink(link.id)}
                                            className="p-2 rounded-lg border border-transparent text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors flex justify-center items-center"
                                            title="Remove"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
