import { useEffect, useRef, useState } from "react";
import {
  MapPin, Globe, Clock, BookOpen, Heart, Car, Utensils, Dog,
  Mail, Calendar, Download, ExternalLink, Twitter, Instagram, Linkedin,
  Star, Layers, Code2, Database, Cpu, Zap, GitBranch, Shield, Users, Eye, Lightbulb
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "Python",      icon: "🐍" },
  { name: "LLMs / RAGs", icon: "🤖" },
  { name: "AWS",         icon: "☁️" },
  { name: "MongoDB",     icon: "🍃" },
  { name: "PyTorch",     icon: "🔥" },
  { name: "FastAPI",     icon: "⚡" },
  { name: "LangChain",   icon: "🔗" },
  { name: "Vector DBs",  icon: "🧮" },
  { name: "Rest APIs",   icon: "🔌" },
  { name: "SQL",         icon: "🗄️" },
  { name: "Framer",      icon: "✦" },
  { name: "MLOps",       icon: "⚙️" },
];

const VALUES = [
  { name: "Ownership",         icon: Shield },
  { name: "Curiosity",         icon: Eye },
  { name: "Simplicity",        icon: Layers },
  { name: "Practical Thinking",icon: Lightbulb },
  { name: "Team-First",        icon: Users },
];

const TESTIMONIALS = [
  {
    name: "Priyanka Kasture",
    location: "Pune, India",
    date: "11. Feb 2025",
    text: "Abhishek is hardworking, sharp, and combines strong technical skills with real business sense — a rare and valuable mix.",
  },
  {
    name: "Ankita Katre",
    location: "Pune, India",
    date: "16. Nov 2020",
    text: "Working with Abhishek is always a great experience. He brings clarity to complex problems and always delivers with precision.",
  },
];

const COMPANIES = [
  { name: "HYPD",     logo: null, text: "HYPD" },
  { name: "Citi",     logo: null, text: "citi" },
  { name: "Spienomial",logo: null, text: "Spienomial" },
  { name: "Affine",   logo: null, text: "AFFINE" },
  { name: "Amazon",   logo: null, text: "amazon" },
];

const PROJECTS = [
  { title: "Embeddings-Based Search Engine", color: "from-purple-900 to-indigo-900", emoji: "🔍" },
  { title: "Natural Language → SQL Conversion System", color: "from-rose-900 to-pink-900", emoji: "💬" },
  { title: "Generative AI IVR System", color: "from-cyan-900 to-teal-900", emoji: "🎙️" },
];

const SOCIALS = [
  { icon: Twitter,   handle: "@afor_abhishek",     url: "https://twitter.com/afor_abhishek",                label: "Twitter" },
  { icon: Instagram, handle: "@abhishek.mamdapure", url: "https://instagram.com/abhishek.mamdapure",       label: "Instagram" },
  { icon: Linkedin,  handle: "/abhishekmamdapure",  url: "https://linkedin.com/in/abhishekmamdapure",       label: "LinkedIn" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(timer);
  }, [delay]);
  return ref;
}

function useCountUp(target, duration = 1800, delay = 400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatCard({ value, label, delay }) {
  const count = useCountUp(value, 1600, delay);
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover stat-card flex-1">
      <span className="font-display text-5xl font-bold text-white">
        {count}<span className="text-accent">+</span>
      </span>
      <span className="mt-2 text-sm text-muted font-body">{label}</span>
    </div>
  );
}

