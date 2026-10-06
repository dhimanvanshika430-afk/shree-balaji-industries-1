"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { company, inquiryOptions, PROJECT, img } from "@/lib/data";

const mapsQuery = encodeURIComponent(
  `${company.address.line1}, ${company.address.line2}`
);

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function ContactPage() {
  const [service, setService] = useState(inquiryOptions[0]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });
  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email,
          service,
          message: f.message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Failed to submit inquiry. Please try again."
        );
      }

      setSent(true);
      setF({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="relative bg-ink text-paper">
      <Navbar />

      {/* ambient glow accents for visual interest */}
      <div className="pointer-events-none absolute top-24 -left-24 w-96 h-96 rounded-full bg-clay/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-[40%] -right-24 w-[28rem] h-[28rem] rounded-full bg-clay/[0.06] blur-[140px]" />

      {/* Hero split: copy + a real photo */}
      <section className="relative pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="container-sbi grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div>
            <div className="pl-4 sm:pl-6 lg:pl-2">
              <motion.p {...fadeUp()} className="eyebrow mb-6">
                Contact Us
              </motion.p>
              <motion.h1
                {...fadeUp(0.05)}
                className="font-serif text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.08]"
              >
                Tell us about the space you want to transform.
              </motion.h1>
              <motion.p
                {...fadeUp(0.1)}
                className="text-muted mt-6 max-w-md leading-relaxed"
              >
                Share your room dimensions, budget and timeline. Our team
                measures on site, drafts a cutting plan before any material is
                ordered, and builds every piece at our Panchkula unit.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.15)} className="mt-12 space-y-7 max-w-md pl-4 sm:pl-6 lg:pl-2">
              {company.contacts.map((c) => (
                <motion.div
                  key={c.phone}
                  className="hr-line pt-6"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs tracking-widest2 text-clay mb-3">
                    {c.role}
                  </p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="flex items-baseline justify-between group"
                  >
                    <span className="font-serif text-xl group-hover:text-clay transition-colors">
                      {c.name}
                    </span>
                    <span className="text-muted text-sm group-hover:text-clay transition-colors">
                      {c.phone}
                    </span>
                  </a>
                </motion.div>
              ))}

              <motion.div className="hr-line pt-6" whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <p className="text-xs tracking-widest2 text-clay mb-3">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="font-serif text-xl hover:text-clay transition-colors break-all"
                >
                  {company.email}
                </a>
              </motion.div>

              <motion.div className="hr-line pt-6" whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <p className="text-xs tracking-widest2 text-clay mb-3">
                  Instagram
                </p>
                <a
                  href={`https://instagram.com/${company.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl hover:text-clay transition-colors"
                >
                  @{company.instagram}
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* real photo, replacing the 3D scene that used to sit here */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full border border-line overflow-hidden"
          >
            <Image
              src={img(PROJECT.contactCanteen, 1800)}
              alt="Canteen counter fit-out by Shree Balaji Industries"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 text-xs tracking-widest2 text-muted">
              Canteen &amp; counter fit-outs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visit / leadership strip */}
      <section className="relative hr-line py-20">
        <div className="container-sbi grid md:grid-cols-[1.1fr_0.9fr] gap-16">
          <div>
            <p className="eyebrow mb-6">Visit Us</p>
            <h2 className="font-serif text-2xl md:text-3xl leading-snug max-w-md">
              {company.address.line1}
              <br />
              {company.address.line2}
            </h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-7 py-3.5 bg-paper text-ink text-sm tracking-wide hover:bg-clay transition-colors"
            >
              Get Directions
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs tracking-widest2 text-clay mb-3">
                Chairman
              </p>
              <p className="font-serif text-xl">{company.chairman}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest2 text-clay mb-3">
                Director
              </p>
              <p className="font-serif text-xl">{company.director}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="relative py-24 scroll-mt-24">
        <div className="container-sbi grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <div>
            <p className="eyebrow mb-6">Begin Your Inquiry</p>
            <h2 className="font-serif text-2xl md:text-3xl leading-snug max-w-sm">
              A few details about what you need, and we will come back to you.
            </h2>
            <p className="text-muted mt-6 max-w-sm leading-relaxed">
              For faster service, call {company.contacts[0].name.split(" ")[0]}{" "}
              or {company.contacts[1].name.split(" ")[0]} directly using the
              numbers above.
            </p>
          </div>

          <div className="max-w-xl">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hr-line pt-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border border-clay flex items-center justify-center text-clay text-xl mb-4">
                  ✓
                </div>
                <p className="font-serif text-3xl">Inquiry Received</p>
                <p className="text-muted max-w-md leading-relaxed">
                  Thank you. Your inquiry for{" "}
                  <span className="text-paper font-medium">
                    {service.toLowerCase()}
                  </span>{" "}
                  has been recorded in our system. Our team will review your
                  specifications and contact you shortly.
                </p>
                <p className="text-muted text-sm max-w-md leading-relaxed pt-2">
                  For urgent requirements, you can also reach {company.contacts[1].name}{" "}
                  directly at{" "}
                  <a
                    href={`tel:${company.contacts[1].phone.replace(/\s/g, "")}`}
                    className="text-clay hover:underline"
                  >
                    {company.contacts[1].phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 inline-block px-6 py-2.5 border border-line text-xs uppercase tracking-widest hover:border-clay hover:text-clay transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="p-4 bg-red-950/40 border border-red-800 text-sm text-red-200">
                    <p className="font-medium mb-1">Submission notice:</p>
                    <p className="text-xs text-red-300">{errorMsg}</p>
                    <div className="mt-3 text-xs flex gap-4">
                      <a
                        href={`mailto:${company.email}?subject=Inquiry%20from%20Website`}
                        className="underline text-clay hover:text-paper"
                      >
                        Email us directly
                      </a>
                      <a
                        href={`tel:${company.contacts[0].phone.replace(/\s/g, "")}`}
                        className="underline text-clay hover:text-paper"
                      >
                        Call us directly
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest2 text-muted mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      {...bind("name")}
                      disabled={loading}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-transparent border-b border-line py-3 focus:outline-none focus:border-clay transition-colors placeholder:text-muted/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest2 text-muted mb-2">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      {...bind("phone")}
                      disabled={loading}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-transparent border-b border-line py-3 focus:outline-none focus:border-clay transition-colors placeholder:text-muted/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest2 text-muted mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    {...bind("email")}
                    disabled={loading}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-transparent border-b border-line py-3 focus:outline-none focus:border-clay transition-colors placeholder:text-muted/40"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest2 text-muted mb-2">
                    What are you looking for?
                  </label>
                  <select
                    value={service}
                    disabled={loading}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-ink border-b border-line py-3 focus:outline-none focus:border-clay transition-colors"
                  >
                    {inquiryOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-widest2 text-muted mb-2">
                    Message / Project Details (Optional)
                  </label>
                  <textarea
                    rows={4}
                    {...bind("message")}
                    disabled={loading}
                    placeholder="Tell us about room dimensions, woodwork preferences, timeline..."
                    className="w-full bg-transparent border-b border-line py-3 focus:outline-none focus:border-clay transition-colors placeholder:text-muted/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-paper text-ink text-sm tracking-wide hover:bg-clay transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                      <span>SUBMITTING INQUIRY...</span>
                    </>
                  ) : (
                    "SEND INQUIRY"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
