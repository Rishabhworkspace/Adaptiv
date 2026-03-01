import { Profile } from "@/types/portfolio";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

import { DownloadResumeButton } from "../resume/DownloadResumeButton";

export function Hero({ profile }: { profile: Profile }) {
    return (
        <section id="about" className="relative pt-40 pb-20 flex flex-col items-start justify-center min-h-[90vh]">
            <div className="max-w-4xl w-full mx-auto relative z-10">
                <div className="flex flex-col gap-6 stagger-children">
                    <p className="font-mono text-accent text-sm md:text-base font-medium tracking-wider uppercase">
                        {profile.title}
                    </p>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[1.05] tracking-tighter">
                        Hi, I&apos;m <br />
                        <span className="text-accent">{(profile?.name ?? 'Friend').split(' ')[0]}</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-secondary max-w-2xl mt-4 leading-relaxed font-light">
                        {profile.bio}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8 items-center">
                        <Link href="#projects">
                            <Button variant="primary" className="group h-12">
                                Selected Work
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="outline" className="h-12">
                                Start a Conversation
                            </Button>
                        </Link>
                        <DownloadResumeButton />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
                <ArrowDown size={24} className="text-secondary" />
            </div>
        </section>
    );
}
