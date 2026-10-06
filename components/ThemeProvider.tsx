"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(Ctx);

/** Scene colours for the WebGL canvases (they can't read CSS variables). */
export const sceneBg = (t: Theme) => (t === "dark" ? "#121110" : "#f4f0e8");

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // the inline script in layout.tsx has already set data-theme before paint
  useEffect(() => {
    const t = document.documentElement.dataset.theme as Theme | undefined;
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        sessionStorage.setItem("sbi-theme", next);
      } catch {}
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
