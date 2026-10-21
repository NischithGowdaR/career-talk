"use client";

import React from "react";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white text-black selection:bg-black selection:text-white p-4 sm:p-6">
      
      {/* Subtle Pastel Glows */}
      <div className="fixed top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-100/50 via-indigo-50/40 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-bl from-pink-100/40 via-emerald-50/30 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Top Left Return to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-black text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Centered Modern Register Card */}
      <div className="relative z-10 w-full max-w-md my-8">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 sm:p-10 border border-gray-200">
          
          {/* Logo Header */}
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <Link href="/" className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] p-[2px] shadow-sm">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="CareerTalk AI Logo" width={30} height={30} className="object-contain" priority />
              </div>
            </Link>
            <div>
              <h1 className="text-2xl font-black text-black tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs text-gray-600 mt-1 font-medium">
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
