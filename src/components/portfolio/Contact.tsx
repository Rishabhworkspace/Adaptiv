"use client";

import { Button } from "../ui/Button";
import { Copy, Mail } from "lucide-react";
import { useState } from "react";

export function Contact({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 mb-10 scroll-mt-20 flex flex-col items-center justify-center text-center animate-fade-in-up">
            <p className="text-[#00cec9] font-mono mb-4">
        /// SYSTEM_STATUS: AVAILABLE
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Talk Code.
            </h2>

            <p className="text-[#8a8a9a] max-w-xl mb-10 text-lg">
                I'm currently available for freelance work and open to full-time opportunities. Whether you've got a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a href={`mailto:${email}`}>
                    <Button variant="primary" className="gap-2 w-full sm:w-auto h-12">
                        <Mail size={18} /> Initialize Contact
                    </Button>
                </a>
                <Button
                    variant="outline"
                    className="gap-2 font-mono h-12"
                    onClick={handleCopy}
                >
                    {copied ? <span className="text-[#00b894]">COPIED!</span> : <><Copy size={16} /> {email}</>}
                </Button>
            </div>
        </section>
    );
}
