"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, Mic, ShieldCheck, 
  BarChart3, Target, Sparkles, Gift, Zap, TrendingUp, Lock, CreditCard, User, Mail, Phone, MapPin, Send
} from "lucide-react"; 
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// --- HAPTIC FEEDBACK UTILITY ---
const triggerHaptic = (pattern = 40) => {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

// --- PREMIUM GOLD & SILVER PAPER BLAST ---
const PremiumGoldConfetti = () => {
  const pieces = Array.from({ length: 90 });
  const colors = ["#D4AF37", "#F1E5AC", "#C0C0C0", "#FFFFFF", "#B8860B"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {pieces.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 45 + 15; 
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity - 25; 

        return (
          <motion.div
            key={i}
            initial={{ y: "45vh", x: "50vw", scale: 0, rotate: 0 }}
            animate={{ 
              x: ["50vw", `${50 + targetX}vw`, `${50 + targetX * 1.3}vw`],
              y: ["45vh", `${45 + targetY}vh`, "110vh"],
              rotateX: [0, 360, 720],
              rotateY: [0, 180, 540],
              scale: [0, 1, 1, 0.6],
              opacity: [0, 0.8, 0.8, 0] 
            }}
            transition={{ 
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="absolute w-1.5 h-3.5 rounded-sm shadow-sm"
            style={{ 
              backgroundColor: colors[i % colors.length],
              border: '0.5px solid rgba(0,0,0,0.05)'
            }}
          />
        );
      })}
    </div>
  );
};

const ScrollFadeIn = ({ children, delay = 0, duration = 0.8, yOffset = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }} 
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function CareerMockLanding() {
  const router = useRouter();
  const [adminMenu, setAdminMenu] = useState({ visible: false, x: 0, y: 0 });
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setAdminMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleClick = () => setAdminMenu({ ...adminMenu, visible: false });
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [adminMenu]);

  const teamMembers = [
    { name: "Nischith Gowda R", role: "ENGINEER" },
    { name: "Manohar VM", role: "ENGINEER" },
    { name: "Chandrashekara VR", role: "ENGINEER" },
    { name: "Punith GG", role: "ENGINEER" },
  ];

  return (
    <div className="bg-white text-[#1d1d1f] font-sans antialiased relative selection:bg-yellow-100 overflow-x-hidden">
      
      <PremiumGoldConfetti />

      {/* Navigation Header */}
      <nav className="fixed top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-[1100px] mx-auto h-16 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">Career Talk <span className="text-yellow-600 font-extrabold text-xs ml-1 px-2 py-0.5 bg-yellow-50 border border-yellow-200 rounded-full uppercase">AI</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#424245]">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#features" className="hover:text-yellow-600 transition-colors">Features</a>
            <a href="#team" className="hover:text-yellow-600 transition-colors">Our Team</a>
            <a href="#contact" className="hover:text-yellow-600 transition-colors">Contact Us</a>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => { triggerHaptic(); router.push("/login"); }} 
              className="text-[13px] font-semibold text-[#1D1D1F] hover:text-yellow-600 hover:bg-gray-50 rounded-full px-4"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => { triggerHaptic(); router.push("/login"); }} 
              className="bg-black hover:bg-yellow-600 text-white text-[13px] px-5 py-2 h-9 rounded-full font-semibold shadow-md active:scale-95 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 min-h-[90vh]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={{ duration: 2 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black select-none z-0 tracking-tighter italic">
          2026
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto">
          <ScrollFadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-4 opacity-70 uppercase tracking-[0.4em] text-[11px] font-bold text-yellow-700">
                <Sparkles size={14} className="text-yellow-600" /> Next-Gen AI Mock Interviews
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[86px] font-bold tracking-tighter leading-[0.98] mb-6 text-[#1D1D1F]">
                Master Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700">Dream Interview.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
              Experience photorealistic AI video interviews with real-time speech evaluation, instant scoring, and tailored technical drills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button onClick={() => { triggerHaptic(50); router.push("/login"); }} size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full bg-black hover:bg-yellow-600 text-white font-bold text-base tracking-tight shadow-xl transition-all">
                  Start Mock Interview <ChevronRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" onClick={() => { triggerHaptic(); router.push("/recruiter/dashboard"); }} size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full border-gray-200 text-gray-800 hover:bg-gray-50 font-bold text-base shadow-sm">
                  Recruiter Portal
              </Button>
            </div>
          </ScrollFadeIn>

          {/* Hero Realistic UI Mockup */}
          <ScrollFadeIn delay={0.3} yOffset={40}>
            <div className="relative mx-auto rounded-2xl md:rounded-3xl p-2 md:p-3 bg-gradient-to-b from-gray-200/80 via-gray-100/50 to-white/40 border border-gray-200/80 shadow-2xl shadow-yellow-900/10">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-950 aspect-[16/9] w-full group">
                <Image 
                  src="/mockup_interview_ui.jpg" 
                  alt="Career Talk AI Live Mock Interview Interface" 
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]" 
                />
                
                {/* Floating Live Badge Overlays */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>AI Video & Voice Session</span>
                </div>

                <div className="hidden sm:flex absolute bottom-4 right-4 items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-xs font-semibold">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span>Real-time Speech & Tone Evaluation</span>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Trusted Companies Logo Marquee */}
      <section className="py-12 border-y border-gray-100 bg-[#FAF9F6]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-8">
            Empowering Candidates Interviewing At Leading Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="h-8 flex items-center"><Image src="/clientLogos/Google.png" alt="Google" width={100} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/Wipro.svg" alt="Wipro" width={90} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/tata.png" alt="Tata" width={85} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/techmahindra.png" alt="Tech Mahindra" width={120} height={32} className="h-7 w-auto object-contain" /></div>
            <div className="h-8 flex items-center"><Image src="/clientLogos/teleperformance.png" alt="Teleperformance" width={130} height={32} className="h-7 w-auto object-contain" /></div>
          </div>
        </div>
      </section>

      {/* Visual Analytics Showcase Section */}
      <section className="py-28 px-6 bg-white relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full text-[11px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-200">
                  <BarChart3 size={14} /> Comprehensive Analytics
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-tight">
                  Instant AI Feedback & <br /> Skill Radar Breakdown.
                </h2>
                <p className="text-gray-600 font-medium text-base leading-relaxed">
                  After every practice session, get immediate quantifiable feedback on communication fluency, technical accuracy, pace, and body language to level up before the real interview.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">94%</span>
                    <p className="text-xs text-gray-500 font-medium mt-1">Average Readiness Score</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <span className="text-2xl font-bold text-yellow-600">3x Faster</span>
                    <p className="text-xs text-gray-500 font-medium mt-1">Skill Improvement</p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white aspect-[16/9] w-full group">
                <Image 
                  src="/mockup_analytics_ui.jpg" 
                  alt="Career Talk AI Feedback & Scorecard Report" 
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <div className="bg-[#F5F5F7] rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-100">
                  <Gift size={12} /> Exclusive Pro Access
                </div>
                <h2 className="text-5xl font-bold tracking-tight text-[#1D1D1F]">Career Booster <br /><span className="text-yellow-600">PRO PASS</span></h2>
                <p className="text-gray-500 font-medium max-w-xs leading-snug">Upgrade your interview readiness with 10% off all premium features & unlimited practice sessions.</p>
                <Button 
                  onClick={() => router.push('/recruiter/billing')}
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl px-6 h-12 font-bold flex items-center gap-2 shadow-lg shadow-yellow-600/20 active:scale-95 transition-all"
                >
                  Explore Pro Plan <CreditCard size={18} />
                </Button>
              </div>
              <div className="bg-white p-8 rounded-[32px] text-center shadow-sm min-w-[200px] border border-gray-100">
                 <span className="text-7xl font-bold tracking-tighter text-[#1D1D1F]">10%</span>
                 <p className="text-[10px] font-black uppercase tracking-widest mt-2 text-yellow-600">Special Discount</p>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-[#FAF9F6] relative z-10">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollFadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-20 text-[#1D1D1F]">
              Next-Gen AI Tools, <br /> Built for Tech Professionals.
            </h2>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mic, title: "Real-Time Voice AI", desc: "Practice natural spoken responses with dynamic AI-powered speech evaluation.", color: "text-yellow-600" },
              { icon: Target, title: "Targeted Technical Drills", desc: "Tailored interview questions designed for modern software, data, and engineering roles.", color: "text-yellow-600" },
              { icon: BarChart3, title: "Comprehensive Analytics", desc: "Track confidence, speech metrics, and detailed scoring insights over time.", color: "text-yellow-600" },
            ].map((feat, i) => (
              <ScrollFadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-[32px] p-10 h-full border border-gray-100 flex flex-col group hover:shadow-xl transition-all shadow-sm">
                  <feat.icon className={`${feat.color} w-10 h-10 mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{feat.title}</h3>
                  <p className="text-[#636366] leading-relaxed text-sm font-medium">{feat.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollFadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-20 text-[#1D1D1F]">
              The engineers behind <br /> your success.
            </h2>
          </ScrollFadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <ScrollFadeIn key={i} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center p-8 bg-[#fcfcfc] rounded-[32px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl shadow-sm">
                  <div className="w-24 h-24 rounded-full bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center mb-6 text-yellow-600 group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                    <User size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-[#1d1d1f] mb-1 tracking-tight">{member.name}</h4>
                  <p className="text-[#636366] text-xs font-semibold uppercase tracking-widest">{member.role}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#fafafa] border-t border-gray-100 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollFadeIn>
            <div className="text-center max-w-xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-yellow-600 border border-yellow-200 mb-4">
                <Mail size={12} /> Get in Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-4">
                Contact Us
              </h2>
              <p className="text-gray-500 font-medium text-sm md:text-base">
                Have questions, partnership inquiries, or need support? Our team is here to help.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollFadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-5 text-yellow-600">
                  <Mail size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#1d1d1f] mb-2">Email Support</h4>
                <p className="text-gray-500 text-xs mb-4">Reach our team directly via email for any inquiries.</p>
                <a href="mailto:support@careertalk.ai" className="text-yellow-600 text-xs font-bold hover:underline">
                  support@careertalk.ai
                </a>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-5 text-yellow-600">
                  <Phone size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#1d1d1f] mb-2">Direct Line</h4>
                <p className="text-gray-500 text-xs mb-4">Available Monday – Friday, 9:00 AM to 6:00 PM IST.</p>
                <span className="text-gray-800 text-xs font-bold">+91 (800) 123-4567</span>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-[28px] border border-gray-100 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-5 text-yellow-600">
                  <MapPin size={24} />
                </div>
                <h4 className="text-lg font-bold text-[#1d1d1f] mb-2">Office Location</h4>
                <p className="text-gray-500 text-xs mb-4">AI Innovation Center</p>
                <span className="text-gray-800 text-xs font-bold">Bengaluru, Karnataka, India</span>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer onContextMenu={handleContextMenu} className="bg-[#FAF9F6] border-t border-gray-100 pt-20 pb-12 px-6 relative z-10 text-[#1D1D1F]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                <span className="font-bold text-lg tracking-tight">Career Talk AI</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Elevating job interview readiness with real-time speech evaluation and intelligent AI-driven feedback.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200 text-[10px] font-bold text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Operational
              </div>
            </div>

            {/* Column 2: Platform Features */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Platform</h5>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Real-Time Voice AI</a></li>
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Technical Question Drills</a></li>
                <li><a href="#features" className="hover:text-yellow-600 transition-colors">Performance Analytics</a></li>
                <li><a href="#offer" className="hover:text-yellow-600 transition-colors">Pro Discount Pass</a></li>
              </ul>
            </div>

            {/* Column 3: Navigation & Portals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Portals</h5>
              <ul className="space-y-2 text-xs font-semibold text-gray-600">
                <li><Link href="/login" className="hover:text-yellow-600 transition-colors">Candidate Sign In</Link></li>
                <li><Link href="/recruiter/dashboard" className="hover:text-yellow-600 transition-colors">Recruiter Portal</Link></li>
                <li><Link href="/admin/login" className="hover:text-yellow-600 transition-colors">Admin Login</Link></li>
                <li><a href="#team" className="hover:text-yellow-600 transition-colors">Engineering Team</a></li>
              </ul>
            </div>

            {/* Column 4: Engineering Team */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Engineering Team</h5>
              <ul className="space-y-1.5 text-xs font-medium text-gray-500">
                <li>Nischith Gowda R</li>
                <li>Manohar VM</li>
                <li>Chandrashekara VR</li>
                <li>Punith GG</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
            <p>© 2026 Career Mock AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/login" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link href="/login" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
              <button onClick={() => router.push('/admin/login')} className="hover:text-yellow-600 transition-colors">Admin Portal</button>
            </div>
          </div>
        </div>

        {adminMenu.visible && (
          <div className="fixed z-[300] bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-2xl p-1 animate-in fade-in zoom-in duration-200" style={{ top: adminMenu.y, left: adminMenu.x }}>
            <button onClick={() => router.push('/admin')} className="flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors">
              <Lock size={14} className="text-yellow-600" /> Open Admin Portal
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}