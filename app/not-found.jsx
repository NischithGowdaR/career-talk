"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider">
          <Sparkles size={14} /> 404 • Page Not Found
        </div>
        <h1 className="text-6xl font-black tracking-tight text-black">404</h1>
        <p className="text-gray-600 text-sm">
          The requested page doesn't exist or has moved. Let's get you back to your AI Mock sessions.
        </p>
        <Link href="/">
          <Button className="h-12 px-6 rounded-full bg-black hover:bg-gray-800 text-white font-black text-sm shadow-md flex items-center gap-2 mx-auto transition-all">
            <ArrowLeft size={16} /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
