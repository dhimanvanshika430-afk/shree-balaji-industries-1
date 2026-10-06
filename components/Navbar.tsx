"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { nav, INQUIRY_HREF } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ease-sbi ${
        scrolled
          ? "bg-ink/40 backdrop-blur-xl border-line/70 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.5)]"
          : "bg-ink/20 backdrop-blur-lg border-line/40"
      }`}
    >
      <div
        className={`container-sbi grid grid-cols-[auto_1fr_auto] items-center gap-6 transition-all duration-500 ease-sbi [text-shadow:0_1px_16px_rgb(var(--ink)/0.5)] ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex flex-col leading-none group" aria-label="Shree Balaji Industries — Home">
          <span className="font-serif text-[1.05rem] md:text-[1.2rem] tracking-[0.14em]">SHREE BALAJI</span>
          <span className="text-[0.56rem] tracking-[0.5em] text-muted mt-1.5 group-hover:text-clay transition-colors">
            INDUSTRIES
          </span>
        </Link>

        <nav className="hidden md:flex justify-center gap-12">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[0.7rem] tracking-[0.24em] uppercase transition-colors duration-300 ${
                  active ? "text-clay" : "text-paper/80 hover:text-paper"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-0.5 h-px bg-clay" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href={INQUIRY_HREF}
            className="hidden sm:inline-flex items-center gap-2 border border-paper/70 px-5 py-2.5 text-[0.68rem] tracking-[0.26em] uppercase hover:bg-paper hover:text-ink transition-colors duration-300"
          >
            Inquire
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 w-7"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-ink border-t border-line"
        >
          <div className="container-sbi flex flex-col py-8 gap-6">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="font-serif text-2xl tracking-wide">
                {item.label}
              </Link>
            ))}
            <Link
              href={INQUIRY_HREF}
              className="mt-2 inline-flex justify-center border border-paper/70 px-5 py-3 text-[0.72rem] tracking-[0.26em] uppercase"
            >
              Inquire
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
