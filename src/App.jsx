import { memo, useEffect, useRef, useState } from "react";
import {
  MapPin, Globe, Clock, BookOpen, Heart, Car, Utensils, Dog,
  Mail, Calendar, Download, ExternalLink, Twitter, Instagram, Linkedin,
  Star, Layers, Code2, Cpu, Zap, GitBranch, Shield, Users, Eye, Lightbulb,
  VenetianMask, Sun, Moon, Crown, LifeBuoy, Maximize, Activity, Wrench,
  Flag, Smile, Sparkles, Check, X
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "Python", icon: "🐍" },
  { name: "LLMs / RAGs", icon: "🤖" },
  { name: "AWS", icon: "☁️" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PyTorch", icon: "🔥" },
  { name: "FastAPI", icon: "⚡" },
  { name: "LangChain", icon: "🔗" },
  { name: "Vector DBs", icon: "🧮" },
  { name: "Rest APIs", icon: "🔌" },
  { name: "SQL", icon: "🗄️" },
  { name: "Framer", icon: "✦" },
  { name: "MLOps", icon: "⚙️" },
  { name: "Hugging Face", icon: "🤗" },
  { name: "Agentic AI", icon: "🧠" },
  { name: "Docker", icon: "🐳" },
  { name: "Prompt Eng.", icon: "✍️" },
  { name: "Computer Vision", icon: "👁️" },
  { name: "React & JS", icon: "⚛️" },
];

const VALUES = [
  { name: "Ownership", icon: LifeBuoy },
  { name: "Curiosity", icon: BookOpen },
  { name: "Simplicity", icon: Maximize },
  { name: "Practical Thinking", icon: Activity },
  { name: "Team-First", icon: Wrench },
];

// FIX 4 – updated testimonials list with real data and designations
const TESTIMONIALS = [
  {
    name: "Priyanka Kasture", designation: "Founder Hypd and Marketing Expert", date: "11 Feb 2025",
    text: "Abhishek is hardworking, sharp, and combines strong technical skills with real business sense, a rare and valuable mix.",
  },
  {
    name: "Suvajit Sen", designation: "Data Science Professional @ Diageo", date: "13 May 2021",
    text: "Abhishek worked as an intern in our team in one of the advanced and complex AI project. He has shown great research capability, dedication and positive attitude towards work. Being an intern, how fast he learned the mathematical concepts, AI algorithms and python coding is commendable. His zeal to learn and dedication will be the key to his successful career.",
  },
  {
    name: "Ankita Katre", designation: "Computational Modeling @ Simreka", date: "16 Nov 2020",
    text: "Abhishek is a self-motivated, enthusiastic person and is passionate about his work. He worked with me on an ML project on spam detector during his M.Tech. and during that time I saw his perseverance, positive-attitude and the quality of taking initiatives. He is a team player as well as has inherent qualities of a good leader too.",
  },
  {
    name: "Jitendra Chauhan", designation: "Sr. Program Manager at SPS Commerce | Ex - Amazon", date: "2 Oct 2019",
    text: "I rarely come across real talents who stand out like Abhishek. I had the pleasure of working with him for ~2 years, collaborating on several team projects. Abhishek’s ability to handle multiple tasks was unlike any I’ve seen before and made a dramatic increase in the productivity level. Another quality he holds is, no matter how tense a situation is, he made sure everyone left with a smile. I was always in awe of Abhishek’s ability to command a room and get people on board with ideas – even people who were initially on completely different pages. As a team member or a leader, he earns my highest recommendation.",
  },
];

// FIX 4 – updated project list to use images from public/projects
const PROJECTS = [
  { image: "/projects/1 (1).png" },
  { image: "/projects/2 (1).png" },
  { image: "/projects/3 (1).png" },
  { image: "/projects/4 (1).png" },
  { image: "/projects/5 (1).png" },
  { image: "/projects/6 (1).png" },
];

const COMPANIES = [
  { name: "HYPD", image: "/companies/hypd.png" },
  { name: "Citi", image: "/companies/citi.png" },
  { name: "Pienomial", image: "/companies/pienomial.png" },
  { name: "Affine", image: "/companies/affine.png" },
  { name: "Amazon", image: "/companies/amazon.png" }
];

const SOCIALS = [
  { icon: Twitter, handle: "@afor_abhishek", url: "https://twitter.com/afor_abhishek" },
  { icon: Instagram, handle: "@abhishek.mamdapure", url: "https://instagram.com/abhishek.mamdapure" },
  { icon: Linkedin, handle: "abhishekmamdapure", url: "https://linkedin.com/in/abhishekmamdapure" },
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
  <div className="section-label justify-center">
    <Icon size={11} className="text-accent" /> {text}
  </div>
));

// ─── STAT CARD ────────────────────────────────────────────────────────────

