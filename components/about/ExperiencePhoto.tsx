"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** One supplied photograph shown in full (never cropped), with its caption
 *  underneath. Landscape photos run edge to edge; portrait photos are centred
 *  at a comfortable height. */
export default function ExperiencePhoto({
  src,
  alt,
  width,
  height,
  eyebrow,
  title,
  text,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  eyebrow: string;
  title: string;
  text: string;
}) {
  const portrait = height > width;
  return (
    <section className="relative bg-ink py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={
            portrait
              ? "mx-auto w-[min(88vw,520px)]"
              : "w-full"
          }
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={portrait ? "520px" : "100vw"}
            className="block w-full h-auto"
          />
        </div>

        <div className="container-sbi mt-8 md:mt-10">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h3 className="font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] max-w-lg leading-tight">
            {title}
          </h3>
          <p className="text-muted mt-3 max-w-md text-sm leading-relaxed">{text}</p>
        </div>
      </motion.div>
    </section>
  );
}
