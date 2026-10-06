import { useEffect } from "react";

const HEADER_H = () => (window.innerWidth < 768 ? 64 : 80);

/**
 * Drives `onProgress` (0 → 1) from the page scroll position while a tall
 * "track" element holds a sticky, full-screen stage pinned under the header.
 *
 * Because the stage is pinned by the browser itself (position: sticky), the
 * page physically cannot move past it until progress reaches 1 — and on the
 * way back up it cannot leave upward until progress is back at 0. It works
 * identically for wheel, trackpad, touch, keyboard and the scrollbar, with no
 * scroll hijacking to get out of step.
 *
 * `trackRef` is the tall outer element; its first child is the sticky stage.
 */
export function usePinnedProgress(
  trackRef: React.RefObject<HTMLElement>,
  onProgress: (p: number) => void
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const stage = track.firstElementChild as HTMLElement | null;
      if (!stage) return;
      const travel = track.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;
      const scrolled = HEADER_H() - track.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, scrolled / travel));
      if (p !== last) {
        last = p;
        onProgress(p);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