const StatCard = memo(function StatCard({ value, label, delay, icon: Icon }) {
  const n = useCountUp(value, delay);
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card card-hover flex-1 flex flex-col items-center justify-center text-center py-5 xl:py-6 px-2">
      <div className="font-display flex items-center justify-center mb-4 xl:mb-5 mt-2">
        <span className="text-4xl xl:text-[3.5rem] font-bold bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none">{n}</span>
        <span className="text-accent text-3xl xl:text-[2.5rem] font-bold ml-1 leading-none">+</span>
      </div>
      <div className="flex items-center gap-1.5 xl:gap-2 px-2.5 sm:px-4 py-1.5 bg-[#161616] border border-border rounded-full shadow-inner mb-1 max-w-[95%] overflow-hidden">
        {Icon && <Icon size={12} className="text-accent hidden sm:block shrink-0" />}
        <span className="text-[10px] xl:text-xs text-gray-200 font-body font-medium truncate">{label}</span>
      </div>
    </div>
  );
});

// ─── TYPEWRITER ───────────────────────────────────────────────────────────

const Typewriter = memo(function Typewriter({ words, delay = 2000, typingSpeed = 100, deletingSpeed = 50 }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    if (words.length === 0) return;
    const currentWord = words[loopNum % words.length];

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Small pause before typing next word is handled by the initial state of the next cycle
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, delay, typingSpeed, deletingSpeed]);

  return (
    <span className="inline-flex items-center min-w-[110px]">
      {text}
      <span className="animate-pulse ml-[1px] -translate-y-[1px] font-light">|</span>
    </span>
  );
});

// ─── HERO CARD ────────────────────────────────────────────────────────────

