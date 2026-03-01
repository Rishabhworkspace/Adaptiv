"use client";

import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function Contact({ email }: { email: string }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "rateLimited">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (status === "success" || status === "rateLimited") {
            timeout = setTimeout(() => {
                if (status === "success") {
                    formRef.current?.reset();
                    if (formRef.current) {
                        const messageArea = formRef.current.elements.namedItem("message") as HTMLTextAreaElement | null;
                        if (messageArea) {
                            messageArea.style.height = 'auto';
                        }
                    }
                }
                setStatus("idle");
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [status]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            if (res.status === 429) {
                setStatus("rateLimited");
            } else if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-40 scroll-mt-20 border-t border-black/10 dark:border-white/10 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 leading-none text-primary/90"
                >
                    Hello.
                </motion.h2>

                <p className="text-secondary mb-20 text-xl font-light max-w-xl mx-auto leading-relaxed">
                    Currently open for new opportunities. Whether it's a question, project inquiry, or just a hello—my inbox is always open.
                </p>

                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl space-y-12 text-left"
                >
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="relative w-full group">
                            <input
                                id="name"
                                name="name"
                                required
                                type="text"
                                autoComplete="name"
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-3 text-xl focus:outline-none focus-visible:border-accent dark:focus-visible:border-accent transition-colors peer placeholder-transparent"
                                placeholder="Name"
                            />
                            <label htmlFor="name" className="absolute left-0 -top-6 text-sm font-mono tracking-widest uppercase text-secondary peer-focus:text-accent transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-focus:-top-6 peer-focus:text-sm peer-focus:font-mono peer-focus:uppercase">
                                Name
                            </label>
                        </div>
                        <div className="relative w-full group">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                spellCheck={false}
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-3 text-xl focus:outline-none focus-visible:border-accent dark:focus-visible:border-accent transition-colors peer placeholder-transparent"
                                placeholder="Email"
                            />
                            <label htmlFor="email" className="absolute left-0 -top-6 text-sm font-mono tracking-widest uppercase text-secondary peer-focus:text-accent transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-0 peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-focus:-top-6 peer-focus:text-sm peer-focus:font-mono peer-focus:uppercase">
                                Email
                            </label>
                        </div>
                    </div>

                    <div className="relative w-full group pt-8">
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={1}
                            className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-3 text-xl focus:outline-none focus-visible:border-accent dark:focus-visible:border-accent transition-colors resize-none peer placeholder-transparent min-h-[40px] overflow-hidden"
                            placeholder="Message"
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = target.scrollHeight + 'px';
                            }}
                        ></textarea>
                        <label htmlFor="message" className="absolute left-0 top-2 text-sm font-mono tracking-widest uppercase text-secondary peer-focus:text-accent transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-8 peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-sm peer-focus:font-mono peer-focus:uppercase">
                            Message
                        </label>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={status === "submitting" || status === "success" || status === "rateLimited"}
                            className="group flex items-center justify-center gap-4 text-xl font-medium hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative">
                                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent ✓" : status === "rateLimited" ? "Too Many Attempts. Wait 1m." : status === "error" ? "Failed — Try Again" : "Send Message"}
                                <span className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </span>
                            <Send size={20} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 opacity-70 group-hover:opacity-100 group-hover:text-accent" />
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
