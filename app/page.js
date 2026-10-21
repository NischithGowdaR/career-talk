"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Compass,
  Laptop,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// --- 6 VIBRANT SPECIALIZED PRACTICE TRACKS ---
const INTERVIEW_TRACKS = [
  {
    title: "Full-Stack Web Engineering",
    abbreviation: "FS-ENG",
    subtitle: "React, Next.js, TypeScript, Node.js, GraphQL & High-Scale Frontend",
    icon: Code2,
    accent: "text-blue-600",
    border: "group-hover:border-blue-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.12)]",
    cardBg: "from-blue-50/70 via-white to-slate-50/90",
    tag: "High Demand",
    tagStyle: "bg-blue-100/70 text-blue-800 border-blue-200",
    skills: ["State Machines", "React Server Components", "Web Vitals", "API Architecture", "Concurrency"],
  },
  {
    title: "AI, ML & Neural Architectures",
    abbreviation: "AI-ML",
    subtitle: "PyTorch, Large Language Models, RAG Pipelines, Vector Search & Embeddings",
    icon: BrainCircuit,
    accent: "text-purple-600",
    border: "group-hover:border-purple-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(168,85,247,0.12)]",
    cardBg: "from-purple-50/70 via-white to-slate-50/90",
    tag: "Hot 2026",
    tagStyle: "bg-purple-100/70 text-purple-800 border-purple-200",
    skills: ["Transformers", "Fine-Tuning", "Vector DBs", "Inference Optimization", "Python Core"],
  },
  {
    title: "Cloud & Scalable DevOps",
    abbreviation: "DEVOPS",
    subtitle: "Kubernetes, Docker, AWS Infrastructure, Terraform & Zero-Downtime CI/CD",
    icon: Cloud,
    accent: "text-amber-600",
    border: "group-hover:border-amber-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(245,158,11,0.12)]",
    cardBg: "from-amber-50/70 via-white to-slate-50/90",
    tag: "Staff Track",
    tagStyle: "bg-amber-100/70 text-amber-800 border-amber-200",
    skills: ["K8s Mesh", "Terraform IaC", "Chaos Engineering", "Observability", "Cloud Security"],
  },
  {
    title: "System Design & Distributed Scalability",
    abbreviation: "SYS-DES",
    subtitle: "High Availability, Event-Driven Queues, Sharding, Caching & CAP Theorem",
    icon: Layers,
    accent: "text-emerald-600",
    border: "group-hover:border-emerald-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.12)]",
    cardBg: "from-emerald-50/70 via-white to-slate-50/90",
    tag: "Principal Level",
    tagStyle: "bg-emerald-100/70 text-emerald-800 border-emerald-200",
    skills: ["Rate Limiters", "Distributed Locks", "Consistent Hashing", "Database Sharding", "Write-Back Caching"],
  },
  {
    title: "Low-Latency Backend Systems",
    abbreviation: "LOW-LAT",
    subtitle: "Go, Rust, Java Concurrency, Memory Optimization & gRPC Protocols",
    icon: Terminal,
    accent: "text-sky-600",
    border: "group-hover:border-sky-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(14,165,233,0.12)]",
    cardBg: "from-sky-50/70 via-white to-slate-50/90",
    tag: "Core Systems",
    tagStyle: "bg-sky-100/70 text-sky-800 border-sky-200",
    skills: ["Goroutines & Mutex", "Zero-Copy I/O", "SQL Index Tuning", "Protobuf / gRPC", "Socket Streams"],
  },
  {
    title: "Behavioral, Leadership & HR",
    abbreviation: "STAR-HR",
    subtitle: "STAR Method, Conflict Resolution, Culture Alignment & Executive Pitching",
    icon: MessageSquare,
    accent: "text-rose-600",
    border: "group-hover:border-rose-400",
    glow: "group-hover:shadow-[0_10px_30px_rgba(244,63,94,0.12)]",
    cardBg: "from-rose-50/70 via-white to-slate-50/90",
    tag: "Crucial for Offers",
    tagStyle: "bg-rose-100/70 text-rose-800 border-rose-200",
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
    color: "text-blue-700 border-blue-200 bg-blue-50",
  },
  {
    num: "02",
    title: "Natural Voice Conversation via WebRTC",
    desc: "Speak naturally using your microphone. Our conversational AI assistant Eva listens, asks clarifying follow-ups, and adapts in real time.",
    icon: Headphones,
    color: "text-purple-700 border-purple-200 bg-purple-50",
  },
  {
    num: "03",
    title: "Deep Speech & Logic Evaluation",
    desc: "Advanced neural evaluators score technical accuracy, architectural depth, speech cadence, hesitations, and confidence markers.",
    icon: Zap,
    color: "text-amber-800 border-amber-200 bg-amber-50",
  },
  {
    num: "04",
    title: "Comprehensive Radar Scorecard",
    desc: "Download actionable suggestions, radar metrics, executive 3-line summaries, and personalized practice drills to guarantee offer readiness.",
    icon: Award,
    color: "text-emerald-800 border-emerald-200 bg-emerald-50",
  },
];