function HeroCard({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover p-6 relative overflow-hidden">
      {/* glow */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-accent opacity-[0.06] rounded-full blur-3xl pointer-events-none" />

      {/* Top row */}resume
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161616] border border-border rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-xs text-gray-300 font-body">Available To Work</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 bg-[#161616] border border-border rounded-full text-xs text-gray-300 hover:border-accent hover:text-white transition-all duration-200">
          Resume <Download size={12} />
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/40 to-purple-900/60 border border-accent/30 flex items-center justify-center text-3xl overflow-hidden">
            <span className="font-display font-bold text-white text-2xl">AM</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-bg" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white leading-tight">
            Abhishek Mamdapure
          </h1>
          <p className="text-gray-400 text-sm mt-0.5 font-body">
            I'm a{" "}
            <span className="text-accent font-semibold bg-accent/10 px-1.5 py-0.5 rounded-md">
              GenAI
            </span>{" "}
            Engineer
          </p>
        </div>
      </div>

      {/* Tags grid */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: MapPin,   text: "Pune, India" },
          { icon: Globe,    text: "English, Hindi & Marathi" },
          { icon: Clock,    text: "IST" },
          { icon: Cpu,      text: "Mathematical Modeling" },
          { icon: BookOpen, text: "Pune University" },
          { icon: Heart,    text: "Married" },
          { icon: Car,      text: "Travel Enthusiast" },
          { icon: Utensils, text: "Foodie" },
          { icon: Dog,      text: "Doggo Dad" },
        ].map(({ icon: Icon, text }) => (
          <span key={text} className="tag-pill">
            <Icon size={11} className="text-accent flex-shrink-0" />
            <span className="text-xs">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TechArsenal({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-6 h-full flex flex-col">
      <div className="section-label">
        <Layers size={12} className="text-accent" /> My Stack
      </div>
      <h2 className="font-display text-lg font-bold text-white mb-4">Tech Arsenal</h2>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {SKILLS.map((skill, i) => (
          <div key={skill.name} className="skill-chip" style={{ animationDelay: `${i * 50}ms` }}>
            <span className="text-base leading-none">{skill.icon}</span>
            <span className="text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceBar({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover p-6">
      <div className="section-label mb-3">
        <Zap size={12} className="text-accent" /> Experience
      </div>
      <h2 className="font-display text-base font-bold text-white mb-5">Companies I've Worked At</h2>
      <div className="overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <span key={i} className="text-muted font-display font-bold text-lg tracking-wide hover:text-white transition-colors duration-200 cursor-default flex-shrink-0">
              {c.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorksGallery({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-6">
      <div className="section-label mb-1">
        <Code2 size={12} className="text-accent" /> Projects
      </div>
      <h2 className="font-display text-lg font-bold text-white mb-4">Works Gallery</h2>
      <div className="flex flex-col gap-3">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className={`relative rounded-xl bg-gradient-to-br ${p.color} border border-border p-4 h-20 flex items-end overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="absolute top-3 right-3 text-2xl opacity-30 group-hover:opacity-60 transition-opacity">{p.emoji}</div>
            <span className="text-xs font-medium text-gray-200 leading-tight z-10">{p.title}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-6 flex flex-col h-full">
      <div className="section-label mb-1">
        <Star size={12} className="text-accent" /> Testimonials
      </div>
      <h2 className="font-display text-base font-bold text-white mb-4">From People I've Worked With</h2>
      <div className="flex flex-col gap-4 flex-1">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-[#161616] rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-white font-display">{t.name}</p>
                <p className="text-xs text-muted">{t.location}</p>
              </div>
              <span className="text-xs text-muted flex-shrink-0 ml-2">{t.date}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-body">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValuesCard({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-6">
      <div className="section-label mb-1">
        <GitBranch size={12} className="text-accent" /> Values
      </div>
      <h2 className="font-display text-base font-bold text-white mb-4">Principles I Build By</h2>
      <div className="flex flex-col gap-2">
        {VALUES.map(({ name, icon: Icon }) => (
          <div key={name} className="value-item">
            <Icon size={14} className="text-accent flex-shrink-0" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnlinePresence({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-6">
      <div className="section-label mb-1">
        <Globe size={12} className="text-accent" /> Follow Me
      </div>
      <h2 className="font-display text-base font-bold text-white mb-4">Online Presence</h2>
      <div className="flex flex-col gap-2">
        {SOCIALS.map(({ icon: Icon, handle, url }) => (
          <a key={handle} href={url} target="_blank" rel="noopener noreferrer" className="social-link">
            <Icon size={15} className="text-accent flex-shrink-0" />
            <span>{handle}</span>
            <ExternalLink size={11} className="ml-auto text-muted opacity-0 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
}

function GetInTouch({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover p-6 relative overflow-hidden flex flex-col items-center text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-900/20 pointer-events-none" />
      <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 text-2xl">
        👑
      </div>
      <h2 className="font-display text-lg font-bold text-white mb-1">Get in Touch</h2>
      <p className="text-xs text-muted mb-5 font-body">Would Love To Hear From You</p>
      <div className="flex flex-col gap-2 w-full">
        <a
          href="mailto:mamdapureabhishek@gmail.com"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#161616] border border-border rounded-xl text-sm text-gray-300 hover:border-accent hover:text-white transition-all duration-200"
        >
          <Mail size={14} className="text-accent" /> Email Me
        </a>
        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-accent/20 border border-accent/30 rounded-xl text-sm text-white hover:bg-accent/30 transition-all duration-200"
        >
          <Calendar size={14} /> Schedule a Call
        </a>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-bg noise font-body">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-accent opacity-[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-600 opacity-[0.03] rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 py-8">

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[340px_1fr_320px] gap-3">

          {/* ── COL 1 ── */}
          <div className="flex flex-col gap-3">
            <TechArsenal delay={0} />
            <WorksGallery delay={200} />
          </div>

          {/* ── COL 2 ── */}
          <div className="flex flex-col gap-3">
            {/* Stats row */}
            <div className="flex gap-3">
              <StatCard value={11} label="Projects"      delay={100} />
              <StatCard value={6}  label="Companies"     delay={200} />
              <StatCard value={6}  label="Year Expertise" delay={300} />
            </div>

            {/* Hero */}
            <HeroCard delay={150} />

            {/* Experience */}
            <ExperienceBar delay={250} />
          </div>

          {/* ── COL 3 ── */}
          <div className="flex flex-col gap-3">
            <Testimonials delay={200} />
            <ValuesCard   delay={300} />
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_280px_280px] gap-3 mt-3">
          {/* spacer to align with left column width on xl */}
          <div className="hidden xl:block" />
          <OnlinePresence delay={350} />
          <GetInTouch     delay={450} />
        </div>

      </main>
    </div>
  );
}
