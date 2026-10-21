"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const router = useRouter();

  // 🔹 Initial session
  useEffect(() => {
    let isMounted = true;
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(session);
          setIsLoadingSession(false);
        }
      } catch (err) {
        if (isMounted) setIsLoadingSession(false);
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) {
          setSession(session);
          setIsLoadingSession(false);
        }
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // 🔹 Fetch user profile
  const fetchUserProfile = async (email) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!error) setUserProfile(data);
  };

  // 🔹 SIGN IN
  const signInUser = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      let { data: userData, error: profileError } = await supabase
        .from("users")
        .select("role, banned")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      // 🔹 If authenticated in Auth but profile missing from users table, auto-create profile
      if (!userData) {
        const userRole = data?.user?.user_metadata?.role || "recruiter";
        const { data: insertedProfile, error: insertErr } = await supabase
          .from("users")
          .insert([
            {
              email: cleanEmail,
              name: data?.user?.user_metadata?.name || cleanEmail.split("@")[0],
              role: userRole,
              picture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              credits: 3,
              banned: false,
            },
          ])
          .select("role, banned")
          .maybeSingle();

        if (insertErr && insertErr.code === "23505") {
          const { data: refetched } = await supabase
            .from("users")
            .select("role, banned")
            .eq("email", cleanEmail)
            .maybeSingle();
          userData = refetched;
        } else if (insertedProfile) {
          userData = insertedProfile;
        }
      }

      // 🔹 Check role from metadata first, then database
      const metaRole = data?.user?.user_metadata?.role;
      let finalRole = (userData?.role || metaRole || "candidate").trim().toLowerCase();

      // If user registered with metadata role that differs from DB row, sync DB
      if (metaRole && metaRole.trim().toLowerCase() !== userData?.role?.trim().toLowerCase()) {
        supabase
          .from("users")
          .update({ role: metaRole })
          .eq("email", cleanEmail);
        finalRole = metaRole.trim().toLowerCase();
        if (userData) userData.role = metaRole;
      }

      if (userData?.banned) {
        await supabase.auth.signOut();
        return {
          success: false,
          error:
            "Your account has been banned. Please contact support for more information.",
        };
      }

      setUserProfile(userData);
      toast.success("Welcome back!");

      const targetPath = finalRole === "recruiter" ? "/recruiter/dashboard" : "/candidate/dashboard";
      router.replace(targetPath);

      return { success: true, data, role: finalRole };
    } catch (err) {
      console.error("SignIn error:", err);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // 🔹 SIGN UP (Supabase-managed CAPTCHA — do NOT pass captchaToken)
  const signUpNewUser = async (email, password, { name, role }) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              name,
              role,
            },
          },
        });

      if (authError || !authData?.user?.id) {
        return {
          success: false,
          error: authError?.message || "Signup failed. Please try again.",
        };
      }

      const { error: insertError } = await supabase.from("users").insert([
        {
          email: cleanEmail,
          name,
          role,
          picture:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          credits: 3,
          banned: false,
        },
      ]);

      if (insertError) {
        if (insertError.code === '23505') {
          // If user row already exists, update role and name to selected role
          await supabase
            .from("users")
            .update({ role, name })
            .eq("email", cleanEmail);
        } else {
          return { success: false, error: insertError.message };
        }
      }

      return { success: true, user: authData.user };
    } catch (err) {
      return { success: false, error: "Unexpected error occurred." };
    }
  };

  // 🔹 SIGN OUT
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Sign out failed.");
      return;
    }

    setSession(null);
    setUserProfile(null);
    toast.success("Successfully signed out.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        userProfile,
        isLoadingSession,
        signInUser,
        signUpNewUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
