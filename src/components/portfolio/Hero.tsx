"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Profile } from '@/types/portfolio';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroProps {
    profile: Profile;
    tailoredFor?: { company: string; role: string };
}

export function Hero({ profile, tailoredFor }: HeroProps) {
    return (
        <section id="about" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 lg:px-12">

            {/* Background Ambience - Ultra minimal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-bg-primary flex items-center justify-center">
                <div className="w-[800px] h-[800px] bg-accent-primary/[0.04] dark:bg-white/[0.02] rounded-full blur-[120px]"></div>

                {/* Extremely subtle minimal grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
            </div>

            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center relative z-10">

                {tailoredFor && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <Badge variant="glow" className="py-2 px-4 shadow-sm border-border-glass bg-bg-glass text-text-secondary tracking-wide text-xs rounded-full">
                            <span className="mr-2">✨</span>
                            Crafted for {tailoredFor.company} • {tailoredFor.role}
                        </Badge>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-text-primary mb-6"
                >
                    Hi, I&apos;m Rishabh
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-3xl text-text-secondary font-light mb-8 max-w-2xl"
                >
                    {profile.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-text-muted font-light leading-relaxed max-w-2xl mb-12"
                >
                    {profile.bio}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a href="#projects">
                        <Button variant="primary" size="lg" className="rounded-full px-8 gap-2 hover:gap-4 transition-all duration-300 shadow-lg shadow-accent-primary/10" style={{ borderRadius: '9999px', textTransform: 'none', letterSpacing: 'normal' }}>
                            View Portfolio <ArrowRight size={18} />
                        </Button>
                    </a>
                    <a href="#contact">
                        <Button variant="secondary" size="lg" className="rounded-full px-8 gap-2" style={{ borderRadius: '9999px', textTransform: 'none', letterSpacing: 'normal' }}>
                            <Mail size={18} /> Contact
                        </Button>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