// --- TESTIMONIALS ---
const TESTIMONIALS = [
  {
    name: "Maya Lin",
    role: "Staff AI Engineer",
    company: "Offer from Anthropic",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    quote: "The interactive voice assistant feels frighteningly realistic. Having to articulate complex distributed systems out loud under realistic time limits completely cured my interview freeze.",
    badge: "AI & ML Track",
    badgeColor: "text-blue-800 border-blue-200 bg-blue-50",
    stars: 5,
  },
  {
    name: "Devon Chen",
    role: "Senior Full-Stack Architect",
    company: "Offer from Stripe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    quote: "The rubric scorecard pointed out that while my code logic was solid, my pacing was rushed. Practicing 4 sessions got me a $65k compensation increase in my final offer.",
    badge: "Full-Stack Track",
    badgeColor: "text-purple-800 border-purple-200 bg-purple-50",
    stars: 5,
  },
  {
    name: "Aaliyah Taylor",
    role: "Lead DevOps Specialist",
    company: "Offer from Datadog",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    quote: "Unlike flashcards or leetcode typing, the real-time speech dialogue forced me to structure my thoughts using STAR and clear architectural tradeoffs. Unmatched tool.",
    badge: "Cloud Track",
    badgeColor: "text-amber-800 border-amber-200 bg-amber-50",
    stars: 5,
  },
];

