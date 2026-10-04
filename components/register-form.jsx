"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/services/supabaseClient";
import { Mail, Lock, User2Icon, ArrowRight, AlertCircle } from "lucide-react";

export function RegisterForm() {
  const { signUpNewUser } = UserAuth();
  const router = useRouter();

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const email = emailRef.current?.value.trim().toLowerCase();
    const name = nameRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!email || !name || !password || !role) {
      toast.error("Please fill in all fields including the role.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUpNewUser(email, password, { name, role });
      if (result.success) {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setError(result.error || "Email already registered.");
        toast.error(result.error || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unexpected error occurred.");
      toast.error("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const SignUpWithGoogle = async () => {
    try {
      localStorage.setItem("pending_role", role || "candidate");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) toast.error("Google sign-up failed: " + error.message);
    } catch (err) {
      toast.error("Google sign-up error.");
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Error notification */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{error}</p>
            <p className="text-[11px] text-rose-300/90 mt-0.5">
              Already have an account? <a href="/login" className="underline font-bold hover:text-white">Sign In</a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-bold text-slate-300">
            Full Name
          </Label>
          <div className="relative">
            <User2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/60 w-4 h-4" />
            <Input
              id="name"
              type="text"
              placeholder="Sarah Jenkins"
              required
              ref={nameRef}
              className="pl-10 h-12 bg-white/5 border border-white/15 focus:border-cyan-400/60 rounded-xl text-white placeholder:text-slate-500 text-sm focus-visible:ring-1 focus-visible:ring-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-slate-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="candidate@example.com"
              required
              ref={emailRef}
              className="pl-10 h-12 bg-white/5 border border-white/15 focus:border-purple-400/60 rounded-xl text-white placeholder:text-slate-500 text-sm focus-visible:ring-1 focus-visible:ring-purple-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-bold text-slate-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/60 w-4 h-4" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              ref={passwordRef}
              className="pl-10 h-12 bg-white/5 border border-white/15 focus:border-amber-400/60 rounded-xl text-white placeholder:text-slate-500 text-sm focus-visible:ring-1 focus-visible:ring-amber-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="role" className="text-xs font-bold text-slate-300">
            I am a
          </Label>
          <Select onValueChange={setRole} value={role}>
            <SelectTrigger className="w-full h-12 bg-white/5 border border-white/15 focus:border-emerald-400/60 rounded-xl text-white text-sm px-4">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-[#0F1426] border border-white/15 text-white">
              <SelectItem value="candidate" className="cursor-pointer py-2.5 hover:bg-white/10">Candidate / Engineer (Practice Mocks)</SelectItem>
              <SelectItem value="recruiter" className="cursor-pointer py-2.5 hover:bg-white/10">Recruiter / Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#00F0FF] hover:opacity-95 text-white font-black text-sm shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <span className="relative z-10 bg-[#0E1428] px-3 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Or
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2.5"
        onClick={SignUpWithGoogle}
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        <span>Register with Google</span>
      </Button>

      <div className="text-center text-xs text-slate-300 pt-1">
        Already have an account?{" "}
        <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4">
          Sign in
        </a>
      </div>
    </div>
  );
}