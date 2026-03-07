import { memo, useEffect, useRef, useState } from "react";
import {
  MapPin, Globe, Clock, BookOpen, Heart, Car, Utensils, Dog,
  Mail, Calendar, Download, ExternalLink, Twitter, Instagram, Linkedin,
  Star, Layers, Code2, Cpu, Zap, GitBranch, Shield, Users, Eye, Lightbulb,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

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
  { name: "Framer",      icon: "✦"  },
  { name: "MLOps",       icon: "⚙️" },
];

const VALUES = [
  { name: "Ownership",          icon: Shield   },
  { name: "Curiosity",          icon: Eye      },
  { name: "Simplicity",         icon: Layers   },
  { name: "Practical Thinking", icon: Lightbulb},
  { name: "Team-First",         icon: Users    },
];

// FIX 4 – added extra testimonial visible in the reference screenshot
const TESTIMONIALS = [
  {
    name: null, location: null, date: null,
    text: "Abhishek is a standout talent, skilled, dependable, and someone who can lead, collaborate, and lift an entire team effortlessly.",
  },
  {
    name: "Priyanka Kasture", location: "Pune, India", date: "11. Feb 2025",
    text: "Abhishek is hardworking, sharp, and combines strong technical skills with real business sense — a rare and valuable mix.",
  },
  {
    name: "Ankita Katre", location: "Pune, India", date: "16. Nov 2020",
    text: "Working with Abhishek is always a great experience. He brings clarity to complex problems and always delivers with precision.",
  },
];

// FIX 4 – updated project list to match reference screenshot
const PROJECTS = [
  { title: "Embeddings-Based Search Engine",            color: "from-violet-900  to-indigo-900",  emoji: "🔍" },
  { title: "Medical NLP Entity Extraction System",      color: "from-fuchsia-900 to-pink-900",    emoji: "🏥" },
  { title: "AI Chatbot for Contextual Graphs & Plots",  color: "from-rose-900    to-pink-800",    emoji: "💬" },
  { title: "Life Science AI Platform",                  color: "from-emerald-900 to-teal-900",    emoji: "🧬" },
];

const COMPANIES = ["HYPD", "citi", "Spienomial", "AFFINE", "amazon"];

const SOCIALS = [
  { icon: Twitter,   handle: "@afor_abhishek",      url: "https://twitter.com/afor_abhishek"            },
  { icon: Instagram, handle: "@abhishek.mamdapure",  url: "https://instagram.com/abhishek.mamdapure"     },
  { icon: Linkedin,  handle: "/abhishekmamdapure",   url: "https://linkedin.com/in/abhishekmamdapure"    },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
}

function useCountUp(target, delay = 300) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = null;
    const DURATION = 1600;
    const tid = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / DURATION, 1);
        setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(tid);
  }, [target, delay]);
  return n;
}

// ─── ATOMS ────────────────────────────────────────────────────────────────

const SectionLabel = memo(({ icon: Icon, text }) => (
  <div className="section-label">
    <Icon size={11} className="text-accent" /> {text}
  </div>
));

// ─── STAT CARD ────────────────────────────────────────────────────────────

const StatCard = memo(function StatCard({ value, label, delay }) {
  const n   = useCountUp(value, delay);
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover flex-1 flex flex-col items-center justify-center text-center py-4 px-2">
      <span className="font-display text-4xl font-bold text-white leading-none">
        {n}<span className="text-accent">+</span>
      </span>
      <span className="mt-1.5 text-xs text-muted font-body tracking-wide">{label}</span>
    </div>
  );
});

// ─── HERO CARD ────────────────────────────────────────────────────────────

