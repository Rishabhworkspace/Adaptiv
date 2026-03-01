import profileData from "@/data/profile.json";
import { Github, Linkedin, Instagram, Mail, Code2, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-black/10 dark:border-white/10 py-12 mt-24 sm:mt-32">
            <div className="container-custom flex flex-col items-center sm:items-start gap-8 sm:gap-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-8">
                    {/* Brand / Quote */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="font-bold text-xl tracking-tight mb-2 text-primary">{profileData.name}.</span>
                        <p className="text-secondary text-sm max-w-sm">
                            Designing for the future with the raw aesthetics of the past. Building products that refuse to be boring.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4 text-sm font-mono text-secondary hover:[&_a]:text-accent">
                        <a href={`mailto:${profileData.email}`} className="flex items-center justify-center md:justify-end gap-3 transition-colors">
                            <span>{profileData.email}</span>
                            <Mail size={16} />
                        </a>
                    </div>
                </div>

                <div className="w-full h-px bg-black/5 dark:bg-white/5"></div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-6 text-xs font-mono text-secondary/70">
                    <p>© {new Date().getFullYear()} {profileData.name} // SYSTEM_END</p>

                    {/* Socials */}
                    <div className="flex gap-2 items-center">
                        {profileData.links.github && (
                            <a href={profileData.links.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                        )}
                        {profileData.links.linkedin && (
                            <a href={profileData.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {profileData.links.leetcode && (
                            <a href={profileData.links.leetcode} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="LeetCode">
                                <Code2 size={18} />
                            </a>
                        )}
                        {profileData.links.instagram && (
                            <a href={profileData.links.instagram} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
