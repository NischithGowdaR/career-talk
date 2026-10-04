"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-black uppercase tracking-wider">
          <Sparkles size={14} /> 404 • Page Not Found
        </div>
        <h1 className="text-6xl font-black tracking-tight text-white">404</h1>
        <p className="text-zinc-400 text-sm">
          The requested page doesn't exist or has moved. Let's get you back to your AI Mock sessions.
        </p>
        <Link href="/">
          <Button className="h-12 px-6 rounded-full bg-[#D4FF00] hover:bg-[#E2FE52] text-black font-black text-sm shadow-lg shadow-[#D4FF00]/20 flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
