"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECT } from "@/lib/data";

export default function FinalStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative h-[90vh] w-full overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={PROJECT.finalBathDouble} alt="" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />

      <motion.div style={{ y }} className="relative z-10 h-full flex items-center">
        <div className="container-sbi">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(1.8rem,5.2vw,4rem)] leading-[1.15] max-w-3xl"
          >
            Every space has its own character.
            <br />
            We create the details that complete it.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