// FIX 2 – loads /profile.jpg, falls back to "AM" initials
const HeroCard = memo(function HeroCard({ delay }) {
  const ref = useFadeIn(delay);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div ref={ref} className="card p-4 relative overflow-hidden flex-1 min-h-0 flex flex-col">
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-accent opacity-[0.05] rounded-full blur-3xl pointer-events-none" />

      {/* Status + Resume row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-border rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-xs text-gray-300">Available To Work</span>
        </div>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1 bg-[#161616] border border-border rounded-full text-xs text-gray-300 hover:border-accent hover:text-white transition-all duration-200"
        >
          Resume <Download size={11} />
        </a>
      </div>

      {/* Profile row */}
      <div className="flex items-center gap-4 mb-3">
        {/* FIX 2 – photo from public/profile.jpg */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-accent/30 bg-gradient-to-br from-accent/40 to-purple-900/60 flex items-center justify-center">
            {imgFailed ? (
              <span className="font-display font-bold text-white text-xl">AM</span>
            ) : (
              <img
                src="/profile.jpg"
                alt="Abhishek Mamdapure"
                className="w-full h-full object-cover"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-bg" />
        </div>

        <div>
          <h1 className="font-display text-xl font-bold text-white leading-tight tracking-wide">
            Abhishek Mamdapure
          </h1>
          <p className="text-gray-400 text-sm mt-0.5 font-body">
            I'm a{" "}
            <span className="text-accent font-semibold italic bg-accent/10 px-1.5 py-0.5 rounded-md">
              GenAI-Engineer
            </span>
          </p>
        </div>
      </div>

      {/* Tags – FIX 1: uses inner-scroll so they don't push height */}
      <div className="inner-scroll">
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: MapPin,   text: "Pune, India" },
            { icon: Globe,    text: "English, Hindi & Marathi" },
            { icon: Clock,    text: "IST" },
            { icon: Cpu,      text: "Mathematical Modeling & Simulation" },
            { icon: BookOpen, text: "Pune University" },
            { icon: Heart,    text: "Married" },
            { icon: Car,      text: "Travel Enthusiast" },
            { icon: Utensils, text: "Foodie" },
            { icon: Dog,      text: "Doggo Dad" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="tag-pill">
              <Icon size={10} className="text-accent flex-shrink-0" />
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── TECH ARSENAL ─────────────────────────────────────────────────────────

const TechArsenal = memo(function TechArsenal({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4 flex-1 min-h-0 card-scroll">
      <SectionLabel icon={Layers} text="My Stack" />
      <h2 className="font-display text-base font-bold text-white mb-3 tracking-wide">Tech Arsenal</h2>
      {/* FIX 4 – internal scroll so skills don't overflow column */}
      <div className="inner-scroll">
        <div className="grid grid-cols-2 gap-1.5">
          {SKILLS.map((s) => (
            <div key={s.name} className="skill-chip">
              <span className="text-sm leading-none">{s.icon}</span>
              <span className="text-xs">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── WORKS GALLERY ────────────────────────────────────────────────────────

// FIX 4 – projects list scrolls inside the card
const WorksGallery = memo(function WorksGallery({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4 flex-1 min-h-0 card-scroll">
      <SectionLabel icon={Code2} text="Projects" />
      <h2 className="font-display text-base font-bold text-white mb-3 tracking-wide">Works Gallery</h2>
      <div className="inner-scroll flex flex-col gap-2">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className={`relative rounded-xl bg-gradient-to-br ${p.color} border border-border p-3 h-16 flex items-end overflow-hidden group cursor-pointer hover:scale-[1.015] transition-transform duration-200 flex-shrink-0`}
          >
            <div className="absolute top-2 right-2 text-xl opacity-25 group-hover:opacity-50 transition-opacity">{p.emoji}</div>
            <span className="text-xs font-medium text-gray-200 leading-snug z-10">{p.title}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── EXPERIENCE BAR ───────────────────────────────────────────────────────

// FIX 4 – marquee scrolls within its own card
const ExperienceBar = memo(function ExperienceBar({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4">
      <SectionLabel icon={Zap} text="Experience" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide">Companies I've Worked At</h2>
      <div className="overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <span
              key={i}
              className="text-muted font-display font-bold text-base tracking-widest hover:text-white transition-colors duration-200 cursor-default flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────

// FIX 4 – testimonials list scrolls inside the card
const Testimonials = memo(function Testimonials({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4 flex-1 min-h-0 card-scroll">
      <SectionLabel icon={Star} text="Testimonials" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide">From People I've Worked With</h2>
      <div className="inner-scroll flex flex-col gap-2">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-[#161616] rounded-xl border border-border p-3 flex-shrink-0">
            {t.name && (
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <p className="text-xs font-semibold text-white font-display tracking-wide">{t.name}</p>
                  <p className="text-[10px] text-muted">{t.location}</p>
                </div>
                <span className="text-[10px] text-muted ml-2 flex-shrink-0">{t.date}</span>
              </div>
            )}
            <p className="text-xs text-gray-400 leading-relaxed font-body italic">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── VALUES ───────────────────────────────────────────────────────────────

const ValuesCard = memo(function ValuesCard({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4">
      <SectionLabel icon={GitBranch} text="Values" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide">Principles I Build By</h2>
      <div className="flex flex-col gap-1.5">
        {VALUES.map(({ name, icon: Icon }) => (
          <div key={name} className="value-item">
            <Icon size={13} className="text-accent flex-shrink-0" />
            <span className="text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── ONLINE PRESENCE ──────────────────────────────────────────────────────

const OnlinePresence = memo(function OnlinePresence({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-4">
      <SectionLabel icon={Globe} text="Follow Me" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide">Online Presence</h2>
      <div className="flex flex-col gap-1.5">
        {SOCIALS.map(({ icon: Icon, handle, url }) => (
          <a key={handle} href={url} target="_blank" rel="noopener noreferrer" className="social-link group">
            <Icon size={13} className="text-accent flex-shrink-0" />
            <span className="text-xs">{handle}</span>
            <ExternalLink size={10} className="ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
});

// ─── GET IN TOUCH ─────────────────────────────────────────────────────────

const GetInTouch = memo(function GetInTouch({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover p-4 relative overflow-hidden flex flex-col items-center text-center flex-1">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-900/20 pointer-events-none" />
      <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-3 text-xl z-10">
        👑
      </div>
      <h2 className="font-display text-base font-bold text-white mb-0.5 tracking-wide z-10">Get in Touch</h2>
      <p className="text-[11px] text-muted mb-4 font-body z-10">Would Love To Hear From You</p>
      <div className="flex flex-col gap-2 w-full z-10">
        <a
          href="mailto:mamdapureabhishek@gmail.com"
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#161616] border border-border rounded-xl text-xs text-gray-300 hover:border-accent hover:text-white transition-all duration-200"
        >
          <Mail size={12} className="text-accent" /> Email Me
        </a>
        <a
          href="https://cal.com/abhishek-mamdapure"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-accent/20 border border-accent/30 rounded-xl text-xs text-white hover:bg-accent/30 transition-all duration-200"
        >
          <Calendar size={12} /> Schedule a Call
        </a>
      </div>
    </div>
  );
});

// ─── APP ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    // FIX 1 – h-screen + overflow-hidden locks the whole page to one viewport
    <div className="h-screen overflow-hidden bg-bg noise font-body flex flex-col">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[30%] w-[500px] h-[500px] bg-accent opacity-[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[350px] h-[350px] bg-purple-600 opacity-[0.03] rounded-full blur-[80px]" />
      </div>

      {/*
        FIX 1 – flex-1 + min-h-0 ensures the grid fills remaining height
        without pushing the page taller than 100vh.

        FIX 4 – 4-column layout matching the reference screenshot:
          [Tech Arsenal + Works Gallery] | [Stats + Hero + Experience] | [Testimonials] | [Values + Presence + Touch]
      */}
      <main className="relative z-10 flex-1 min-h-0 p-3">
        <div
          className="h-full grid gap-3"
          style={{ gridTemplateColumns: "280px minmax(0,1fr) 280px 230px" }}
        >

          {/* ── COL 1: Stack + Projects ── */}
          <div className="flex flex-col gap-3 min-h-0">
            <TechArsenal  delay={0}   />
            <WorksGallery delay={120} />
          </div>

          {/* ── COL 2: Stats + Hero + Experience ── */}
          <div className="flex flex-col gap-3 min-h-0">
            {/* Stats row */}
            <div className="flex gap-3">
              <StatCard value={11} label="Projects"       delay={80}  />
              <StatCard value={6}  label="Companies"      delay={160} />
              <StatCard value={6}  label="Year Expertise" delay={240} />
            </div>

            <HeroCard      delay={120} />
            <ExperienceBar delay={200} />
          </div>

          {/* ── COL 3: Testimonials ── */}
          <div className="flex flex-col gap-3 min-h-0">
            <Testimonials delay={160} />
          </div>

          {/* ── COL 4: Values + Online Presence + Get in Touch ── */}
          <div className="flex flex-col gap-3 min-h-0">
            <ValuesCard      delay={200} />
            <OnlinePresence  delay={280} />
            <GetInTouch      delay={360} />
          </div>

        </div>
      </main>
    </div>
  );
}
