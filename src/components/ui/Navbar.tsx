"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Phone } from 'lucide-react';
import { Profile } from '@/types/portfolio';
import profileData from '@/data/profile.json';

const profile = profileData as Profile;

const navItems = [
    { name: 'SERVICES', href: '#services' },
    { name: 'WORKS', href: '#projects' },
    { name: 'NOTES', href: '#notes' },
    { name: 'EXPERIENCE', href: '#experience' },
];

export function Navbar() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-transparent"
        >
            <Link href="/" className="text-3xl font-script tracking-tight text-text-primary group flex items-center">
                Rishabh
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => {
                    const isHovered = hovered === item.name;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHovered(item.name)}
                            onMouseLeave={() => setHovered(null)}
                            className={`text-[11px] font-sans font-semibold tracking-[0.15em] transition-colors relative flex items-center justify-center min-w-[100px] h-8 ${isHovered ? 'text-accent-secondary' : 'text-text-primary'}`}
                        >
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.span
                                        initial={{ opacity: 0, x: 5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 5 }}
                                        className="absolute left-0 text-accent-secondary font-light text-lg"
                                    >
                                        (
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            <span>{item.name}</span>

                            <AnimatePresence>
                                {isHovered && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                        className="absolute right-0 text-accent-secondary font-light text-lg"
                                    >
                                        )
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    )
                })}
            </nav>

            <div className="flex items-center space-x-6">
                <a href={`tel:${profile.phone}`} className="hidden md:flex items-center text-sm font-sans font-medium text-text-primary hover:text-accent-primary transition-colors">
                    {profile.phone}
                </a>
                <ThemeToggle />
            </div>
        </motion.header>
    );
}
