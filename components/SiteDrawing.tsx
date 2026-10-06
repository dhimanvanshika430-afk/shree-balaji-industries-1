"use client";

import { useRef, useState } from "react";
import { motion, MotionValue, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { planElements, PlanEl } from "@/lib/plan";
import { planStages, planValues } from "@/lib/data";
import { usePinnedProgress } from "@/lib/usePinnedProgress";

const fill = (t: string) => t.replace(/\{(\w+)\}/g, (_, k) => planValues[k] ?? "");

const stroke: Record<string, { w: number; o: number; dash?: string; color?: string }> = {
  grid: { w: 0.6, o: 0.35, dash: "10 5 2 5" },
  thin: { w: 1.3, o: 0.8 },
  wall: { w: 3.2, o: 1 },
  furn: { w: 1.8, o: 0.95 },
  dash: { w: 1, o: 0.8, dash: "6 5" },
  dim: { w: 1.1, o: 0.85, color: "clay" },
  dimtick: { w: 2, o: 1, color: "clay" },
  sect: { w: 1.4, o: 0.9, dash: "18 6 4 6" },
};
const textStyle: Record<string, { size: number; weight?: number; ls?: number; color?: string; o?: number }> = {
  small: { size: 12, o: 0.85 },
  label: { size: 20, weight: 500, ls: 4 },
  labelsm: { size: 11, ls: 2.5, color: "clay" },
  note: { size: 11, o: 0.6, ls: 1 },
  tiny: { size: 8.5, o: 0.5, ls: 0.6 },
  dimtext: { size: 12, color: "clay", ls: 1 },
  title: { size: 13, weight: 600, ls: 2 },
};

function Path({ el, p }: { el: PlanEl; p: MotionValue<number> }) {
  const s = stroke[el.c] ?? stroke.thin;
  const t = useTransform(p, [el.a, el.b], [0, 1], { clamp: true });
  const o = useTransform(t, (v) => v * s.o);
  const common = {
    d: el.d,
    fill: "none",
    stroke: s.color === "clay" ? "rgb(var(--clay))" : "currentColor",
    strokeWidth: s.w,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  // dashed lines fade in (a dash pattern can't be combined with the draw-on trick);
  // solid lines are drawn stroke-by-stroke.
  if (s.dash) return <motion.path {...common} strokeDasharray={s.dash} style={{ opacity: o }} />;
  return <motion.path {...common} strokeOpacity={s.o} pathLength={t} />;
}

function Label({ el, p }: { el: PlanEl; p: MotionValue<number> }) {
  const st = textStyle[el.c] ?? textStyle.small;
  const o = useTransform(p, [el.a, el.b], [0, st.o ?? 1], { clamp: true });
  return (
    <motion.text
      x={el.x}
      y={el.y}
      textAnchor={(el.an as any) ?? "middle"}
      fontSize={st.size}
      fontWeight={st.weight ?? 400}
      letterSpacing={st.ls ?? 0}
      fill={st.color === "clay" ? "rgb(var(--clay))" : "currentColor"}
      transform={el.r ? `rotate(${el.r} ${el.x} ${el.y})` : undefined}
      style={{ opacity: o, fontFamily: "var(--font-sans)" }}
    >
      {fill(el.t ?? "")}
    </motion.text>
  );
}

/** A blank sheet becomes a full architectural drawing as the visitor scrolls.
 *  The sheet stays pinned while it draws — the page will not move on
 *  until the drawing finishes; only then does scrolling continue. Scrolling
 *  back up undraws it fully before the page moves up again. */
export default function SiteDrawing() {
  const ref = useRef<HTMLElement>(null);
  const p = useMotionValue(0);
  const [stage, setStage] = useState(0);
  const [bar, setBar] = useState(0);

  usePinnedProgress(ref, (v) => {
    p.set(v);
    setBar(v);
  });

  useMotionValueEvent(p, "change", (v) => {
    let s = 0;
    planStages.forEach((st, i) => v >= st.at && (s = i));
    setStage(s);
  });

  return (
    <section ref={ref} className="pin-track-drawing relative bg-ink">
      <div className="pin-stage bg-ink">
        <div className="container-sbi h-full grid lg:grid-cols-[0.62fr_1.38fr] gap-6 lg:gap-14 items-center py-6 md:py-10">
          <div className="self-start lg:self-center pt-2 lg:pt-0">
            <p className="eyebrow mb-4 md:mb-6">Site Measurement</p>
            <h2 className="font-serif text-[clamp(1.5rem,3.4vw,2.8rem)] leading-[1.12] max-w-md">
              Every piece begins as a drawing.
            </h2>
            <p className="text-muted mt-4 max-w-sm text-sm leading-relaxed hidden md:block">
              Watch a room being measured and planned — walls, openings, then the kitchen,
              cupboard, wardrobe and door, before anything is cut.
            </p>
            <ol className="mt-6 md:mt-10 hidden sm:block">
              {planStages.map((s, i) => (
                <li
                  key={s.label}
                  className={`flex items-center gap-4 py-2 border-t border-line text-[0.78rem] transition-colors duration-500 ${
                    i <= stage ? "text-paper" : "text-paper/30"
                  }`}
                >
                  <span className={`text-[0.62rem] tracking-widest ${i === stage ? "text-clay" : ""}`}>0{i + 1}</span>
                  <span>{s.label}</span>
                  {i === stage && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.62rem] tracking-[0.24em] text-muted hidden lg:block">
              {bar < 1 ? "KEEP SCROLLING TO DRAW" : "DRAWING COMPLETE — CONTINUE ↓"}
            </p>
          </div>

          <div className="relative w-full border border-line bg-[rgb(var(--paper)/0.03)] blueprint">
            <svg viewBox="0 0 1200 740" className="w-full h-auto text-paper block" role="img" aria-label="Architectural site measurement drawing being drawn">
              {planElements.map((el, i) =>
                el.k === "p" ? <Path key={i} el={el} p={p} /> : <Label key={i} el={el} p={p} />
              )}
            </svg>
            <p className="absolute left-3 bottom-2 text-[0.55rem] tracking-[0.2em] text-muted">
              SAMPLE LAYOUT — VALUES SET IN lib/data.ts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
