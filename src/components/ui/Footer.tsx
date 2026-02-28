import React from 'react';
import { Github, Linkedin, Instagram, Code2 } from 'lucide-react';
import { Profile } from '@/types/portfolio';
import profileData from '@/data/profile.json';

const profile = profileData as Profile;

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-12 mt-20 border-t border-border-glass bg-bg-primary">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-text-primary font-syne font-bold text-xl uppercase tracking-tight flex flex-col md:flex-row md:items-center gap-2">
                        Rishabh Tripathi
                        <span className="text-accent-primary text-[10px] font-mono tracking-widest px-2 py-0.5 border border-accent-primary/30 hidden md:inline-block">
                            RUNTIME_COMPLETE
                        </span>
                    </p>
                    <p className="text-text-secondary font-light text-sm mt-2">
                        Merging code with refined aesthetics.
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    {profile.links.github && (
                        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-glass border border-border-glass text-text-secondary hover:text-bg-primary hover:bg-text-primary transition-all rounded-none group">
                            <Github size={18} className="transition-transform group-hover:scale-110" />
                        </a>
                    )}
                    {profile.links.linkedin && (
                        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-glass border border-border-glass text-text-secondary hover:text-bg-primary hover:bg-text-primary transition-all rounded-none group">
                            <Linkedin size={18} className="transition-transform group-hover:scale-110" />
                        </a>
                    )}
                    {profile.links.leetcode && (
                        <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-glass border border-border-glass text-text-secondary hover:text-bg-primary hover:bg-text-primary transition-all rounded-none group">
                            <Code2 size={18} className="transition-transform group-hover:scale-110" />
                        </a>
                    )}
                    {profile.links.instagram && (
                        <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-bg-glass border border-border-glass text-text-secondary hover:text-bg-primary hover:bg-text-primary transition-all rounded-none group">
                            <Instagram size={18} className="transition-transform group-hover:scale-110" />
                        </a>
                    )}
                </div>

                <div className="text-[10px] text-text-muted font-mono tracking-widest uppercase">
                    &copy; {currentYear} Rishabh.exe. <br className="md:hidden" /> All rights reserved.
                </div>

            </div>
        </footer>
    );
}
