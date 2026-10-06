"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import DustField from "./DustField";
import { hero, INQUIRY_HREF } from "@/lib/data";

const CREAM = "text-[#f4f0e8]";

/** Cinematic entry: a slow crossfading slideshow of real photographs (or a
 *  film loop, if hero.video is set), each with its own gentle drift, plus
 *  drifting dust, film grain and a letterbox that opens as the title
 *  sequence ends. Sits below the header so it never merges into the nav. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [d, setD] = useState(1.7); // wait for the title sequence on first visit
  const [active, setActive] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sbi-hero-seen")) setD(0.15);
      sessionStorage.setItem("sbi-hero-seen", "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (hero.video || hero.images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % hero.images.length),
      hero.slideSeconds * 1000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative mt-16 md:mt-20 h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden bg-black"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {hero.video ? (
          <div className="absolute inset-0 animate-kenburns">
            <video
              src={hero.video}
              poster={hero.images[0]}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          hero.images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 animate-kenburns-loop transition-opacity ease-out"
              style={{
                opacity: active === i ? 1 : 0,
                transitionDuration: "1600ms",
                animationDelay: `${-i * 7}s`,
              }}
              aria-hidden={active !== i}
            >
              <Image
                src={src}
                alt="Modular kitchen woodwork by Shree Balaji Industries"
                fill
                priority={i === 0}
                quality={85}
                sizes="100vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
          ))
        )}
      </motion.div>

      {/* light: a slow warm sweep, grade and vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 hero-sweep" />
      <div className="pointer-events-none absolute inset-0 film-grain" />

      {/* drifting dust — real WebGL, sits over the photograph */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <DustField count={120} />
          </Suspense>
        </Canvas>
      </div>

      {/* letterbox opens like a film */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 bg-black z-10"
        initial={{ height: "14%" }}
        animate={{ height: 0 }}
        transition={{ delay: d, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-black z-10"
        initial={{ height: "14%" }}
        animate={{ height: 0 }}
        transition={{ delay: d, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div style={{ opacity: fade }} className={`relative z-20 h-full flex flex-col justify-end ${CREAM}`}>
        <div className="container-sbi pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[0.7rem] tracking-[0.3em] uppercase text-[#f4f0e8]/70 mb-6"
          >
            {hero.eyebrow}
          </motion.p>
          <h1 className="font-serif text-[clamp(2.5rem,7.4vw,6rem)] leading-[1.02] max-w-4xl">
            {hero.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: d + 0.3 + i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.8, duration: 0.9 }}
            className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-[#f4f0e8]/75"
          >
            {hero.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 1.0, duration: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href="#collection"
              className="px-7 py-3.5 bg-[#f4f0e8] text-[#121110] text-[0.7rem] tracking-[0.24em] uppercase hover:bg-[#c98a52] transition-colors duration-300"
            >
              Explore Our Craft
            </a>
            <Link
              href={INQUIRY_HREF}
              className="text-[0.7rem] tracking-[0.24em] uppercase border-b border-[#f4f0e8]/50 pb-1 hover:border-[#c98a52] hover:text-[#c98a52] transition-colors duration-300"
            >
              Inquire
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d + 1.3, duration: 1 }}
            className="mt-12 hidden md:flex gap-10 text-[0.68rem] tracking-[0.24em] uppercase text-[#f4f0e8]/60"
          >
            {hero.lines.map((l) => (
              <li key={l} className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#c98a52]" />
                {l}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="absolute right-6 md:right-10 bottom-8 flex flex-col items-center gap-3 text-[#f4f0e8]/60">
          <span className="text-[0.62rem] tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
          <span className="relative h-10 w-px bg-[#f4f0e8]/25 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-[#f4f0e8] animate-scroll-cue" />
          </span>
        </div>

        {!hero.video && hero.images.length > 1 && (
          <div className="absolute left-6 md:left-10 bottom-8 flex items-center gap-2.5">
            {hero.images.map((_, i) => (
              <button
                key={i}
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full bg-[#f4f0e8] transition-all duration-500"
                style={{ width: active === i ? "22px" : "7px", opacity: active === i ? 0.95 : 0.4 }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
