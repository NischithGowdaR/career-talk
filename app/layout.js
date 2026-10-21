import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sonner";
import { AuthContextProvider } from "@/context/AuthContext";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Career Talk",
  description: "AI INTERVIEW PLATFORM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Razorpay (loaded lazily so it never blocks page hydration or route transitions) */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Cloudflare Turnstile is managed by Supabase server-side — no client script */}
      </head>

      <body suppressHydrationWarning className={`${inter.variable} antialiased bg-white text-black`}>
        <Provider>
          <AuthContextProvider>
            {children}
            <Toaster />
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}
