"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FourDCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative group rounded-3xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
