"use client";

import React from "react";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090D1A] via-[#0E1529] to-[#0A0D1D] selection:bg-cyan-400 selection:text-black p-4 sm:p-6">
      
      {/* Floating Aurora Glows */}
      <div className="fixed top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#8B5CF6]/15 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-bl from-[#EC4899]/12 via-[#10B981]/10 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Top Left Return to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-bold transition-all backdrop-blur-md shadow-lg"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Centered Glassmorphism Register Card */}
      <div className="relative z-10 w-full max-w-md my-8">
        <div className="bg-gradient-to-br from-white/[0.09] via-indigo-950/50 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_30px_rgba(0,240,255,0.1)] p-8 sm:p-10 border border-purple-400/30">
          
          {/* Logo Header */}
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <Link href="/" className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] p-[2px] shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#0B1020] rounded-[14px] flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="CareerTalk AI Logo" width={30} height={30} className="object-contain" priority />
              </div>
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                Join thousands of engineers mastering AI mock interviews
              </p>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
