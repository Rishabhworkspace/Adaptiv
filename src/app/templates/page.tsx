"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, Palette, Monitor, Terminal, Sparkles } from "lucide-react";
import { templates, templateCategories, type TemplateCategory, type LayoutType } from "@/data/templates";

const layoutIcons: Record<LayoutType, React.ReactNode> = {
    minimal: <Layers size={14} />,
    creative: <Sparkles size={14} />,
    corporate: <Monitor size={14} />,
    terminal: <Terminal size={14} />,
};

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All");
    const [selectedLayout, setSelectedLayout] = useState<LayoutType | "All">("All");

    const filtered = useMemo(() => {
        return templates.filter((t) => {
            const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
            const matchLayout = selectedLayout === "All" || t.layoutType === selectedLayout;
            return matchCategory && matchLayout;
        });
    }, [selectedCategory, selectedLayout]);

    return (
        <div className="min-h-screen pt-32 pb-20 section-padding">
            <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Template.</h1>
                    <p className="text-secondary font-mono max-w-2xl">
                        50 handcrafted portfolio templates inspired by the best developer portfolios.
                        Filter by your role or preferred style.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-6 mb-12">
                    {/* Category Filter */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 block">
                            <Palette size={14} className="inline mr-1.5 -mt-0.5" />
                            Role
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill
                                label="All"
                                active={selectedCategory === "All"}
                                onClick={() => setSelectedCategory("All")}
                            />
                            {templateCategories.map((cat) => (
                                <FilterPill
                                    key={cat}
                                    label={cat}
                                    active={selectedCategory === cat}
                                    onClick={() => setSelectedCategory(cat)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Layout Filter */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 block">
                            <Layers size={14} className="inline mr-1.5 -mt-0.5" />
                            Layout Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill
                                label="All"
                                active={selectedLayout === "All"}
                                onClick={() => setSelectedLayout("All")}
                            />
                            {(["minimal", "creative", "corporate", "terminal"] as LayoutType[]).map((layout) => (
                                <FilterPill
                                    key={layout}
                                    label={layout.charAt(0).toUpperCase() + layout.slice(1)}
                                    active={selectedLayout === layout}
                                    onClick={() => setSelectedLayout(layout)}
                                    icon={layoutIcons[layout]}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-secondary font-mono mb-8">
                    Showing {filtered.length} template{filtered.length !== 1 ? "s" : ""}
                </p>

                {/* Template Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((template, index) => (
                            <motion.div
                                key={template.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.03, duration: 0.3 }}
                            >
                                <Link href={`/generate/${template.id}`} className="group block">
                                    <div className="minimal-card p-0 overflow-hidden hover:border-accent/40 transition-all duration-300">
                                        {/* Color Preview */}
                                        <div
                                            className="h-40 relative overflow-hidden"
                                            style={{ background: template.previewGradient }}
                                        >
                                            {/* Layout badge */}
                                            <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center gap-1">
                                                {layoutIcons[template.layoutType]}
                                                {template.layoutType}
                                            </span>

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-sm flex items-center gap-2">
                                                    Use This Template <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                                            <p className="text-xs text-secondary font-mono mb-3">{template.category}</p>
                                            <p className="text-sm text-secondary leading-relaxed mb-4">
                                                {template.description}
                                            </p>

                                            {/* Font preview */}
                                            <div className="text-[10px] font-mono text-secondary/60 flex flex-wrap gap-2">
                                                <span className="bg-bg-primary px-2 py-0.5 rounded">{template.fontHeading}</span>
                                                {template.fontBody !== template.fontHeading && (
                                                    <span className="bg-bg-primary px-2 py-0.5 rounded">{template.fontBody}</span>
                                                )}
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {template.features.slice(0, 3).map((f) => (
                                                    <span
                                                        key={f}
                                                        className="text-[10px] font-mono text-accent/80 border border-accent/20 px-2 py-0.5 rounded-full"
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                                {template.features.length > 3 && (
                                                    <span className="text-[10px] font-mono text-secondary/60 px-1 py-0.5">
                                                        +{template.features.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-secondary text-lg font-mono">No templates match your filters.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSelectedLayout("All"); }}
                            className="minimal-button primary mt-4"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function FilterPill({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon?: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 ${active
                ? "bg-text-primary text-bg-primary border-transparent"
                : "border-border-subtle text-secondary hover:border-border-strong hover:text-primary"
                }`}
            style={active ? { backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" } : {}}
        >
            {icon}
            {label}
        </button>
    );
}
