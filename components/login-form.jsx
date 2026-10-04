"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { UserAuth } from "@/context/AuthContext";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/services/supabaseClient";

export function LoginForm(props) {
  const { className, ...rest } = props;
  const router = useRouter();
  const { signInUser } = UserAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartRegistering = () => {
    router.push("/register");
  };

  const handleDemoAccess = () => {
    toast.success("Entering Candidate Practice Dashboard...");
    router.push("/candidate/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const email = emailRef.current?.value?.trim().toLowerCase() || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const { success, error } = await signInUser(email, password);

      if (!success) {
        setErrorMessage(error || "Invalid login credentials. Please check your email or create an account.");
        toast.error(error || "Login failed.");
        setLoading(false);
        return;
      }

      toast.success("Login successful! Redirecting...");
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Unexpected error occurred. Please try again or use Demo Mode.");
      toast.error("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Google login failed: " + error.message);
      } else {
        toast.success("Redirecting to Google login...");
      }
    } catch (err) {
      toast.error("Google authentication error.");
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Inline Error Banner if error occurs */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">{errorMessage}</p>
            <p className="text-[11px] text-rose-300/90">
              New to CareerTalk?{" "}
              <button
                type="button"
                onClick={handleStartRegistering}
                className="underline font-bold hover:text-white"
              >
                Sign up here
              </button>{" "}
              or use Instant Demo.
            </p>
          </div>
        </div>
      )}

      <form className={cn("space-y-4", className)} {...rest} onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-slate-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400/60 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="candidate@example.com"
              required
              ref={emailRef}
              className="pl-10 h-12 bg-white/5 border border-white/15 focus:border-cyan-400/60 rounded-xl text-white placeholder:text-slate-500 text-sm focus-visible:ring-1 focus-visible:ring-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-bold text-slate-300">
              Password
            </Label>
            <a
              href="/forgot-password"
              className="text-xs text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60 w-4 h-4" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              ref={passwordRef}
              className="pl-10 h-12 bg-white/5 border border-white/15 focus:border-purple-400/60 rounded-xl text-white placeholder:text-slate-500 text-sm focus-visible:ring-1 focus-visible:ring-purple-400"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-black text-sm shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>

      {/* Quick Demo Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleDemoAccess}
        className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-400/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
      >
        <Sparkles size={14} className="text-emerald-400" />
        <span>⚡ Try Instant Candidate Demo</span>
      </Button>

      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <span className="relative z-10 bg-[#0E1428] px-3 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Or continue with
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2.5"
        onClick={SignInWithGoogle}
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        <span>Sign in with Google</span>
      </Button>

      <div className="text-center text-xs text-slate-300 pt-2">
        Don’t have an account?{" "}
        <button
          type="button"
          className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 cursor-pointer"
          onClick={handleStartRegistering}
        >
          Create Free Account
        </button>
      </div>
    </div>
  );
}