// FIX 2 – loads /profile.jpg, falls back to "AM" initials
const HeroCard = memo(function HeroCard({ delay }) {
  const ref = useFadeIn(delay);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div ref={ref} className="card p-5 xl:p-6 relative overflow-hidden h-auto xl:flex-1 xl:min-h-0 flex flex-col group">
      {/* Background glow effect */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-accent opacity-[0.05] rounded-full blur-3xl pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 opacity-[0.03] rounded-full blur-3xl pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />

      {/* Status + Resume row */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161616]/80 backdrop-blur-sm border border-border/80 rounded-full shadow-sm hover:border-accent/30 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot shadow-[0_0_8px_rgba(52,211,113,0.6)]" />
          <span className="text-xs text-gray-300 font-medium tracking-wide">Available To Work</span>
        </div>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-1.5 bg-[#161616]/80 backdrop-blur-sm border border-border/80 rounded-full text-xs text-gray-300 hover:bg-accent/10 hover:border-accent hover:text-white transition-all duration-300 shadow-sm group/btn"
        >
          <span className="font-medium tracking-wide">Resume</span>
          <Download size={13} className="text-accent group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Profile row */}
      <div className="flex items-center gap-5 xl:gap-6 mb-5 relative z-10">
        {/* FIX 2 – photo from public/profile.jpg */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl overflow-hidden border border-accent/30 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]">
            {imgFailed ? (
              <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 text-3xl">AM</span>
            ) : (
              <img
                src="/profile.png"
                alt="Abhishek Mamdapure"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                onError={() => setImgFailed(true)}
              />
            )}
            {/* Inner subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-bg shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-display text-2xl xl:text-[28px] font-bold text-white leading-tight tracking-wide mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
            Abhishek Mamdapure
          </h1>
          <p className="text-gray-400 text-sm xl:text-[15px] font-body flex gap-1.5 items-center bg-black/20 w-fit px-2 py-0.5 rounded-md border border-white/5">
            <span>I'm a</span>
            <span className="text-accent font-semibold tracking-wide">
              <Typewriter words={["Data Scientist", "Developer", "Problem Solver", "AI Engineer"]} />
            </span>
          </p>
        </div>
      </div>

      {/* Short Bio */}
      <div className="relative z-10 mb-5">
        <p className="text-gray-400 text-sm xl:text-[14.5px] leading-relaxed font-body">
          Passionate about crafting intelligent systems and solving complex problems with Artificial Intelligence. Experienced in building scalable ML architectures, Generative AI models, and modern data-driven solutions.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-5 opacity-50" />

      {/* Tags */}
      <div className="inner-scroll relative z-10 flex-1 content-start hidden-scrollbar -mx-1 px-1">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: MapPin, text: "Pune, India" },
            { icon: Globe, text: "English, Hindi & Marathi" },
            { icon: Cpu, text: "Mathematical Modeling" },
            { icon: BookOpen, text: "Pune University" },
            { icon: LifeBuoy, text: "Ex-Amazon" },
            { icon: Car, text: "Travel Enthusiast" },
            { icon: Lightbulb, text: "AI & ML" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="tag-pill flex items-center gap-1.5 px-3 py-1.5 bg-[#161616]/80 border border-white/5 rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 shadow-sm">
              <Icon size={12} className="text-accent/80 flex-shrink-0" />
              <span className="text-[11px] xl:text-xs text-gray-300 font-medium whitespace-nowrap">{text}</span>
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
    <div ref={ref} className="card p-5 xl:p-4 flex flex-col h-[280px] xl:h-auto xl:flex-1 xl:min-h-0">
      <SectionLabel icon={Layers} text="My Stack" />
      <h2 className="font-display text-base font-bold text-white mb-3 tracking-wide text-center">Tech Arsenal</h2>
      <div
        className="flex-1 overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <div className="grid grid-cols-2 gap-1.5 animate-marquee-vertical hover:[animation-play-state:paused] h-max pb-1.5">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <div key={`${s.name}-${i}`} className="skill-chip flex-shrink-0">
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
    <div ref={ref} className="card p-5 xl:p-4 flex flex-col h-[320px] xl:h-auto xl:flex-1 xl:min-h-0">
      <SectionLabel icon={Code2} text="Projects" />
      <h2 className="font-display text-base font-bold text-white mb-3 tracking-wide text-center">Works Gallery</h2>
      <div
        className="flex-1 overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <div className="flex flex-col gap-4 animate-marquee-vertical hover:[animation-play-state:paused] h-max pb-4">
          {[...PROJECTS, ...PROJECTS].map((p, i) => (
            <div
              key={`project-${i}`}
              className="relative rounded-xl border border-border h-28 flex items-center justify-center overflow-hidden group cursor-pointer hover:scale-[1.015] transition-transform duration-200 flex-shrink-0 w-full bg-black/40"
            >
              <img src={p.image} alt={`Project ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── EXPERIENCE BAR ───────────────────────────────────────────────────────

// FIX 4 – marquee scrolls within its own card
const ExperienceBar = memo(function ExperienceBar({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-5 xl:p-6 flex-shrink-0 relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <SectionLabel icon={Zap} text="Experience" />
      <h2 className="font-display text-[15px] font-bold text-white mb-5 tracking-wide text-center">Companies I've Worked At</h2>

      <div className="overflow-hidden relative pb-1">
        {/* Gradients for smooth scroll effect */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#111111] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#111111] to-transparent z-10" />

        <div className="flex gap-12 sm:gap-16 animate-marquee whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <img src={company.image} alt={company.name} className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md" />
            </div>
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
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div ref={ref} className="card p-5 xl:p-4 flex flex-col h-[360px] xl:h-auto xl:flex-1 xl:min-h-0">
        <SectionLabel icon={VenetianMask} text="Testimonials" />
        <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide text-center">From People I've Worked With</h2>
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <div className="flex flex-col gap-2 animate-[marqueeVertical_55s_linear_infinite] hover:[animation-play-state:paused] h-max pb-2">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                onClick={() => setSelected(t)}
                className="bg-[#161616] rounded-xl border border-border p-3 flex-shrink-0 cursor-pointer hover:border-accent hover:bg-[#1a1a1a] transition-all duration-300"
              >
                {t.name && (
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <p className="text-[11px] font-semibold text-white font-display tracking-wide">{t.name}</p>
                      <p className="text-[9px] text-muted leading-tight mt-0.5 max-w-[90%]">{t.designation || t.location}</p>
                    </div>
                    <span className="text-[9px] text-muted ml-2 flex-shrink-0">{t.date}</span>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 leading-normal font-body line-clamp-4">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#111111] border border-accent/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-spring-up cursor-default relative overflow-hidden group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Awesome glowing orb behind text */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent opacity-10 rounded-full blur-[60px] pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-base font-semibold text-white font-display tracking-wide">{selected.name}</p>
                <p className="text-sm text-muted leading-tight mt-1">{selected.designation || selected.location}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white bg-[#1a1a1a] hover:bg-[#252525] p-2 rounded-full border border-border transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-body">{selected.text}</p>
            {selected.date && <span className="text-xs text-muted mt-5 block">{selected.date}</span>}
          </div>
        </div>
      )}
    </>
  );
});

// ─── VALUES ───────────────────────────────────────────────────────────────

const ValuesCard = memo(function ValuesCard({ delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="card p-5 xl:p-4 flex-shrink-0">
      <SectionLabel icon={Star} text="Values" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide text-center">Principles I Build By</h2>
      <div className="flex flex-col gap-1.5">
        {VALUES.map(({ name, icon: Icon }) => (
          <div key={name} className="value-item group">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Icon size={14} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-medium">{name}</span>
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
    <div ref={ref} className="card p-5 xl:p-4 flex-shrink-0">
      <SectionLabel icon={Sun} text="Follow Me" />
      <h2 className="font-display text-sm font-bold text-white mb-3 tracking-wide text-center">Online Presence</h2>
      <div className="flex flex-col gap-1.5">
        {SOCIALS.map(({ icon: Icon, handle, url }) => (
          <a key={handle} href={url} target="_blank" rel="noopener noreferrer" className="social-link group">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Icon size={14} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-medium">{handle}</span>
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
  const [copied, setCopied] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setIsLightMode(document.documentElement.classList.contains("light-mode"));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("mamdapureabhishek@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("light-mode");
    setIsLightMode(!isLightMode);
  };

  return (
    <div ref={ref} className="card card-hover p-5 xl:p-4 relative overflow-hidden flex flex-col items-center justify-center text-center h-[260px] xl:h-auto xl:flex-1 xl:min-h-0 mt-auto xl:mt-0">
      <button
        onClick={toggleTheme}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-[#161616] border border-border text-gray-400 hover:text-white hover:border-accent transition-all duration-200 z-20"
        title="Toggle Theme"
      >
        {isLightMode ? <Moon size={12} /> : <Sun size={12} />}
      </button>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-900/20 pointer-events-none" />
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 z-10">
        <Crown size={20} className="text-accent" />
      </div>
      <h2 className="font-display text-base font-bold text-white mb-0.5 tracking-wide z-10">Get in Touch</h2>
      <p className="text-[11px] text-muted mb-4 font-body z-10">Would Love To Hear From You</p>
      <div className="flex flex-col gap-2 w-full z-10">
        <button
          onClick={handleCopy}
          className="group flex items-center justify-center gap-2 px-3 py-2.5 bg-[#161616] border border-border rounded-xl text-xs text-gray-300 hover:border-accent hover:text-white transition-all duration-200"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Mail size={14} className="text-accent" />}
          <span className="group-hover:hidden">{copied ? "Copied!" : "Email Me"}</span>
          <span className="hidden group-hover:inline text-[10px]">{copied ? "Copied to Clipboard" : "mamdapureabhishek@gmail.com"}</span>
        </button>
        <a
          href="https://calendly.com/mamdapureabhishek/30-min-discussion-with-abhishek-mamdapure"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#161616] border border-border rounded-xl text-xs text-gray-300 hover:border-accent hover:text-white transition-all duration-200"
        >
          <Calendar size={14} className="text-accent" /> Schedule a Call
        </a>
      </div>
    </div>
  );
});

// ─── APP ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    // Responsive root container
    <div className="min-h-screen xl:h-screen xl:overflow-hidden bg-bg noise font-body flex flex-col relative w-full overflow-x-hidden">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[30%] w-[500px] h-[500px] bg-accent opacity-[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[350px] h-[350px] bg-purple-600 opacity-[0.03] rounded-full blur-[80px]" />
      </div>

      <main className="relative z-10 flex-1 p-3 md:p-5 mx-auto w-full max-w-7xl xl:max-w-[1700px] xl:min-h-0 overflow-y-auto inner-scroll xl:overflow-visible flex flex-col">
        <div className="flex flex-col lg:grid gap-3 md:gap-4 xl:gap-4 flex-1 xl:h-full lg:grid-cols-2 xl:grid-cols-[300px_minmax(0,1fr)_300px_250px]">

          {/* ── COL 1: Stack + Projects ── */}
          <div className="order-2 lg:order-1 flex flex-col gap-3 md:gap-4 xl:gap-4 xl:min-h-0">
            <TechArsenal delay={0} />
            <WorksGallery delay={120} />
          </div>

          {/* ── COL 2: Stats + Hero + Experience ── */}
          <div className="order-1 lg:order-2 flex flex-col gap-3 md:gap-4 xl:gap-4 xl:min-h-0">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <StatCard value={11} label="Projects" delay={80} icon={Flag} />
              <StatCard value={6} label="Companies" delay={160} icon={Smile} />
              <StatCard value={6} label="Year Expertise" delay={240} icon={Sparkles} />
            </div>

            <HeroCard delay={120} />
            <ExperienceBar delay={200} />
          </div>

          {/* ── COL 3: Testimonials + Online Presence ── */}
          <div className="order-3 flex flex-col gap-3 md:gap-4 xl:gap-4 xl:min-h-0">
            <Testimonials delay={160} />
            <OnlinePresence delay={280} />
          </div>

          {/* ── COL 4: Values + Get in Touch ── */}
          <div className="order-4 flex flex-col gap-3 md:gap-4 xl:gap-4 xl:min-h-0">
            <ValuesCard delay={200} />
            <GetInTouch delay={360} />
          </div>

        </div>
      </main>
    </div>
  );
}
