"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { serviceStory } from "@/lib/data";

export default function ServiceStory() {
  return (
    <section className="bg-ink py-4 md:py-10">
      {serviceStory.map((s, i) => (
        <div
          key={s.title}
          className="container-sbi grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24"
        >
          <div
            className={`relative aspect-[4/5] overflow-hidden ${
              i % 2 === 1 ? "md:order-2" : ""
            }`}
            style={{ perspective: "1400px" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.25, rotateX: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ transformOrigin: "center 70%" }}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 === 1 ? "md:order-1" : ""}
            style={{ perspective: "1000px", transformOrigin: "center top" }}
          >
            <p className="text-xs text-clay tracking-widest2 mb-5">{s.tag}</p>
            <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight max-w-sm">
              {s.title}
            </h2>
            <p className="text-muted mt-6 max-w-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
