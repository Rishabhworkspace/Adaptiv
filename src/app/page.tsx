"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Palette, Sparkles, Globe, Zap, Layers, Terminal, Monitor, ChevronDown } from "lucide-react";
import { templates, templateCategories } from "@/data/templates";
import { useRef, useEffect, useState } from "react";

/* ─────────── Animation Variants (outside component per framer-motion skill) ─────────── */

const heroTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.0, 0, 0.2, 1] as const },
  }),
};

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.0, 0, 0.2, 1] as const },
  },
};

/* ─────────── Data ─────────── */

const stats = [
  { label: "Templates", value: "50+", icon: <Palette size={20} /> },
  { label: "Layout Styles", value: "10", icon: <Layers size={20} /> },
  { label: "Categories", value: "10", icon: <Sparkles size={20} /> },
  { label: "Free Forever", value: "100%", icon: <Zap size={20} /> },
];

const layoutShowcase = [
  { name: "Minimal", icon: <Globe size={24} />, desc: "Clean, light, content-first design with refined typography", gradient: "linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)", text: "#111" },
  { name: "Creative", icon: <Sparkles size={24} />, desc: "Dark ambiance with luminous glow effects and glassmorphism", gradient: "linear-gradient(135deg, #0A0A1A 0%, #12122A 50%, #00FF88 100%)", text: "#fff" },
  { name: "Corporate", icon: <Monitor size={24} />, desc: "Professional layouts with structured timelines and skill dots", gradient: "linear-gradient(135deg, #F7FAFC 0%, #EBF8FF 50%, #3182CE 100%)", text: "#1A202C" },
  { name: "Terminal", icon: <Terminal size={24} />, desc: "Code-editor aesthetic with live typing animation and JSON output", gradient: "linear-gradient(135deg, #282A36 0%, #343746 50%, #BD93F9 100%)", text: "#F8F8F2" },
];

const steps = [
  { num: "01", title: "Pick a Template", desc: "Browse 50 handcrafted templates filtered by your role and preferred visual style." },
  { num: "02", title: "Fill Your Details", desc: "Enter your profile, skills, projects, and experience through a guided multi-step form." },
  { num: "03", title: "Share Your Link", desc: "Get a unique, permanent URL you can share with recruiters, clients, or the world." },
];

