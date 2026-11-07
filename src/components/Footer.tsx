const columns = [
  {
    title: "商品",
    links: [
      { href: "/#products", label: "防水雨衣" },
      { href: "/#products", label: "減震牽繩" },
      { href: "/#products", label: "防曬配件" },
    ],
  },
  {
    title: "顧客服務",
    links: [
      { href: "/#contact", label: "尺寸諮詢" },
      { href: "/#features", label: "退換貨說明" },
      { href: "/#features", label: "運送方式" },
    ],
  },
  {
    title: "聯絡我們",
    links: [
      { href: "mailto:hello@example.com", label: "hello@example.com" },
      { href: "tel:+886000000000", label: "(02) 0000-0000" },
      { href: "/#contact", label: "週一至週五 10:00–18:00" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto mb-6 w-[calc(100%-2rem)] max-w-6xl">
      <div className="rounded-3xl border border-white/50 bg-white/30 p-10 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-xl font-bold">🐶 毛孩出遊趣</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              晴天雨天都適用的寵物出遊裝備，陪伴毛孩每一次散步。
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-semibold">{c.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition hover:text-sky-600">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/60 pt-6 text-center text-sm text-slate-500">
          © 2026 毛孩出遊趣 · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
