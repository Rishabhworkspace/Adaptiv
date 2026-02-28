import { GlassCard } from "../ui/GlassCard";
import { Download, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { RecruiterContext } from "./PortfolioProvider";

interface WhyMeProps {
    whyMe: {
        title: string;
        points: string[];
        closingStatement: string;
    };
    context: RecruiterContext | null;
}

export function WhyMe({ whyMe, context }: WhyMeProps) {
    if (!whyMe || !context) return null;

    return (
        <section id="why-me" className="py-20 scroll-mt-20">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    <Sparkles className="text-[#6c5ce7]" />
                    Custom Fit Analysis
                </h2>
                <div className="h-px bg-white/10 flex-grow"></div>
            </div>

            <GlassCard elevated className="relative overflow-hidden group border-[#6c5ce7]/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6c5ce7] to-[#00cec9]"></div>

                <h3 className="text-2xl font-bold mb-6 text-white">{whyMe.title}</h3>

                <ul className="mb-8 space-y-4">
                    {whyMe.points.map((point, i) => (
                        <li key={i} className="text-[#8a8a9a] flex items-start gap-4">
                            <span className="text-[#00cec9] mt-1 text-sm font-mono border border-[#00cec9]/30 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                {i + 1}
                            </span>
                            <span className="text-lg leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg mb-8">
                    <p className="text-white italic">{whyMe.closingStatement}</p>
                </div>

                <Button variant="primary" className="gap-2 group">
                    <Download size={18} className="group-hover:translate-y-[-2px] transition-transform" />
                    Download "{context.role.split(' ')[0]}" Resume
                </Button>
            </GlassCard>
        </section>
    );
}
