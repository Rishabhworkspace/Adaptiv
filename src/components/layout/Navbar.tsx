"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import profileData from "@/data/profile.json";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="group relative px-3 py-2 flex items-center justify-center text-secondary hover:text-primary transition-colors duration-300">
        <span className="absolute left-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-light">
            (
        </span>
        <span className="uppercase tracking-widest text-xs font-bold transition-colors group-hover:text-accent">
            {children}
        </span>
        <span className="absolute right-0 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-light">
            )
        </span>
    </Link>
);

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-full z-50 top-6 left-0 flex justify-center px-4"
        >
            <div className="w-full max-w-5xl bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 px-6 py-3 rounded-full flex items-center justify-between shadow-sm transition-colors duration-300">
                <Link href="/" className="text-lg font-bold tracking-tight text-primary">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                        ríshabh<span className="text-accent">.</span>
                    </motion.div>
                </Link>

                <div className="hidden md:flex gap-4 items-center font-medium">
                    <NavLink href="#about">About</NavLink>
                    <NavLink href="#projects">Work</NavLink>
                    <NavLink href="#skills">Expertise</NavLink>
                    <NavLink href="#experience">Journey</NavLink>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex gap-3 mr-2">
                        <Link href={profileData.links.github} target="_blank" className="text-secondary hover:text-primary transition-colors flex items-center justify-center" aria-label="Github">
                            <motion.div whileHover={{ scale: 1.2, y: -2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <Github size={18} />
                            </motion.div>
                        </Link>
                        <Link href={profileData.links.linkedin} target="_blank" className="text-secondary hover:text-primary transition-colors flex items-center justify-center" aria-label="LinkedIn">
                            <motion.div whileHover={{ scale: 1.2, y: -2, rotate: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <Linkedin size={18} />
                            </motion.div>
                        </Link>
                    </div>
                    {/* Vertical Divider */}
                    <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
                    <motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                        <ThemeToggle />
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}
