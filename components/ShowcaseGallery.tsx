"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useTheme, sceneBg } from "@/components/ThemeProvider";
import { usePinnedProgress } from "@/lib/usePinnedProgress";
import { showcase } from "@/lib/data";

/** Crop a photograph to the plane's aspect ratio (object-fit: cover, in GPU). */
function useCover(url: string, aspect: number) {
  const tex = useTexture(url);
  useMemo(() => {
    const im = tex.image as HTMLImageElement;
    const ia = im.width / im.height;
    if (ia > aspect) {
      tex.repeat.set(aspect / ia, 1);
      tex.offset.set((1 - aspect / ia) / 2, 0);
    } else {
      tex.repeat.set(1, ia / aspect);
      tex.offset.set(0, (1 - ia / aspect) / 2);
    }
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
  }, [tex, aspect]);
  return tex;
}

function Slide({ i, url, w, h, gap, cur }: { i: number; url: string; w: number; h: number; gap: number; cur: React.MutableRefObject<number> }) {
  const tex = useCover(url, w / h);
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!g.current) return;
    const d = i - cur.current; // distance from centre, in slides
    g.current.position.x = d * gap;
    g.current.position.z = -Math.min(Math.abs(d), 2.5) * 0.9;
    g.current.rotation.y = THREE.MathUtils.clamp(-d * 0.22, -0.6, 0.6);
    const s = 1 - Math.min(Math.abs(d), 1) * 0.1;
    g.current.scale.setScalar(s);
  });
  return (
    <group ref={g}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.06, h + 0.06]} />
        <meshBasicMaterial color="#c98a52" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Scene({ progress, onIndex }: { progress: React.MutableRefObject<number>; onIndex: (i: number) => void }) {
  const { theme } = useTheme();
  const vp = useThree((s) => s.viewport);
  const cur = useRef(0);
  const shown = useRef(0);

  let h = vp.height * 0.6;
  let w = h * 1.3;
  if (w > vp.width * 0.82) {
    w = vp.width * 0.82;
    h = w / 1.3;
  }
  const gap = w * 1.18;

  useFrame((_, dt) => {
    const target = progress.current * (showcase.length - 1);
    cur.current += (target - cur.current) * Math.min(1, dt * 9); // tight follow — no lag behind the locked wheel input
    const idx = Math.round(cur.current);
    if (idx !== shown.current) {
      shown.current = idx;
      onIndex(idx);
    }
  });

  return (
    <>
      <color attach="background" args={[sceneBg(theme)]} />
      <Suspense fallback={null}>
        {showcase.map((s, i) => (
          <Slide key={s.index} i={i} url={s.image} w={w} h={h} gap={gap} cur={cur} />
        ))}
      </Suspense>
    </>
  );
}

/**
 * Vertical scroll drives sideways travel, in two strict phases (see
 * usePinnedProgress): the stage stays pinned while the work travels sideways
 * all the way to the end; only then does the page continue down. Scrolling
 * back up travels fully back to the start before the page moves up again.
 */
export default function ShowcaseGallery() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [idx, setIdx] = useState(0);
  const [bar, setBar] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  usePinnedProgress(ref, (p) => {
    progress.current = p;
    setBar(p);
  });

  return (
    <section
      id="collection"
      ref={ref}
      className="pin-track-gallery relative bg-ink scroll-mt-16 md:scroll-mt-20"
    >
      <div className="pin-stage bg-ink">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }} dpr={[1, 2]}>
            <Scene progress={progress} onIndex={setIdx} />
          </Canvas>
        )}

        <div className="pointer-events-none absolute top-8 md:top-12 inset-x-0">
          <div className="container-sbi flex items-start justify-between">
            <div>
              <p className="eyebrow mb-4">The Collection</p>
              <h2 className="font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight max-w-md">
                Explore the spaces we&rsquo;ve built.
              </h2>
            </div>
            <p className="font-serif text-clay text-sm tabular-nums mt-1">
              {String(idx + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent pt-24 pb-8 md:pb-10">
          <div className="container-sbi flex items-end justify-between gap-8">
            <motion.div key={idx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-xs text-clay tracking-[0.24em] mb-2">{showcase[idx].index}</p>
              <h3 className="font-serif text-2xl md:text-4xl">{showcase[idx].title}</h3>
              <p className="text-muted text-sm mt-2 max-w-sm">{showcase[idx].note}</p>
            </motion.div>
            <div className="hidden md:block w-56">
              <div className="h-px bg-line relative overflow-hidden">
                <span className="absolute inset-y-0 left-0 bg-clay h-px origin-left" style={{ width: `${bar * 100}%` }} />
              </div>
              <p className="text-[0.62rem] tracking-[0.24em] text-muted mt-3 text-right">
                {bar < 1 ? "KEEP SCROLLING" : "CONTINUE ↓"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
