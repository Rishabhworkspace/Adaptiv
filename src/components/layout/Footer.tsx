import profileData from "@/data/profile.json";
import { Github, Linkedin, Instagram, Mail, Code2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-black/10 dark:border-white/10 pt-8 pb-28 mt-24">
            <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand / Copyright */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="font-bold text-lg tracking-tight text-primary transition-colors hover:text-accent">
                        {profileData.name}.
                    </span>
                    <p className="text-secondary/70 text-xs font-mono mt-1">
                        © {new Date().getFullYear()} // SYSTEM_END
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    <a
                        href={`mailto:${profileData.email}`}
                        className="text-sm font-mono text-secondary hover:text-accent transition-colors flex items-center gap-2"
                    >
                        <Mail size={16} />
                        <span>{profileData.email}</span>
                    </a>

                    {/* Socials */}
                    <div className="flex gap-4 items-center">
                        {profileData.links.github && (
                            <a href={profileData.links.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                        )}
                        {profileData.links.linkedin && (
                            <a href={profileData.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {profileData.links.leetcode && (
                            <a href={profileData.links.leetcode} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="LeetCode">
                                <Code2 size={18} />
                            </a>
                        )}
                        {profileData.links.instagram && (
                            <a href={profileData.links.instagram} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </footer>
    );
}
