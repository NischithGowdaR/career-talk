"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    setLoading(false);

    if (error) {
      toast.error("Failed to send email: " + error.message);
    } else {
      toast.success("Check your inbox for the password reset email!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      {/* Big Logo Above Card */}
      <Image
        src="/logo.png"
        alt="App Logo"
        width={120}
        height={120}
        priority
        className="mb-6 object-contain"
      />

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-black">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Enter your registered email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-base py-2 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 font-bold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
