"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "visitor-name";
const CHANGE_EVENT = "visitor-name-change";

// localStorage 不能用時（例如部分無痕模式）改存在記憶體，這次瀏覽仍會顯示
let memoryName = "";

function readName() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryName;
  } catch {
    return memoryName;
  }
}

function writeName(value: string) {
  memoryName = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function Welcome() {
  // 伺服器端回傳 null（還不知道稱呼），避免渲染時閃出 modal
  const name = useSyncExternalStore(subscribe, readName, () => null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const open = name === "" || editing;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function save(e: React.FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    writeName(value);
    setEditing(false);
  }

  return (
    <>
      {name && (
        <p className="mb-4 text-lg font-semibold text-slate-700">
          👋 歡迎你，<span className="text-pink-600">{name}</span>！
          <button
            type="button"
            onClick={() => {
              setDraft(name);
              setEditing(true);
            }}
            className="ml-2 text-sm font-normal text-slate-500 underline-offset-2 hover:text-sky-600 hover:underline"
          >
            更改稱呼
          </button>
        </p>
      )}

      {/* 用 portal 掛到 body，避免被 Parallax 的 transform 影響 fixed 定位 */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
            <form
              role="dialog"
              aria-modal="true"
              aria-labelledby="welcome-title"
              onSubmit={save}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-8 text-center shadow-[0_8px_32px_rgba(31,38,135,0.25)] backdrop-blur-2xl"
            >
              {/* 玻璃亮面反光 */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

              <div className="relative">
                <div className="text-6xl">🐶</div>
                <h2 id="welcome-title" className="mt-4 text-2xl font-bold">
                  歡迎來到毛孩出遊趣！
                </h2>
                <p className="mt-2 text-sm text-slate-600">請問我們該怎麼稱呼你呢？</p>

                <input
                  type="text"
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={20}
                  placeholder="輸入你的稱呼"
                  className="mt-6 w-full rounded-full border border-white/70 bg-white/70 px-5 py-3 text-center outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/50"
                />

                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-sky-500 to-pink-500 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  進入官網
                </button>
              </div>
            </form>
          </div>,
          document.body,
        )}
    </>
  );
}
