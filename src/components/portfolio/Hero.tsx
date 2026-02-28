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
        <section id="about" className="relative min-h-[90vh] flex items-center pt-32 pb-16 px-8 md:px-16 overflow-hidden bg-bg-primary">

            {/* Abstract Background Graphic (acting as the anchor on the right) */}
            <div className="absolute top-[40%] right-[5%] md:right-[10%] lg:right-[15%] -translate-y-1/2 pointer-events-none z-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[450px] h-[450px] md:w-[650px] md:h-[650px] text-accent-secondary opacity-90 dark:opacity-80">
                        {/* New brush-like organic path */}
                        <path d="M124.5 130.5C50 167 15 258 5 358.5C-5 459 90.5 561.5 220 580C349.5 598.5 456 507 514.5 428C573 349 609 253.5 572 173C535 92.5 448 -9.00002 338 1.49998C228 12 199 94 124.5 130.5Z" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                {/* Left Column: Typography */}
                <div className="flex flex-col items-start justify-center">
                    {tailoredFor && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <Badge variant="glow" className="py-2 px-4 bg-bg-glass text-text-secondary tracking-wide text-xs rounded-full border border-accent-secondary/20">
                                <span className="mr-2">✨</span>
                                Crafted for {tailoredFor.company}
                            </Badge>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-display text-6xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.95] tracking-tight text-text-primary mb-6"
                    >
                        Hey There,<br />
                        I&apos;m Rishabh
                    </motion.h1>

                    <motion.a
                        href={`mailto:${profile.email}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-accent-primary font-sans font-semibold tracking-wide text-xl mb-12"
                    >
                        {profile.email}
                    </motion.a>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-display font-bold text-text-primary">02</span>
                            <span className="text-xs font-sans font-medium text-text-secondary uppercase tracking-widest max-w-[80px] leading-tight">Years<br />Experience</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Bio & Badge */}
                <div className="flex flex-col justify-center items-end lg:items-center relative mt-16 lg:mt-0">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg md:text-xl text-text-secondary font-sans leading-relaxed max-w-sm text-right lg:text-left lg:absolute lg:top-1/4 lg:right-0"
                    >
                        I design and build beautifully simple software, And I love what I do.
                    </motion.p>

                    {/* Circular Stamp / Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 20, delay: 1 }}
                        className="lg:absolute lg:bottom-1/4 lg:right-[10%] mt-12 lg:mt-0"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center rounded-full border border-border-glass bg-bg-glass backdrop-blur-sm">
                            <span className="text-center text-xs font-sans font-semibold tracking-widest text-text-primary uppercase px-4 leading-relaxed">
                                Full Stack<br />Software<br />Developer
                            </span>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
