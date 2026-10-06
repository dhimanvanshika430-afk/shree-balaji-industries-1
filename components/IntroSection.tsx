"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECT, img, intro } from "@/lib/data";

export default function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["10%", "-14%"]);
  const clip = useTransform(scrollYProgress, [0.05, 0.4], ["inset(14% 10% 14% 10%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} className="relative bg-ink py-28 md:py-44 overflow-hidden">
      <div className="container-sbi grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-24 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="eyebrow mb-8"
          >
            {intro.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.12] max-w-2xl"
          >
            {intro.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-muted mt-8 max-w-md leading-relaxed"
          >
            {intro.text}
          </motion.p>
          <ul className="mt-12 max-w-md">
            {intro.lines.map((l, i) => (
              <motion.li
                key={l}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="flex items-baseline gap-5 border-t border-line py-4"
              >
                <span className="text-xs text-clay tracking-widest">0{i + 1}</span>
                <span className="font-serif text-lg">{l}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <motion.div style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden">
            <motion.div style={{ y: yA }} className="absolute -inset-[8%]">
              <Image
                src={img(PROJECT.coworkingReception, 1800)}
                alt="Reception fit-out with a wood hexagon partition"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div
            style={{ y: yB }}
            className="absolute -bottom-10 -left-6 md:-left-14 w-[42%] aspect-[3/4] overflow-hidden border-[6px] border-ink shadow-2xl"
          >
            <Image
              src={img(PROJECT.coworkingBreakout, 900)}
              alt="Breakout seating with a timber high table"
              fill
              sizes="22vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
