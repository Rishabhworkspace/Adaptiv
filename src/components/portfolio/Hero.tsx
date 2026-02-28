import { Profile } from "@/types/portfolio";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero({ profile }: { profile: Profile }) {
    return (
        <section id="about" className="pt-32 pb-20 flex flex-col items-start justify-center min-h-[80vh] animate-fade-in-up">
            <p className="text-[#00cec9] font-mono mb-4 text-sm md:text-base">
        /// SYSTEM_OPTIMIZED
            </p>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                I am <span className="text-gradient">Rishabh.</span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-[#8a8a9a] mb-8 font-medium">
                {profile.title}
            </h2>

            <p className="text-lg text-[#8a8a9a] max-w-2xl mb-12 leading-relaxed">
                {profile.bio}
            </p>

            <div className="flex gap-4">
                <Link href="#projects">
                    <Button variant="primary" className="gap-2">
                        View Database <ArrowRight size={18} />
                    </Button>
                </Link>
                <Link href="#contact">
                    <Button variant="outline">
                        Initialize Contact
                    </Button>
                </Link>
            </div>
        </section>
    );
}
