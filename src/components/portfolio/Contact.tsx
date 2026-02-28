"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Profile } from '@/types/portfolio';

interface ContactProps {
    profile: Profile;
}

export function Contact({ profile }: ContactProps) {
    return (
        <section id="contact" className="py-32 px-6 lg:px-12 max-w-[1000px] mx-auto min-h-[70vh] flex flex-col justify-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <GlassCard className="text-center p-12 lg:p-20 relative overflow-hidden group rounded-none border-border-glass hover:border-accent-primary/50 transition-colors duration-500">

                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 via-transparent to-accent-secondary/10 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl rounded-none -z-10"></div>

                    <h2 className="text-sm font-mono tracking-widest text-accent-secondary mb-6 uppercase flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-accent-secondary"></span>
                        CONNECT_REQUEST
                        <span className="w-8 h-px bg-accent-secondary"></span>
                    </h2>

                    <h3 className="font-syne text-5xl md:text-7xl font-extrabold tracking-tighter text-text-primary mb-10 uppercase leading-[0.9]">
                        Let&apos;s talk <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Code.</span>
                    </h3>

                    <p className="text-text-secondary leading-relaxed mb-12 max-w-xl mx-auto text-lg font-light">
                        I am currently available for freelance work and open to full-time opportunities. My inbox is always open.
                    </p>

                    <motion.a
                        href={`mailto:${profile.email}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button variant="primary" size="lg" className="px-12 py-5 text-sm font-syne font-bold uppercase tracking-widest rounded-none bg-text-primary text-bg-primary hover:bg-accent-primary hover:text-white transition-all duration-300">
                            Say Hello →
                        </Button>
                    </motion.a>

                    <div className="mt-16 flex items-center justify-center gap-3 text-xs text-text-muted font-mono tracking-widest uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                        </span>
                        <span>AWAITING_INPUT</span>
                        <span className="animate-pulse">_</span>
                    </div>

                </GlassCard>
            </motion.div>

        </section>
    );
}
