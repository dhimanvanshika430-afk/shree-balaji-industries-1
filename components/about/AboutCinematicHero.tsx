"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import DustField from "@/components/DustField";
import { PROJECT } from "@/lib/data";

const SLIDES = [
  { src: PROJECT.heroAbout, alt: "Bath vanity with walnut and cream cabinetry and backlit mirror" },
];

/** Full-bleed hero that shows ONE photograph at a time, cross-fading to the
 *  next every few seconds, behind the "Crafting spaces" line. */
export default function AboutCinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [i, setI] = useState(0);
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div style={{ opacity }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={SLIDES[i].src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[i].src}
              alt={SLIDES[i].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(var(--ink))_88%)]" />

      {/* thin dust layer for depth — real WebGL, sits above the images */}
      <div className="absolute inset-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <DustField count={140} />
          </Suspense>
        </Canvas>
      </div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end">
        <div className="container-sbi pb-20 md:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6"
          >
            Shree Balaji Industries
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2.2rem,7vw,5rem)] leading-[1.03] max-w-3xl"
          >
            Crafting spaces.
            <br />
            Building details that last.
          </motion.h1>
        </div>
        {SLIDES.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-2">
          {SLIDES.map((sl, n) => (
            <button
              key={sl.src}
              aria-label={`Show image ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-px w-8 transition-colors ${n === i ? "bg-paper" : "bg-paper/30"}`}
            />
          ))}
        </div>
        )}
        <div className="absolute right-6 md:right-10 bottom-28 flex flex-col items-center gap-3 text-muted">
          <span className="text-[0.65rem] tracking-widest2 rotate-180 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <span className="w-px h-10 bg-paper/30" />
        </div>
      </motion.div>
    </section>
  );
}
