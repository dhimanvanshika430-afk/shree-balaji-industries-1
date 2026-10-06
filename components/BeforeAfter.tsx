"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { beforeAfter, img } from "@/lib/data";

/** Drag, tap or use ← → keys. On entering view it sweeps once by itself so the
 *  transformation is seen before it is touched. */
export default function BeforeAfter() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, margin: "-25%" });
  const pos = useMotionValue(6); // percent of "before" revealed
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const [stepIdx, setStepIdx] = useState(0);
  const dragging = useRef(false);
  const touched = useRef(false);

  useMotionValueEvent(pos, "change", (v) => setStepIdx(Math.min(3, Math.floor((v / 100) * 4))));

  useEffect(() => {
    if (!inView) return;
    const seq = animate(pos, [6, 94, 50], { duration: 4.6, ease: [0.65, 0, 0.35, 1], times: [0, 0.65, 1] });
    return () => seq.stop();
  }, [inView, pos]);

  const set = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-sbi mb-12 md:mb-16">
        <p className="eyebrow mb-6">Craftsmanship</p>
        <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.1] max-w-2xl">
          From raw timber to a finished piece.
        </h2>
      </div>

      <div className="container-sbi">
        <div
          ref={box}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos.get())}
          tabIndex={0}
          className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden select-none touch-pan-y cursor-ew-resize bg-black outline-none focus-visible:ring-2 ring-clay"
          onPointerDown={(e) => {
            dragging.current = true;
            touched.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            set(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && set(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 5));
            if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 5));
          }}
        >
          <Image
            src={img(beforeAfter.after.image, 2600)}
            alt={beforeAfter.after.caption}
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            quality={85}
            className="object-cover"
          />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <Image
              src={img(beforeAfter.before.image, 2600)}
              alt={beforeAfter.before.caption}
              fill
              sizes="(max-width: 1360px) 100vw, 1360px"
              quality={85}
              className="object-cover saturate-[0.55] brightness-[0.85]"
            />
          </motion.div>

          <motion.div className="absolute inset-y-0 w-px bg-[#f4f0e8]" style={{ left }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-[#f4f0e8] text-[#121110] grid place-items-center shadow-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
              </svg>
            </div>
          </motion.div>

          <span className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 text-[0.62rem] tracking-[0.26em] uppercase text-[#f4f0e8]">
            {beforeAfter.before.label}
          </span>
          <span className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 text-[0.62rem] tracking-[0.26em] uppercase text-[#f4f0e8]">
            {beforeAfter.after.label}
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 md:p-8 flex justify-between text-[0.7rem] tracking-[0.18em] uppercase text-[#f4f0e8]/85">
            <span>{beforeAfter.before.caption}</span>
            <span className="text-right">{beforeAfter.after.caption}</span>
          </div>
        </div>

        <ol className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {beforeAfter.steps.map((s, i) => (
            <li key={s} className={`border-t pt-4 transition-colors duration-500 ${i === stepIdx ? "border-clay text-paper" : "border-line text-paper/35"}`}>
              <span className="text-[0.62rem] tracking-[0.24em] text-clay">0{i + 1}</span>
              <p className="font-serif text-lg mt-1">{s}</p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted mt-6">Drag the handle, tap anywhere on the image, or use the arrow keys.</p>
      </div>
    </section>
  );
}
