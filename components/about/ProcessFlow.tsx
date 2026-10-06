"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";

export default function ProcessFlow() {
  return (
    <section className="bg-ink py-24 md:py-36">
      <div className="container-sbi mb-16">
        <p className="eyebrow mb-6">Our Approach</p>
        <h2 className="font-serif text-[clamp(1.8rem,4.4vw,3.2rem)] leading-tight max-w-xl">
          Five stages, the same on every project.
        </h2>
      </div>

      <div className="container-sbi">
        <div className="hidden md:block relative h-px bg-line mb-2" />
        <div className="grid md:grid-cols-5 gap-10 md:gap-6">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="hr-line pt-6 md:border-none md:pt-0 relative"
            >
              <div className="hidden md:block absolute -top-[1px] left-0 w-2 h-2 rounded-full bg-clay -translate-y-1/2" />
              <p className="font-serif text-clay text-sm mb-4">{s.step}</p>
              <h3 className="font-serif text-xl mb-3">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
