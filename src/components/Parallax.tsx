"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  /** 捲動速度倍率：正數往下、負數往上，0.3 代表捲 100px 移動 30px */
  speed: number;
  /** 捲動多少 px 後完全淡出（不填則不淡出） */
  fadeOut?: number;
  className?: string;
  children?: ReactNode;
};

export default function Parallax({ speed, fadeOut, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      if (fadeOut) el.style.opacity = String(Math.max(0, 1 - y / fadeOut));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, fadeOut]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
