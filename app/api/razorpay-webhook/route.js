import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const secret = "mywebhooksecret"; // must match your Razorpay webhook secret in the dashboard
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const email = payment.email;
      const amount = payment.amount / 100;

      console.log(`💰 Payment received from ${email} for ₹${amount}`);

      // Determine credits based on amount
      let credits = 0;
      if (amount === 249) credits = 100;
      else if (amount === 499) credits = 500;
      else if (amount === 999) credits = 1000;

      if (!email) {
        console.error("❌ No email found in Razorpay payment data");
        return new Response("No email in payment data", { status: 400 });
      }

      // Initialize Supabase client (runtime, not at build time)
      const supabaseUrl =
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "https://placeholder.supabase.co";
      const supabaseAnonKey =
        process.env.SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "placeholder-anon-key";
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Update credits via RPC function
      const { error } = await supabase.rpc("increment_credits", {
        user_email: email,
        credits_to_add: credits,
      });

      if (error) {
        console.error("❌ Supabase update error:", error);
        return new Response("Database update failed", { status: 500 });
      }

      console.log(`✅ Added ${credits} credits to ${email}`);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error Details:", error.message, error.stack);
    return new Response("Server error", { status: 500 });
  }
}
