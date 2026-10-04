"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Zap,
  BarChart3,
  Layers,
  Code2,
  Terminal,
  Database,
  Cloud,
  BrainCircuit,
  MessageSquare,
  Award,
  Target,
  Headphones,
  Check,
  Star,
  Radio,
  Menu,
  X,
  Flame,
  Activity,
  Cpu,
  ShieldCheck,
  Home,
  Orbit,
  Box,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FourDCanvas from "@/components/FourDCanvas";
import FourDCard from "@/components/FourDCard";

// --- HAPTIC FEEDBACK ---
const triggerHaptic = (pattern = 30) => {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

// --- 4D SPATIAL FADE IN MOTION COMPONENT ---
const FadeIn = ({ children, delay = 0, yOffset = 25, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset, scale: 0.96 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- 6 DISTINCT DOMAIN PRACTICE TRACKS ---
const INTERVIEW_TRACKS = [
  {
    title: "Full-Stack Web Engineering",
    abbreviation: "FS-ENG",
    subtitle: "React, Next.js, TypeScript, Node.js, GraphQL & High-Scale Frontend",
    icon: Code2,
    accent: "text-[#D4FF00]",
    border: "group-hover:border-[#D4FF00]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(212,255,0,0.25)]",
    tag: "High Demand",
    tagStyle: "bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/30",
    skills: ["State Machines", "React Server Components", "Web Vitals", "API Architecture", "Concurrency"],
  },
  {
    title: "AI, ML & Neural Architectures",
    abbreviation: "AI-ML",
    subtitle: "PyTorch, Large Language Models, RAG Pipelines, Vector Search & Embeddings",
    icon: BrainCircuit,
    accent: "text-[#FF5722]",
    border: "group-hover:border-[#FF5722]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(255,87,34,0.25)]",
    tag: "Hot 2026",
    tagStyle: "bg-[#FF5722]/10 text-[#FF5722] border-[#FF5722]/30",
    skills: ["Transformers", "Fine-Tuning", "Vector DBs", "Inference Optimization", "Python Core"],
  },
  {
    title: "Cloud & Scalable DevOps",
    abbreviation: "DEVOPS",
    subtitle: "Kubernetes, Docker, AWS Infrastructure, Terraform & Zero-Downtime CI/CD",
    icon: Cloud,
    accent: "text-[#FFC700]",
    border: "group-hover:border-[#FFC700]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(255,199,0,0.25)]",
    tag: "Staff Track",
    tagStyle: "bg-[#FFC700]/10 text-[#FFC700] border-[#FFC700]/30",
    skills: ["K8s Mesh", "Terraform IaC", "Chaos Engineering", "Observability", "Cloud Security"],
  },
  {
    title: "System Design & Distributed Scalability",
    abbreviation: "SYS-DES",
    subtitle: "High Availability, Event-Driven Queues, Sharding, Caching & CAP Theorem",
    icon: Layers,
    accent: "text-[#00E5FF]",
    border: "group-hover:border-[#00E5FF]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(0,229,255,0.25)]",
    tag: "Principal Level",
    tagStyle: "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30",
    skills: ["Rate Limiters", "Distributed Locks", "Consistent Hashing", "Database Sharding", "Write-Back Caching"],
  },
  {
    title: "Low-Latency Backend Systems",
    abbreviation: "LOW-LAT",
    subtitle: "Go, Rust, Java Concurrency, Memory Optimization & gRPC Protocols",
    icon: Terminal,
    accent: "text-[#00FF88]",
    border: "group-hover:border-[#00FF88]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(0,255,136,0.25)]",
    tag: "Core Engineering",
    tagStyle: "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30",
    skills: ["Goroutines & Mutex", "Zero-Copy I/O", "SQL Index Tuning", "Protobuf / gRPC", "Socket Streams"],
  },
  {
    title: "Behavioral, Leadership & HR",
    abbreviation: "STAR-HR",
    subtitle: "STAR Method, Conflict Resolution, Culture Alignment & Executive Pitching",
    icon: MessageSquare,
    accent: "text-[#E024C3]",
    border: "group-hover:border-[#E024C3]/60",
    glow: "group-hover:shadow-[0_0_35px_rgba(224,36,195,0.25)]",
    tag: "Crucial for Offers",
    tagStyle: "bg-[#E024C3]/10 text-[#E024C3] border-[#E024C3]/30",
    skills: ["STAR Framework", "Cross-Team Negotiation", "Difficult Feedback", "Strategic Prioritization", "Salary Negotiation"],
  },
];

// --- 4 STEP GUIDED PROCESS ---
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Target Your Domain & Seniority",
    desc: "Pick from 50+ specialized engineering tracks or customize your interview prompt to your exact target resume and job description.",
    icon: Target,
    color: "text-[#D4FF00] border-[#D4FF00]/40 bg-[#D4FF00]/10",
  },
  {
    num: "02",
    title: "Natural Voice Conversation via WebRTC",
    desc: "Speak naturally using your laptop microphone. Our low-latency voice AI listens, asks clarifying follow-ups, and adapts to your answers in real time.",
    icon: Headphones,
    color: "text-[#FF5722] border-[#FF5722]/40 bg-[#FF5722]/10",
  },
  {
    num: "03",
    title: "Deep Speech & Logic Evaluation",
    desc: "Advanced neural evaluators score technical accuracy, architectural depth, speech cadence, hesitations, and confidence markers.",
    icon: Zap,
    color: "text-[#FFC700] border-[#FFC700]/40 bg-[#FFC700]/10",
  },
  {
    num: "04",
    title: "Comprehensive Radar Scorecard",
    desc: "Download actionable suggestions, radar metrics, executive 3-line summaries, and personalized practice drills to guarantee offer readiness.",
    icon: Award,
    color: "text-[#E024C3] border-[#E024C3]/40 bg-[#E024C3]/10",
  },
];

// --- TESTIMONIALS ---
const TESTIMONIALS = [
  {
    name: "Maya Lin",
    role: "Staff AI Engineer",
    company: "Offer from Anthropic",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    quote: "The 4D voice simulation feels frighteningly realistic. Having to articulate complex distributed systems out loud under realistic time limits completely cured my interview freeze.",
    badge: "AI & ML Track",
    stars: 5,
  },
  {
    name: "Devon Chen",
    role: "Senior Full-Stack Architect",
    company: "Offer from Stripe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    quote: "The rubric scorecard pointed out that while my code logic was solid, my pacing was rushed. Practicing 4 sessions got me a $65k compensation increase in my final offer.",
    badge: "Full-Stack Track",
    stars: 5,
  },
  {
    name: "Aaliyah Taylor",
    role: "Lead DevOps Specialist",
    company: "Offer from Datadog",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    quote: "Unlike flashcards or leetcode typing, the real-time speech dialogue forced me to structure my thoughts using STAR and clear architectural tradeoffs. Unmatched tool.",
    badge: "Cloud Track",
    stars: 5,
  },
];

// --- FAQ ACCORDION ---
const FAQS = [
  {
    q: "How does the real-time AI voice interviewer work in 4D space?",
    a: "CareerTalk AI establishes a bidirectional WebRTC audio connection with sub-500ms voice streaming. It analyzes your spoken answers in real-time, understands technical nuance, and responds dynamically with natural conversational cadence.",
  },
  {
    q: "Can I practice for specific tech stacks or my own job description?",
    a: "Yes! You can choose from dozens of pre-configured tracks (React, Next.js, Node.js, Python, AWS, Kubernetes, System Design, etc.) or input your exact target company, role, and requirements for a completely tailored session.",
  },
  {
    q: "What equipment do I need?",
    a: "Just a standard laptop or desktop computer with a functioning microphone and browser. No special hardware, downloads, or extensions are needed.",
  },
  {
    q: "How does the scoring rubric evaluate my responses?",
    a: "At the end of your session, your voice transcript is evaluated across 6 core competencies: Technical Accuracy, Communication Clarity, Problem Solving Structure, Experience Relevance, Behavioral Alignment, and Analysis Depth. You receive an overall score out of 100 with clear, actionable improvement drills.",
  },
  {
    q: "Is my session data and audio private?",
    a: "100% private and secure. All session transcripts and scorecards are encrypted and stored solely in your personal candidate account. We never share or sell your audio data.",
  },
];

export default function CareerMockLanding() {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const handleNavigate = (path) => {
    triggerHaptic(40);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F3F4F6] font-sans antialiased relative selection:bg-[#D4FF00] selection:text-black overflow-x-hidden">
      
      {/* --- 4D SPATIAL TESSERACT CANVAS BACKGROUND --- */}
      <FourDCanvas />

      {/* --- SLEEK 4D GLASS NAVIGATION BAR (CLEAN BRAND - 4D VOICE BADGE REMOVED) --- */}
      <nav className="fixed top-0 z-[100] w-full bg-[#07080B]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 lg:px-8">
          
          {/* Brand Logo & Name (Cleaned up) */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }} 
              transition={{ duration: 0.6 }}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4FF00] via-[#FF5722] to-[#E024C3] p-[1.5px] shadow-[0_0_25px_rgba(212,255,0,0.4)]"
            >
              <div className="w-full h-full bg-[#0B0D12] rounded-[10px] flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="CareerTalk AI Logo" width={26} height={26} className="object-contain" priority />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
                CareerTalk <span className="text-[#D4FF00]">AI</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Real-Time Mock Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links — WITH "HOME" OPTION */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-zinc-300">
            <a 
              href="#" 
              className="flex items-center gap-1.5 text-[#D4FF00] font-black transition-colors hover:drop-shadow-[0_0_10px_rgba(212,255,0,0.5)]"
            >
              <Home size={16} />
              <span>Home</span>
            </a>
            <a href="#voice-engine" className="hover:text-[#D4FF00] transition-colors">Voice Engine</a>
            <a href="#tracks" className="hover:text-[#D4FF00] transition-colors">Practice Tracks</a>
            <a href="#how-it-works" className="hover:text-[#D4FF00] transition-colors">How It Works</a>
            <a href="#analytics" className="hover:text-[#D4FF00] transition-colors">Scorecards</a>
            <a href="#testimonials" className="hover:text-[#D4FF00] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#D4FF00] transition-colors">FAQ</a>
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => handleNavigate("/login")}
              className="text-sm font-bold text-zinc-200 hover:text-white hover:bg-white/10 rounded-full px-5 h-11 transition-all"
            >
              Sign In
            </Button>
            <Button
              onClick={() => handleNavigate("/login")}
              className="relative group rounded-full px-6 h-11 font-black text-sm bg-[#D4FF00] hover:bg-[#E2FE52] text-black shadow-[0_0_30px_rgba(212,255,0,0.4)] active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Start Free Mock</span>
              <ArrowRight size={16} className="text-black group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#07080B]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 text-base font-semibold text-zinc-300">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-[#D4FF00] font-black flex items-center gap-2 py-1">
                  <Home size={18} /> Home
                </a>
                <a href="#voice-engine" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">Voice Engine</a>
                <a href="#tracks" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">Practice Tracks</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">How It Works</a>
                <a href="#analytics" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">Scorecards</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">Reviews</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF00] py-1">FAQ</a>
              </div>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Button onClick={() => handleNavigate("/login")} variant="outline" className="w-full border-white/20 text-white rounded-xl">
                  Sign In
                </Button>
                <Button onClick={() => handleNavigate("/login")} className="w-full bg-[#D4FF00] text-black font-black rounded-xl shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                  Start Free Mock
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ========================================================================= */}
      {/* 🌟 STARTING SECTION OF THE UI: [IMAGE ON LEFT] ➔ [HERO CONTENT ON RIGHT]  */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="relative pt-32 sm:pt-40 pb-20 px-6 lg:px-8 z-10 overflow-hidden border-b border-white/10">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* 🖼️ HERO IMAGE ON THE LEFT (REQUESTED) */}
            <FadeIn className="lg:col-span-6">
              <FourDCard>
                <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#D4FF00]/30 via-[#FF5722]/20 to-[#E024C3]/30 border border-white/20 shadow-[0_20px_80px_rgba(212,255,0,0.25)]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] w-full bg-[#0E1015] group">
                    <Image
                      src="/neo_hero_voice.jpg"
                      alt="CareerTalk AI Live Mock Interview Simulator"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Floating Active Status Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#07080B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4FF00]/40 text-white text-xs font-bold shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
                      <span className="text-[#D4FF00]">Live 4D AI Voice Stream Active</span>
                    </div>

                    <div className="hidden sm:flex absolute bottom-4 right-4 items-center gap-3 bg-[#07080B]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-white text-xs font-medium shadow-2xl">
                      <div className="w-8 h-8 rounded-xl bg-[#FF5722]/20 border border-[#FF5722]/40 flex items-center justify-center text-[#FF5722]">
                        <Mic size={16} className="animate-bounce" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-white">Voice & Tone: <span className="text-[#D4FF00]">98.7% Confident</span></p>
                        <p className="text-[11px] text-zinc-400">Zero lag • Natural conversational feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FourDCard>
            </FadeIn>

            {/* 📝 HERO HEADLINE, DETAILS & ACTIONS ON THE RIGHT */}
            <FadeIn delay={0.2} className="lg:col-span-6 text-left space-y-6">
              
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/40 text-[#D4FF00] text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(212,255,0,0.2)]">
                <Flame size={15} className="text-[#FF5722] animate-bounce" />
                <span>Next-Gen AI Voice Mock Interviews • Instant 360° Scoring</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-white">
                Crush Your Tech Interview with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-[#FF8008] to-[#FF5722] drop-shadow-[0_0_35px_rgba(212,255,0,0.35)]">
                  Autonomous Voice AI
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed font-normal">
                Simulate realistic spoken technical, behavioral, and system design drills with an intelligent voice AI. Get instant rubric scores, tone metrics, and actionable improvement roadmaps.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Button
                  onClick={() => handleNavigate("/login")}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#D4FF00] hover:bg-[#E5FF4D] text-black font-black text-base shadow-[0_10px_35px_rgba(212,255,0,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <span>Start Practicing Free</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>

                <a
                  href="#tracks"
                  onClick={() => triggerHaptic()}
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#141720]/90 hover:bg-[#1C202E] border border-[#FF5722]/50 text-white font-bold text-base shadow-sm transition-all hover:border-[#FF5722] flex items-center justify-center gap-2.5"
                >
                  <Layers size={16} className="text-[#FF5722]" />
                  <span>Explore Practice Tracks</span>
                </a>
              </div>

              {/* Quick Metrics Strip in 2x2 Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 text-center">
                  <p className="text-xl sm:text-2xl font-black text-white">50k+</p>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Sessions</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#D4FF00]">98.4%</p>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Confidence</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#FF5722]">&lt;420ms</p>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Latency</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#E024C3]">Top 1%</p>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider mt-0.5">Hire Match</p>
                </div>
              </div>

            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* --- LOGO MARQUEE --- */}
      <section className="py-10 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-6">
            Engineers & Students Prepared for Leading Global Tech Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="h-8 flex items-center"><Image src="/clientLogos/Google.png" alt="Google" width={100} height={32} className="h-7 w-auto object-contain brightness-200" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/Wipro.svg" alt="Wipro" width={90} height={32} className="h-7 w-auto object-contain brightness-200" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/tata.png" alt="Tata" width={85} height={32} className="h-7 w-auto object-contain brightness-200" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/techmahindra.png" alt="Tech Mahindra" width={120} height={32} className="h-7 w-auto object-contain brightness-200" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/teleperformance.png" alt="Teleperformance" width={130} height={32} className="h-7 w-auto object-contain brightness-200" /></div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4D SHOWCASE BLOCK 1: [PICTURE ON LEFT] ➔ [ABBREVIATIONS ON RIGHT]     */}
      {/* ========================================================================= */}
      <section id="voice-engine" className="py-24 px-6 lg:px-8 relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: 4D TILT PICTURE MOCKUP */}
            <FadeIn className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#D4FF00]/30 via-[#FF5722]/20 to-[#E024C3]/30 border border-white/20 shadow-[0_20px_70px_rgba(212,255,0,0.22)]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-[#0A0C12] group">
                    <Image
                      src="/neo_hero_voice.jpg"
                      alt="CareerTalk AI Voice Engine"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#07080B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4FF00]/40 text-white text-xs font-bold shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
                      <span className="text-[#D4FF00]">WebRTC Audio Engine</span>
                    </div>
                  </div>
                </div>
              </FourDCard>
            </FadeIn>

            {/* RIGHT SIDE: ABBREVIATIONS & ARCHITECTURE SPECS */}
            <FadeIn delay={0.2} className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                <Cpu size={14} /> 4D Voice Engine
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Low-Latency WebRTC Speech Intelligence
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Engage in an authentic, bidirectional spoken dialogue. Our neural voice architecture handles complex technical explanations, interruptibility, and live tone analysis in real time.
              </p>

              {/* ABBREVIATION LIST (RIGHT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "WebRTC",
                    title: "Sub-420ms Audio Mesh",
                    desc: "Real-time bidirectional audio streaming without awkward pauses or delays.",
                    color: "text-[#D4FF00] bg-[#D4FF00]/10 border-[#D4FF00]/30",
                  },
                  {
                    abbr: "VAD",
                    title: "Voice Activity Detection",
                    desc: "Intelligently senses speech pauses, natural pauses, and conversational pacing.",
                    color: "text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/30",
                  },
                  {
                    abbr: "STT/TTS",
                    title: "Deepgram & Neural Voices",
                    desc: "Precision engineering transcription and natural vocal synthesis.",
                    color: "text-[#FFC700] bg-[#FFC700]/10 border-[#FFC700]/30",
                  },
                  {
                    abbr: "PROCTOR",
                    title: "Hardware & Focus Lock",
                    desc: "Fullscreen security verification, mic validation, and anti-cheat protection.",
                    color: "text-[#E024C3] bg-[#E024C3]/10 border-[#E024C3]/30",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3.5 rounded-2xl bg-[#0F121A] border border-white/10 hover:border-white/25 transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => handleNavigate("/login")}
                  className="h-12 px-7 rounded-xl bg-[#D4FF00] hover:bg-[#E2FE52] text-black font-black text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] flex items-center gap-2"
                >
                  <span>Launch Live Voice Room</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4D SHOWCASE BLOCK 2: [ABBREVIATIONS ON LEFT] ➔ [PICTURE ON RIGHT]     */}
      {/* ========================================================================= */}
      <section id="tracks" className="py-24 px-6 lg:px-8 bg-[#090B10] relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* LEFT SIDE: ABBREVIATIONS & DOMAIN SPECIALIZATIONS */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/30 shadow-[0_0_15px_rgba(255,87,34,0.2)]">
                <Layers size={14} /> Specialized Curriculums
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                6 Tailored Tracks for Every Discipline
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Choose your exact engineering domain. Each track contains industry-calibrated question banks and rubric benchmarks tailored for junior to staff levels.
              </p>

              {/* ABBREVIATION LIST (LEFT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "FS-ENG",
                    title: "Full-Stack & Web Systems",
                    desc: "React, Next.js, TypeScript, Node.js, GraphQL & DOM performance.",
                    color: "text-[#D4FF00] bg-[#D4FF00]/10 border-[#D4FF00]/30",
                  },
                  {
                    abbr: "AI-ML",
                    title: "Machine Learning & Neural LLMs",
                    desc: "PyTorch, Transformers, RAG Pipelines, Vector DBs & Quantization.",
                    color: "text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/30",
                  },
                  {
                    abbr: "DEVOPS",
                    title: "Cloud & Scalable DevOps",
                    desc: "Kubernetes, Docker, AWS Infrastructure, Terraform & CI/CD.",
                    color: "text-[#FFC700] bg-[#FFC700]/10 border-[#FFC700]/30",
                  },
                  {
                    abbr: "SYS-DES",
                    title: "Distributed System Design",
                    desc: "Sharding, High Availability, Caching, CAP Theorem & Event Queues.",
                    color: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 hover:border-white/25 transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>
            </FadeIn>

            {/* RIGHT SIDE: 4D TILT PICTURE SHOWCASE */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] w-full border border-white/20 shadow-[0_20px_70px_rgba(255,87,34,0.22)] group">
                  <Image
                    src="/neo_tracks.jpg"
                    alt="CareerTalk AI Practice Tracks"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </FourDCard>
            </FadeIn>
          </div>

          {/* Track Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERVIEW_TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <FourDCard>
                    <div className={`p-8 rounded-3xl bg-[#0F121A] border border-white/10 ${track.border} ${track.glow} transition-all duration-300 h-full flex flex-col justify-between shadow-xl`}>
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 ${track.accent} group-hover:scale-110 transition-transform`}>
                            <Icon size={24} />
                          </div>
                          <span className={`text-[11px] font-bold font-mono px-3 py-1 rounded-full border ${track.tagStyle}`}>
                            {track.abbreviation} • {track.tag}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#D4FF00] transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                          {track.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {track.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-zinc-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleNavigate("/login")}
                        className="w-full h-11 rounded-xl bg-white/5 hover:bg-[#D4FF00] hover:text-black text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <span>Practice {track.abbreviation}</span>
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </FourDCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (4 STEPS) --- */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#FFC700]/10 text-[#FFC700] border border-[#FFC700]/30 mb-4 shadow-[0_0_15px_rgba(255,199,0,0.2)]">
                <Activity size={14} /> 4D Step Journey
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                How CareerTalk AI Prepares You
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg">
                Go from interview anxiety to an offer-ready candidate in 4 easy steps.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <FourDCard>
                    <div className="p-8 rounded-3xl bg-[#0F121A] border border-white/10 h-full flex flex-col justify-between relative group hover:border-[#D4FF00]/60 transition-all shadow-xl">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-4xl font-black font-mono text-[#D4FF00]">
                            {step.num}
                          </span>
                          <div className={`p-3 rounded-2xl border ${step.color}`}>
                            <Icon size={20} />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </FourDCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4D SHOWCASE BLOCK 3: [PICTURE ON LEFT] ➔ [ABBREVIATIONS ON RIGHT]     */}
      {/* ========================================================================= */}
      <section id="analytics" className="py-24 px-6 lg:px-8 bg-[#090B10] border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: 4D TILT PICTURE SHOWCASE */}
            <FadeIn className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] w-full border border-white/20 shadow-[0_20px_70px_rgba(212,255,0,0.22)] group">
                  <Image
                    src="/neo_analytics.jpg"
                    alt="CareerTalk AI Comprehensive Feedback Dashboard"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </FourDCard>
            </FadeIn>

            {/* RIGHT SIDE: ABBREVIATIONS & SCORECARD BREAKDOWN */}
            <FadeIn delay={0.2} className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                <BarChart3 size={14} /> Comprehensive Analytics
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Skill Radar Matrix & Instant Hire Verdicts
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Receive quantifiable data on every practice round. Our AI model provides clear rubrics on technical accuracy, problem-solving cadence, speech fluency, and specific areas for targeted improvement.
              </p>

              {/* ABBREVIATION LIST (RIGHT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "TECH-98%",
                    title: "Technical Precision & Depth",
                    desc: "Evaluates algorithmic complexity, architectural trade-offs, and best practices.",
                    color: "text-[#D4FF00] bg-[#D4FF00]/10 border-[#D4FF00]/30",
                  },
                  {
                    abbr: "FLU-96%",
                    title: "Fluency & Vocal Cadence",
                    desc: "Speech pace, articulation speed, confidence markers, and filler words reduction.",
                    color: "text-[#FF5722] bg-[#FF5722]/10 border-[#FF5722]/30",
                  },
                  {
                    abbr: "STR-95%",
                    title: "Problem Solving Structure",
                    desc: "Systematic formulation, edge-case breakdown, and structured logic steps.",
                    color: "text-[#FFC700] bg-[#FFC700]/10 border-[#FFC700]/30",
                  },
                  {
                    abbr: "VERDICT",
                    title: "Executive Hire Recommendation",
                    desc: "3-line AI summary, hire/no-hire classification, and customized drill roadmaps.",
                    color: "text-[#00FF88] bg-[#00FF88]/10 border-[#00FF88]/30",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3 rounded-2xl bg-[#0F121A] border border-white/10 hover:border-white/25 transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => handleNavigate("/login")}
                  className="h-12 px-7 rounded-xl bg-[#D4FF00] hover:bg-[#E2FE52] text-black font-black text-sm shadow-[0_0_25px_rgba(212,255,0,0.3)] flex items-center gap-2"
                >
                  <span>Experience Scorecard Simulation</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 px-6 lg:px-8 relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#E024C3]/10 text-[#E024C3] border border-[#E024C3]/30 mb-4 shadow-[0_0_15px_rgba(224,36,195,0.2)]">
                <Award size={14} /> Proven Success Stories
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                Engineers Landing Top Offers
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg">
                See how job seekers turned practice sessions into top engineering placements.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <FourDCard>
                  <div className="p-8 rounded-3xl bg-[#0F121A] border border-white/10 h-full flex flex-col justify-between shadow-xl relative hover:border-[#D4FF00]/50 transition-all">
                    <div>
                      <div className="flex items-center gap-1 text-[#FFC700] mb-6">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[#FFC700]" />
                        ))}
                      </div>

                      <p className="text-sm text-zinc-200 leading-relaxed mb-6 italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#D4FF00]/40"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-zinc-400">{t.role}</p>
                        <span className="text-[11px] font-bold text-[#D4FF00]">{t.company}</span>
                      </div>
                    </div>
                  </div>
                </FourDCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 lg:px-8 bg-[#090B10] border-b border-white/10 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 mb-4 shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                <MessageSquare size={14} /> Clear Answers
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <FourDCard>
                    <div className="rounded-2xl bg-[#0F121A] border border-white/10 overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-[#D4FF00] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={20}
                          className={`text-zinc-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 text-[#D4FF00]" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-white/5 pt-4"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FourDCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <FourDCard>
              <div className="relative rounded-[36px] p-10 sm:p-16 bg-gradient-to-r from-[#0F121A] via-[#171D29] to-[#0F121A] border border-[#D4FF00]/50 shadow-[0_20px_80px_rgba(212,255,0,0.25)] overflow-hidden text-center">
                
                {/* 4D Background Glows */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4FF00]/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF5722]/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#D4FF00] font-black text-xs tracking-widest uppercase border border-[#D4FF00]/40 shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                    Ready to Level Up Your Career?
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                    Start Practicing in 4D Voice Space.
                  </h2>
                  <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
                    Join ambitious software engineers, data scientists, and cloud architects crushing their interviews.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      onClick={() => handleNavigate("/login")}
                      size="lg"
                      className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-[#D4FF00] hover:bg-[#E5FF4D] text-black font-black text-base shadow-[0_0_35px_rgba(212,255,0,0.45)] active:scale-95 transition-all"
                    >
                      Start Free AI Voice Mock
                    </Button>
                    <Button
                      onClick={() => handleNavigate("/login")}
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white/5 hover:bg-white/10 border-white/30 text-white font-bold text-base transition-all"
                    >
                      Sign In to Account
                    </Button>
                  </div>
                </div>
              </div>
            </FourDCard>
          </FadeIn>
        </div>
      </section>

      {/* --- CANDIDATE FOOTER --- */}
      <footer className="bg-[#050608] border-t border-white/10 pt-16 pb-12 px-6 lg:px-8 relative z-10 text-zinc-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            
            {/* Col 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="CareerTalk AI" width={32} height={32} />
                <span className="font-black text-lg text-white tracking-tight">CareerTalk <span className="text-[#D4FF00]">AI</span></span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Autonomous conversational voice interview platform empowering job seekers to master technical and behavioral interviews.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[11px] font-bold text-[#D4FF00]">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                All Voice AI Engines Operational
              </div>
            </div>

            {/* Col 2: Practice Tracks */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-zinc-200">Practice Tracks</h5>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#tracks" className="hover:text-[#D4FF00] transition-colors">Full-Stack Web Engineering</a></li>
                <li><a href="#tracks" className="hover:text-[#D4FF00] transition-colors">AI & Machine Learning</a></li>
                <li><a href="#tracks" className="hover:text-[#D4FF00] transition-colors">Cloud & Scalable DevOps</a></li>
                <li><a href="#tracks" className="hover:text-[#D4FF00] transition-colors">System Design Drills</a></li>
                <li><a href="#tracks" className="hover:text-[#D4FF00] transition-colors">Behavioral & STAR Method</a></li>
              </ul>
            </div>

            {/* Col 3: Platform */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-zinc-200">Platform</h5>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:text-[#D4FF00] transition-colors">Home Portal</a></li>
                <li><a href="#voice-engine" className="hover:text-[#D4FF00] transition-colors">Voice Engine Architecture</a></li>
                <li><a href="#how-it-works" className="hover:text-[#D4FF00] transition-colors">Assessment Methodology</a></li>
                <li><a href="#analytics" className="hover:text-[#D4FF00] transition-colors">Instant Scorecards</a></li>
                <li><a href="#testimonials" className="hover:text-[#D4FF00] transition-colors">Candidate Reviews</a></li>
                <li><Link href="/login" className="hover:text-[#D4FF00] transition-colors">Candidate Sign In</Link></li>
              </ul>
            </div>

            {/* Col 4: Engineering Team */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-zinc-200">Engineering Team</h5>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-medium">
                <li className="text-white font-bold">Nischith Gowda R</li>
                <li>Manohar VM</li>
                <li>Chandrashekara VR</li>
                <li>Punith GG</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
            <p>© 2026 CareerTalk AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
              <Link href="/login" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
              <Link href="/login" className="hover:text-zinc-300 transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}