// --- FAQ ACCORDION ---
const FAQS = [
  {
    q: "How does the real-time AI voice interviewer work?",
    a: "CareerTalk AI establishes a bidirectional WebRTC audio connection with sub-400ms voice streaming. It analyzes your spoken answers in real-time, understands technical nuance, and responds dynamically with natural conversational cadence.",
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

export default function CareerTalkLanding() {
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

  // Prefetch critical auth routes instantly so opening sign-in page is 0ms / instantaneous
  useEffect(() => {
    router.prefetch("/login");
    router.prefetch("/register");
  }, [router]);

  const handleNavigate = (path) => {
    triggerHaptic(40);
    router.push(path);
  };

  const handleStartMock = (track = "") => {
    triggerHaptic(40);
    if (track && typeof window !== "undefined") {
      sessionStorage.setItem("selected_interview_track", track);
    }
    router.push("/login");
  };

  const handleLaunchVoiceRoom = () => {
    triggerHaptic(40);
    router.push("/login");
  };

  const handleScorecardSimulation = () => {
    triggerHaptic(40);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased relative selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* --- SUBTLE PASTEL AMBIENT GLOWS IN BACKGROUND --- */}
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/50 via-blue-50/40 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-40 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-purple-100/50 via-pink-50/40 to-transparent blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-32 left-1/3 w-[600px] h-[600px] bg-gradient-to-t from-emerald-100/40 via-teal-50/30 to-transparent blur-[160px] rounded-full pointer-events-none z-0" />

      {/* --- SLEEK GLASS NAVIGATION BAR --- */}
      <nav className="fixed top-0 z-[100] w-full bg-white/85 backdrop-blur-2xl border-b border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 lg:px-8">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }} 
              transition={{ duration: 0.6 }}
              className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] p-[2px] shadow-sm"
            >
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="CareerTalk AI Logo" width={28} height={28} className="object-contain" priority />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-black group-hover:text-blue-600 transition-colors">
                CareerTalk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Autonomous Career Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links — WITH "HOME" OPTION */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a 
              href="#" 
              className="flex items-center gap-1.5 text-black font-black transition-colors hover:text-blue-600"
            >
              <Home size={16} />
              <span>Home</span>
            </a>
            <a href="#voice-engine" className="hover:text-black transition-colors">Voice Engine</a>
            <a href="#tracks" className="hover:text-black transition-colors">Practice Tracks</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How It Works</a>
            <a href="#analytics" className="hover:text-black transition-colors">Scorecards</a>
            <a href="#testimonials" className="hover:text-black transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </div>

          {/* Action Buttons: Log In & Sign Up */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              prefetch={true}
              onClick={() => triggerHaptic(40)}
              className="inline-flex items-center justify-center text-sm font-bold text-black hover:text-gray-900 hover:bg-gray-100 rounded-full px-5 h-11 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              prefetch={true}
              onClick={() => triggerHaptic(40)}
              className="relative group rounded-full px-6 h-11 font-black text-sm bg-black hover:bg-gray-800 text-white shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Sign Up</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 border border-gray-200 text-black hover:bg-gray-200"
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
              className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-200 px-6 py-6 space-y-4 shadow-lg"
            >
              <div className="flex flex-col space-y-3 text-base font-semibold text-gray-700">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-black font-black flex items-center gap-2 py-1">
                  <Home size={18} /> Home
                </a>
                <a href="#voice-engine" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">Voice Engine</a>
                <a href="#tracks" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">Practice Tracks</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">How It Works</a>
                <a href="#analytics" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">Scorecards</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">Reviews</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-black py-1">FAQ</a>
              </div>
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => {
                    triggerHaptic(40);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center h-11 border border-gray-300 text-black rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  prefetch={true}
                  onClick={() => {
                    triggerHaptic(40);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center h-11 bg-black text-white font-black rounded-xl shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ========================================================================= */}
      {/* 🌟 STARTING SECTION: [AI ASSISTANT INTERVIEWING CANDIDATE ON LEFT] ➔ [HERO CONTENT ON RIGHT] */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="relative pt-32 sm:pt-40 pb-20 px-6 lg:px-8 z-10 overflow-hidden border-b border-gray-200 bg-white">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* 🖼️ HERO IMAGE ON THE LEFT: AI ASSISTANT TAKING INTERVIEW */}
            <FadeIn className="lg:col-span-6">
              <FourDCard>
                <div className="relative rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-cyan-100 via-indigo-50 to-purple-100 border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full bg-gray-100 group">
                    <Image
                      src="/ai_assistant_hero.jpg"
                      alt="AI Assistant Eva actively interviewing candidate in real-time"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Floating Active Status Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 text-black text-xs font-bold shadow-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-gray-900">AI Assistant Eva • Live Spoken Interview</span>
                    </div>

                    <div className="hidden sm:flex absolute bottom-4 right-4 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gray-200 text-black text-xs font-medium shadow-xl">
                      <div className="w-8 h-8 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700">
                        <Mic size={16} className="animate-bounce" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-black">Live Evaluation: <span className="text-emerald-600 font-extrabold">8.4 / 10 Score</span></p>
                        <p className="text-[11px] text-gray-500">System Design & Latency Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FourDCard>
            </FadeIn>

            {/* 📝 HERO HEADLINE, DETAILS & ACTIONS ON THE RIGHT */}
            <FadeIn delay={0.2} className="lg:col-span-6 text-left space-y-6">
              
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles size={15} className="text-blue-600 animate-spin" />
                <span>Next-Gen Conversational Voice AI • Real-Time Scoring</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-black">
                Master Your Tech Interview with an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Intelligent Voice AI
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed font-normal">
                Practice realistic technical coding, architecture, and behavioral drills with our intelligent AI interviewer. Speak naturally, receive instant rubric scores, and master interview confidence.
              </p>

              {/* Action Buttons: Sign Up / Log In */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/register"
                  prefetch={true}
                  onClick={() => triggerHaptic(40)}
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-black hover:bg-gray-800 text-white font-black text-base shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <span>Sign Up</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => triggerHaptic(40)}
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-black font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2.5"
                >
                  <Lock size={16} className="text-gray-700" />
                  <span>Log In to Practice</span>
                </Link>
              </div>

              {/* Quick Metrics Strip in 2x2 Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-black text-black">50k+</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">Sessions Run</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-black text-blue-600">98.4%</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">Confidence</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-black text-purple-600">&lt;400ms</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">Voice Latency</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
                  <p className="text-xl sm:text-2xl font-black text-emerald-600">Top 1%</p>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">Offer Match</p>
                </div>
              </div>

            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* --- LOGO MARQUEE --- */}
      <section className="py-10 border-b border-gray-200 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-500 mb-6">
            Engineers & Students Prepared for Leading Global Tech Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="h-8 flex items-center"><Image src="/clientLogos/Google.png" alt="Google" width={100} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/Wipro.svg" alt="Wipro" width={90} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/tata.png" alt="Tata" width={85} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/techmahindra.png" alt="Tech Mahindra" width={120} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/teleperformance.png" alt="Teleperformance" width={130} height={32} className="h-7 w-auto object-contain" /></div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 SHOWCASE BLOCK 1: [PICTURE ON LEFT] ➔ [ABBREVIATIONS ON RIGHT]         */}
      {/* ========================================================================= */}
      <section id="voice-engine" className="py-24 px-6 lg:px-8 relative z-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: PICTURE MOCKUP */}
            <FadeIn className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-cyan-100 via-indigo-50 to-purple-100 border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-gray-100 group">
                    <Image
                      src="/neo_hero_voice.jpg"
                      alt="CareerTalk AI Voice Engine"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 text-black text-xs font-bold shadow-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-gray-900">WebRTC Low-Latency Voice Engine</span>
                    </div>
                  </div>
                </div>
              </FourDCard>
            </FadeIn>

            {/* RIGHT SIDE: ABBREVIATIONS & ARCHITECTURE SPECS */}
            <FadeIn delay={0.2} className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                <Cpu size={14} /> AI Voice Engine
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
                Low-Latency WebRTC Speech Intelligence
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Engage in an authentic, bidirectional spoken dialogue. Our neural voice architecture handles complex technical explanations, interruptibility, and live tone analysis in real time.
              </p>

              {/* ABBREVIATION LIST (RIGHT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "WebRTC",
                    title: "Sub-400ms Audio Mesh",
                    desc: "Real-time bidirectional audio streaming without awkward pauses or delays.",
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                  },
                  {
                    abbr: "VAD",
                    title: "Voice Activity Detection",
                    desc: "Intelligently senses natural pauses and adapts conversational pacing.",
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                  },
                  {
                    abbr: "STT/TTS",
                    title: "Deepgram & Neural Voices",
                    desc: "Precision engineering transcription and natural vocal synthesis.",
                    color: "text-amber-800 bg-amber-50 border-amber-200",
                  },
                  {
                    abbr: "PROCTOR",
                    title: "Hardware & Focus Lock",
                    desc: "Fullscreen security verification, mic validation, and anti-cheat protection.",
                    color: "text-rose-700 bg-rose-50 border-rose-200",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 shadow-sm transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-black tracking-tight">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => triggerHaptic(40)}
                  className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-black hover:bg-gray-800 text-white font-black text-sm shadow-md gap-2 transition-all active:scale-95"
                >
                  <span>Sign In to Launch Live Room</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 SHOWCASE BLOCK 2: [ABBREVIATIONS ON LEFT] ➔ [PICTURE ON RIGHT]         */}
      {/* ========================================================================= */}
      <section id="tracks" className="py-24 px-6 lg:px-8 bg-gray-50/70 relative z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* LEFT SIDE: ABBREVIATIONS & DOMAIN SPECIALIZATIONS */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
                <Layers size={14} /> Specialized Curriculums
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
                6 Tailored Tracks for Every Discipline
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Choose your exact engineering domain. Each track contains industry-calibrated question banks and rubric benchmarks tailored for junior to staff levels.
              </p>

              {/* ABBREVIATION LIST (LEFT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "FS-ENG",
                    title: "Full-Stack & Web Systems",
                    desc: "React, Next.js, TypeScript, Node.js, GraphQL & DOM performance.",
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                  },
                  {
                    abbr: "AI-ML",
                    title: "Machine Learning & Neural LLMs",
                    desc: "PyTorch, Transformers, RAG Pipelines, Vector DBs & Quantization.",
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                  },
                  {
                    abbr: "DEVOPS",
                    title: "Cloud & Scalable DevOps",
                    desc: "Kubernetes, Docker, AWS Infrastructure, Terraform & CI/CD.",
                    color: "text-amber-800 bg-amber-50 border-amber-200",
                  },
                  {
                    abbr: "SYS-DES",
                    title: "Distributed System Design",
                    desc: "Sharding, High Availability, Caching, CAP Theorem & Event Queues.",
                    color: "text-emerald-800 bg-emerald-50 border-emerald-200",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 shadow-sm transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-black tracking-tight">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>
            </FadeIn>

            {/* RIGHT SIDE: PICTURE SHOWCASE */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] w-full border border-gray-200 shadow-xl group bg-white">
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
                    <div className={`p-8 rounded-3xl bg-gradient-to-br ${track.cardBg} border border-gray-200 ${track.border} ${track.glow} transition-all duration-300 h-full flex flex-col justify-between shadow-sm hover:shadow-md`}>
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-3.5 rounded-2xl bg-white border border-gray-200 ${track.accent} group-hover:scale-110 transition-transform shadow-xs`}>
                            <Icon size={24} />
                          </div>
                          <span className={`text-[11px] font-bold font-mono px-3 py-1 rounded-full border ${track.tagStyle}`}>
                            {track.abbreviation} • {track.tag}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-black mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                          {track.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {track.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-2xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/login"
                        prefetch={true}
                        onClick={() => {
                          triggerHaptic(40);
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("selected_interview_track", track.abbreviation);
                          }
                        }}
                        className="w-full h-11 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Practice {track.abbreviation}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </FourDCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (4 STEPS) --- */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 relative z-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-50 text-amber-800 border border-amber-200 mb-4 shadow-sm">
                <Activity size={14} /> Step-by-Step Journey
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black mb-4">
                How CareerTalk AI Prepares You
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
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
                    <div className="p-8 rounded-3xl bg-white border border-gray-200 h-full flex flex-col justify-between relative group hover:border-gray-400 hover:shadow-md transition-all shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-4xl font-black font-mono text-black">
                            {step.num}
                          </span>
                          <div className={`p-3 rounded-2xl border ${step.color}`}>
                            <Icon size={20} />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-black mb-3 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
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
      {/* 🌟 SHOWCASE BLOCK 3: [PICTURE ON LEFT] ➔ [ABBREVIATIONS ON RIGHT]         */}
      {/* ========================================================================= */}
      <section id="analytics" className="py-24 px-6 lg:px-8 bg-gray-50/70 border-b border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: PICTURE SHOWCASE */}
            <FadeIn className="lg:col-span-7">
              <FourDCard>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] w-full border border-gray-200 shadow-xl group bg-white">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                <BarChart3 size={14} /> Comprehensive Analytics
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
                Skill Radar Matrix & Instant Hire Verdicts
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Receive quantifiable data on every practice round. Our AI model provides clear rubrics on technical accuracy, problem-solving cadence, speech fluency, and specific areas for targeted improvement.
              </p>

              {/* ABBREVIATION LIST (RIGHT SIDE) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    abbr: "TECH-98%",
                    title: "Technical Precision & Depth",
                    desc: "Evaluates algorithmic complexity, architectural trade-offs, and best practices.",
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                  },
                  {
                    abbr: "FLU-96%",
                    title: "Fluency & Vocal Cadence",
                    desc: "Speech pace, articulation speed, confidence markers, and filler words reduction.",
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                  },
                  {
                    abbr: "STR-95%",
                    title: "Problem Solving Structure",
                    desc: "Systematic formulation, edge-case breakdown, and structured logic steps.",
                    color: "text-amber-800 bg-amber-50 border-amber-200",
                  },
                  {
                    abbr: "VERDICT",
                    title: "Executive Hire Recommendation",
                    desc: "3-line AI summary, hire/no-hire classification, and customized drill roadmaps.",
                    color: "text-emerald-800 bg-emerald-50 border-emerald-200",
                  },
                ].map((item, i) => (
                  <FourDCard key={i}>
                    <div className="p-3 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 shadow-sm transition-all flex items-start gap-3.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-black shrink-0 border ${item.color}`}>
                        {item.abbr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-black tracking-tight">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </FourDCard>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => triggerHaptic(40)}
                  className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-black hover:bg-gray-800 text-white font-black text-sm shadow-md gap-2 transition-all active:scale-95"
                >
                  <span>Sign In for Scorecards</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 px-6 lg:px-8 relative z-10 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-pink-50 text-pink-700 border border-pink-200 mb-4 shadow-sm">
                <Award size={14} /> Proven Success Stories
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black mb-4">
                Engineers Landing Top Offers
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                See how job seekers turned practice sessions into top engineering placements.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <FourDCard>
                  <div className="p-8 rounded-3xl bg-white border border-gray-200 h-full flex flex-col justify-between shadow-sm hover:shadow-md relative hover:border-gray-400 transition-all">
                    <div>
                      <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[#F59E0B]" />
                        ))}
                      </div>

                      <p className="text-sm text-gray-800 leading-relaxed mb-6 italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-200 flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-black">{t.name}</h4>
                        <p className="text-xs text-gray-600">{t.role}</p>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${t.badgeColor} mt-1 inline-block`}>{t.company}</span>
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
      <section id="faq" className="py-24 px-6 lg:px-8 bg-gray-50/70 border-b border-gray-200 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 mb-4 shadow-sm">
                <MessageSquare size={14} /> Clear Answers
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black mb-4">
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
                    <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden transition-all shadow-sm">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-black hover:text-blue-600 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={20}
                          className={`text-gray-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 text-black" : ""
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
                            className="px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
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
      <section className="py-24 px-6 lg:px-8 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <FourDCard>
              <div className="relative rounded-[36px] p-10 sm:p-16 bg-black text-white shadow-2xl overflow-hidden text-center">
                
                {/* Background Glows */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 font-black text-xs tracking-widest uppercase border border-white/20 shadow-sm">
                    Ready to Level Up Your Career?
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                    Start Practicing with Conversational AI.
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
                    Join ambitious software engineers, data scientists, and cloud architects crushing their interviews.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/register"
                      prefetch={true}
                      onClick={() => triggerHaptic(40)}
                      className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white hover:bg-gray-100 text-black font-black text-base shadow-lg active:scale-95 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <span>Sign Up</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href="/login"
                      prefetch={true}
                      onClick={() => triggerHaptic(40)}
                      className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base transition-all inline-flex items-center justify-center"
                    >
                      <span>Log In</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FourDCard>
          </FadeIn>
        </div>
      </section>

      {/* --- CANDIDATE FOOTER --- */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-12 px-6 lg:px-8 relative z-10 text-gray-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            
            {/* Col 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="CareerTalk AI" width={32} height={32} />
                <span className="font-black text-lg text-black tracking-tight">CareerTalk <span className="text-blue-600">AI</span></span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Autonomous conversational voice interview platform empowering job seekers to master technical and behavioral interviews.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All Voice AI Engines Operational
              </div>
            </div>

            {/* Col 2: Practice Tracks */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-black">Practice Tracks</h5>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#tracks" className="hover:text-black transition-colors">Full-Stack Web Engineering</a></li>
                <li><a href="#tracks" className="hover:text-black transition-colors">AI & Machine Learning</a></li>
                <li><a href="#tracks" className="hover:text-black transition-colors">Cloud & Scalable DevOps</a></li>
                <li><a href="#tracks" className="hover:text-black transition-colors">System Design Drills</a></li>
                <li><a href="#tracks" className="hover:text-black transition-colors">Behavioral & STAR Method</a></li>
              </ul>
            </div>

            {/* Col 3: Platform */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-black">Platform</h5>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:text-black transition-colors">Home Portal</a></li>
                <li><a href="#voice-engine" className="hover:text-black transition-colors">Voice Engine Architecture</a></li>
                <li><a href="#how-it-works" className="hover:text-black transition-colors">Assessment Methodology</a></li>
                <li><a href="#analytics" className="hover:text-black transition-colors">Instant Scorecards</a></li>
                <li><a href="#testimonials" className="hover:text-black transition-colors">Candidate Reviews</a></li>
                <li><Link href="/login" prefetch={true} className="hover:text-black transition-colors">Candidate Sign In</Link></li>
              </ul>
            </div>

            {/* Col 4: Engineering Team */}
            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-widest text-black">Engineering Team</h5>
              <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                <li className="text-black font-bold">Nischith Gowda R</li>
                <li>Manohar VM</li>
                <li>Chandrashekara VR</li>
                <li>Punith GG</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
            <p>© 2026 CareerTalk AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="/login" className="hover:text-black transition-colors">Terms of Service</Link>
              <Link href="/login" className="hover:text-black transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}