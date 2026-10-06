"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECT } from "@/lib/data";

export default function CraftGrid() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-sbi mb-14">
        <p className="eyebrow mb-6">Our Craft</p>
        <h2 className="font-serif text-[clamp(1.8rem,4.4vw,3.2rem)] leading-tight max-w-xl">
          Close to the material, before it becomes furniture.
        </h2>
      </div>

      <div className="container-sbi grid grid-cols-6 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="col-span-6 md:col-span-4 relative aspect-[16/10] overflow-hidden group"
        >
          <Image
            src={PROJECT.craftCoworkingDining}
            alt="Breakout dining area fit-out"
            fill
            className="object-cover object-[50%_40%] transition-transform duration-700 ease-sbi group-hover:scale-105"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="col-span-3 md:col-span-2 relative aspect-square overflow-hidden group"
        >
          <Image
            src={PROJECT.craftPinkBedroom}
            alt="Bedroom fit-out"
            fill
            className="object-cover object-[50%_35%] transition-transform duration-700 ease-sbi group-hover:scale-105"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className="col-span-3 md:col-span-2 relative aspect-square overflow-hidden group"
        >
          <Image
            src={PROJECT.craftPoolRoom}
            alt="Breakout room with pool table"
            fill
            className="object-cover object-[50%_45%] transition-transform duration-700 ease-sbi group-hover:scale-105"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="col-span-6 md:col-span-4 relative aspect-[16/10] overflow-hidden group"
        >
          <Image
            src={PROJECT.craftDiningRoom}
            alt="Formal dining room fit-out"
            fill
            className="object-cover object-[50%_40%] transition-transform duration-700 ease-sbi group-hover:scale-105"
          />
        </motion.div>
      </div>

      <p className="container-sbi text-xs text-muted mt-6">
        From rooms we have fitted out — breakout dining, bedrooms,
        formal dining and pool/games rooms.
      </p>
    </section>
  );
}
