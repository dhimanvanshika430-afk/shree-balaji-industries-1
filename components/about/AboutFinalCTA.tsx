"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutFinalCTA() {
  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-sbi text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2rem,6vw,4.2rem)] leading-tight"
        >
          Let&rsquo;s build your space.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="inline-block px-9 py-4 bg-paper text-ink text-sm tracking-widest2 uppercase hover:bg-clay transition-colors"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
