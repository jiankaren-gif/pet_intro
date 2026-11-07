import Link from "next/link";

const links = [
  { href: "/#products", label: "商品" },
  { href: "/#features", label: "特色" },
  { href: "/#contact", label: "聯絡我們" },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-20 mx-auto mt-4 w-[calc(100%-2rem)] max-w-6xl">
      <nav className="relative flex items-center justify-between rounded-3xl border border-white/50 bg-white/30 px-6 py-3 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-xl">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🐶 毛孩出遊趣
        </Link>

        {/* 桌機選單 */}
        <div className="hidden items-center gap-8 sm:flex">
          <ul className="flex gap-8 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-sky-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#products"
            className="rounded-full bg-gradient-to-r from-sky-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-pink-500/30 transition hover:-translate-y-0.5"
          >
            立即選購
          </Link>
        </div>

        {/* 手機選單 */}
        <details className="group sm:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/60 bg-white/40 text-lg [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">☰</span>
            <span className="hidden group-open:inline">✕</span>
          </summary>
          <ul className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-3xl border border-white/50 bg-white/70 p-3 shadow-lg backdrop-blur-xl">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-2xl px-4 py-3 font-medium hover:bg-white/60">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
