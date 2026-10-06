"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IMG, img, company, INQUIRY_HREF } from "@/lib/data";

/** The last beat of the story. No second form here — the inquiry lives on the Contact page. */
export default function InquiryCTA() {
  return (
    <section className="relative overflow-hidden bg-black text-[#f4f0e8]">
      <div className="absolute inset-0">
        <Image src={img(IMG.woodwork, 2400)} alt="" fill sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/85" />
      </div>

      <div className="relative container-sbi py-32 md:py-48 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[0.7rem] tracking-[0.3em] uppercase text-[#f4f0e8]/60 mb-8"
        >
          Inquire
        </motion.p>
        <h2 className="font-serif text-[clamp(2.3rem,7vw,5.6rem)] leading-[1.04] max-w-4xl mx-auto">
          {["Begin your", "inquiry."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>
        <p className="mt-8 max-w-md mx-auto text-[#f4f0e8]/70 leading-relaxed">
          Kitchens, wardrobes, cupboards, doors or chowkhats — tell us about your space and we will take it from there.
        </p>
        <Link
          href={INQUIRY_HREF}
          className="inline-block mt-10 px-9 py-4 bg-[#f4f0e8] text-[#121110] text-[0.72rem] tracking-[0.26em] uppercase hover:bg-[#c98a52] transition-colors duration-300"
        >
          Send Inquiry
        </Link>
        <div className="mt-14 flex flex-col md:flex-row justify-center gap-4 md:gap-12 text-sm text-[#f4f0e8]/70">
          {company.contacts.map((c) => (
            <a key={c.phone} href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-[#c98a52] transition-colors">
              {c.name} · {c.phone}
            </a>
          ))}
          <a href={`mailto:${company.email}`} className="hover:text-[#c98a52] transition-colors">{company.email}</a>
        </div>
      </div>
    </section>
  );
}
