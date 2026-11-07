"use client";

import { useEffect, useRef, useState } from "react";

const WIN_RATE = 0.1; // 中獎機率 10%
const COUPON_CODE = "MANGO90";

type Status = "idle" | "drawing" | "win" | "lose";

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  // 開啟時鎖住背景捲動，並可用 Esc 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function close() {
    window.clearTimeout(timer.current);
    setOpen(false);
    setStatus("idle");
    setCopied(false);
  }

  function draw() {
    setStatus("drawing");
    setCopied(false);
    timer.current = window.setTimeout(() => {
      setStatus(Math.random() < WIN_RATE ? "win" : "lose");
    }, 1500);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
    } catch {
      // 瀏覽器不允許複製時，使用者仍可手動選取代碼
    }
  }

  return (
    <>
      {/* 右下角浮動按鈕 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/40 transition hover:-translate-y-1 hover:shadow-xl"
      >
        <span className="text-xl">🎁</span>
        幸運抽獎
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lucky-draw-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-[0_8px_32px_rgba(31,38,135,0.25)] backdrop-blur-2xl"
          >
            {/* 玻璃亮面反光 */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-slate-500 transition hover:bg-white hover:text-slate-800"
            >
              ✕
            </button>

            <div className="relative">
              <h2 id="lucky-draw-title" className="text-2xl font-bold">
                🥭 芒果優惠券抽獎
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                有 10% 機會抽中全館 <b className="text-pink-600">9 折</b> 優惠券！
              </p>

              <div className="my-8 flex h-32 items-center justify-center text-7xl">
                {status === "idle" && <span>🎁</span>}
                {status === "drawing" && <span className="animate-bounce">🎁</span>}
                {status === "win" && <span className="animate-[pop_0.5s_ease-out]">🥭</span>}
                {status === "lose" && <span>🐾</span>}
              </div>

              {status === "idle" && (
                <button
                  type="button"
                  onClick={draw}
                  className="w-full rounded-full bg-gradient-to-r from-amber-400 to-pink-500 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
                >
                  開始抽獎
                </button>
              )}

              {status === "drawing" && (
                <p className="py-3 font-semibold text-slate-600">抽獎中…</p>
              )}

              {status === "win" && (
                <div>
                  <p className="text-xl font-bold text-pink-600">恭喜中獎！芒果優惠券 9 折</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <code className="select-all rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/80 px-4 py-2 font-mono text-lg font-bold tracking-widest text-amber-700">
                      {COUPON_CODE}
                    </code>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="rounded-xl bg-white/80 px-4 py-2.5 text-sm font-semibold transition hover:bg-white"
                    >
                      {copied ? "已複製 ✓" : "複製"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">結帳時輸入優惠碼即可享 9 折</p>
                </div>
              )}

              {status === "lose" && (
                <div>
                  <p className="text-lg font-semibold">差一點點！這次沒有中獎</p>
                  <button
                    type="button"
                    onClick={draw}
                    className="mt-6 w-full rounded-full border border-white/70 bg-white/60 py-3 font-semibold transition hover:bg-white"
                  >
                    再試一次
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
