"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** A short, quiet title sequence: the name rises, a hairline draws, the
 *  curtain parts. Plays once per browser session. */
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sbi-intro") === "1";
      sessionStorage.setItem("sbi-intro", "1");
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const word = "SHREE BALAJI";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[200] pointer-events-none"
          exit={{ transition: { duration: 0 } }}
        >
          {/* two curtain halves */}
          {["top", "bottom"].map((side) => (
            <motion.div
              key={side}
              className={`absolute left-0 right-0 h-1/2 bg-[#121110] ${side === "top" ? "top-0" : "bottom-0"}`}
              initial={{ y: 0 }}
              exit={{ y: side === "top" ? "-100%" : "100%" }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-[#f4f0e8]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex overflow-hidden">
              {word.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-[clamp(1.8rem,6vw,3.6rem)] tracking-[0.12em]"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-3 text-[0.65rem] tracking-[0.4em] text-[#f4f0e8]/60"
            >
              INDUSTRIES
            </motion.p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-px w-40 origin-left bg-[#c98a52]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