/* ─────────── Floating Particle ─────────── */

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: x, top: y, width: size, height: size, background: "var(--accent)", opacity: 0 }}
      animate={{ opacity: [0, 0.15, 0], scale: [0.8, 1.2, 0.8], y: [0, -30, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ─────────── Animated Counter ─────────── */

function AnimatedCounter({ value }: { value: string }) {
  const numMatch = value.match(/(\d+)/);
  const suffix = value.replace(/\d+/, "");
  const targetNum = numMatch ? parseInt(numMatch[1]) : 0;
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const increment = Math.ceil(targetNum / 30);
          const timer = setInterval(() => {
            start += increment;
            if (start >= targetNum) {
              setCount(targetNum);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNum, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────── Mouse Glow Effect ─────────── */

function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        x: useTransform(springX, (v) => v - 200),
        y: useTransform(springY, (v) => v - 200),
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

/* ─────────── Main Page ─────────── */

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <MouseGlow />

      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingParticle delay={0} x="10%" y="20%" size={6} />
        <FloatingParticle delay={1.5} x="85%" y="15%" size={4} />
        <FloatingParticle delay={3} x="70%" y="60%" size={5} />
        <FloatingParticle delay={4.5} x="20%" y="75%" size={3} />
        <FloatingParticle delay={2} x="50%" y="40%" size={4} />
      </div>

      {/* ─── HERO ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div custom={0} variants={heroTextVariants} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 text-accent font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8">
              <Sparkles size={12} />
              Portfolio Generator
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.02]"
          >
            Build Your
            <br />
            <span className="relative inline-block">
              <span className="text-accent">Portfolio</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[3px] bg-accent rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
            {" "}In Minutes.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Choose from 50 stunning templates. Fill in your details.
            <br className="hidden md:block" />
            Get a shareable link — no coding required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/templates">
              <motion.span
                className="minimal-button primary text-base px-8 py-4 inline-flex items-center gap-2 group cursor-pointer"
                whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(79,70,229,0.2)" }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Browse Templates
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.span>
            </Link>
            <Link href="#how-it-works">
              <motion.span
                className="minimal-button outline text-base px-8 py-4 inline-flex items-center gap-2 cursor-pointer"
                whileHover={{ y: -1, borderColor: "var(--text-primary)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                How It Works
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} className="text-secondary/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={staggerChild} className="minimal-card text-center p-6 group">
              <motion.div
                className="flex justify-center text-accent mb-3"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {s.icon}
              </motion.div>
              <p className="text-3xl font-bold mb-1"><AnimatedCounter value={s.value} /></p>
              <p className="text-[10px] text-secondary font-mono uppercase tracking-[0.15em]">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative z-10 py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Simple Process</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Three Simple Steps.</h2>
            <p className="text-secondary text-lg max-w-lg mx-auto">From zero to a live portfolio in under 5 minutes.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((item) => (
              <motion.div key={item.num} variants={staggerChild}>
                <motion.div
                  className="minimal-card p-8 text-center h-full relative overflow-hidden group"
                  whileHover={{ y: -4, borderColor: "var(--accent)" }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <span className="text-6xl font-bold text-accent/10 font-mono block mb-4">{item.num}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── LAYOUT SHOWCASE ─── */}
      <section className="relative z-10 py-28 px-6" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20">
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Design System</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">4 Distinctive Layouts.</h2>
            <p className="text-secondary text-lg max-w-lg mx-auto">Each layout tells a different story. Find the one that fits yours.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {layoutShowcase.map((layout) => (
              <motion.div key={layout.name} variants={staggerChild}>
                <motion.div
                  className="minimal-card p-0 overflow-hidden group cursor-pointer"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Gradient Preview */}
                  <div className="h-44 relative overflow-hidden" style={{ background: layout.gradient }}>
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)" }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    />
                    {/* Layout name overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2" style={{ color: layout.text }}>
                      <span className="opacity-70">{layout.icon}</span>
                      <span className="text-sm font-bold tracking-wide">{layout.name}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-secondary leading-relaxed">{layout.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TEMPLATE PREVIEW MARQUEE ─── */}
      <section className="relative z-10 py-20 px-6 overflow-hidden">
        <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Template Gallery</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Made for Every Role.</h2>
          <p className="text-secondary text-lg max-w-lg mx-auto">Templates tailored to your specific profession.</p>
        </motion.div>

        {/* Infinite scrolling marquee of template previews */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />

          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -1800] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...templates.slice(0, 15), ...templates.slice(0, 15)].map((t, i) => (
              <Link key={`${t.id}-${i}`} href={`/generate/${t.id}`} className="flex-shrink-0 group">
                <div className="w-56 rounded-xl overflow-hidden border border-border-subtle hover:border-accent/30 transition-colors">
                  <div className="h-28" style={{ background: t.previewGradient }} />
                  <div className="p-3" style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <p className="text-xs font-bold truncate">{t.name}</p>
                    <p className="text-[10px] text-secondary font-mono">{t.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {templateCategories.map((cat) => (
              <motion.div key={cat} variants={staggerChild}>
                <Link href="/templates">
                  <motion.span
                    className="text-sm font-mono px-5 py-2.5 rounded-full border border-border-subtle inline-flex items-center gap-1.5 cursor-pointer"
                    whileHover={{ y: -2, borderColor: "var(--accent)", color: "var(--accent)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {cat}
                    <span className="text-[10px] text-secondary">
                      ({templates.filter(t => t.category === cat).length})
                    </span>
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Ambient glow behind CTA */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />

          <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
            >
              Ready to Stand Out?
            </motion.h2>
            <p className="text-lg text-secondary mb-12 max-w-lg mx-auto leading-relaxed">
              Build a portfolio that matches your talent. Start for free, share with the world.
            </p>
            <Link href="/templates">
              <motion.span
                className="minimal-button primary text-lg px-12 py-5 inline-flex items-center gap-3 group cursor-pointer"
                whileHover={{ y: -3, scale: 1.02, boxShadow: "0 12px 40px rgba(79,70,229,0.25)" }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                Get Started — It&apos;s Free
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <p className="text-xs text-secondary font-mono tracking-wider">
          Built with ❤️ by the Adaptiv team · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
