"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { categories, img, INQUIRY_HREF } from "@/lib/data";

function Panel({ c, i, last }: { c: (typeof categories)[number]; i: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // as this panel slides up over the previous one, it opens like a wipe and
  // settles with a professional 3D zoom: tilted back and enlarged, easing
  // down flat and to scale as it arrives.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(16% 12% 0% 12%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 1], [60, 0]);
  const textO = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  return (
    <div ref={ref} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black" style={{ zIndex: i + 1 }}>
      <motion.div style={{ clipPath: i === 0 ? undefined : clip }} className="absolute inset-0">
        <div className="absolute inset-0" style={{ perspective: "1600px" }}>
          <motion.div style={{ scale, rotateX, transformOrigin: "center 70%" }} className="absolute inset-0">
            <Image
              src={img(c.image, 2600)}
              alt={c.title}
              fill
              quality={85}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: c.pos }}
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

        <motion.div style={{ y: textY, opacity: i === 0 ? 1 : textO }} className="absolute inset-x-0 bottom-0 text-[#f4f0e8]">
          <div className="container-sbi pb-12 md:pb-20 flex items-end justify-between gap-8">
            <div>
              <p className="text-[0.7rem] tracking-[0.3em] text-[#c98a52] mb-5">
                {c.index} / 0{categories.length}
              </p>
              <h3 className="font-serif text-[clamp(2.6rem,8vw,7rem)] leading-[0.98] uppercase tracking-[0.02em]">{c.title}</h3>
              <p className="mt-5 max-w-md text-[#f4f0e8]/75 leading-relaxed">{c.note}</p>
              {last && (
                <Link
                  href={INQUIRY_HREF}
                  className="inline-block mt-8 px-7 py-3.5 bg-[#f4f0e8] text-[#121110] text-[0.7rem] tracking-[0.24em] uppercase hover:bg-[#c98a52] transition-colors"
                >
                  Inquire
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section className="relative bg-ink">
      <div className="container-sbi pt-28 md:pt-40 pb-14 md:pb-20">
        <p className="eyebrow mb-6">Selected Work</p>
        <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.1] max-w-2xl">
          The pieces our clients notice first.
        </h2>
      </div>
      <div className="relative">
        {categories.map((c, i) => (
          <Panel key={c.title} c={c} i={i} last={i === categories.length - 1} />
        ))}
      </div>
    </section>
  );
}
