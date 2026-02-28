import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import profileData from "@/data/profile.json";

export function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
            <div className="container-custom mx-auto py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    ríshabh<span className="text-[#6c5ce7]">.exe</span>
                </Link>

                <div className="hidden md:flex gap-8 items-center text-sm font-mono text-[#8a8a9a]">
                    <Link href="#about" className="hover:text-white transition-colors">/ABOUT</Link>
                    <Link href="#projects" className="hover:text-white transition-colors">/WORK</Link>
                    <Link href="#skills" className="hover:text-white transition-colors">/SKILLS</Link>
                    <Link href="#experience" className="hover:text-white transition-colors">/LOGS</Link>
                </div>

                <div className="flex gap-4">
                    <Link href={profileData.links.github} target="_blank" className="text-[#8a8a9a] hover:text-white transition-colors">
                        <Github size={20} />
                    </Link>
                    <Link href={profileData.links.linkedin} target="_blank" className="text-[#8a8a9a] hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
