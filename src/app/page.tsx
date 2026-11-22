import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import LuckyDraw from "@/components/LuckyDraw";
import Welcome from "@/components/Welcome";

const products = [
  {
    emoji: "🌧️",
    name: "輕透防水特製雨衣",
    desc: "透氣防水布料，四腳包覆設計，雨天散步也能保持乾爽。附反光條，夜間更安全。",
    price: "NT$ 890 起",
    tags: ["防水透氣", "夜間反光", "S–XL 尺寸"],
  },
  {
    emoji: "🦮",
    name: "舒適減震牽繩",
    desc: "彈性緩衝段吸收暴衝力道，軟墊握把不勒手，搭配快扣設計，出門一扣就走。",
    price: "NT$ 650 起",
    tags: ["彈性緩衝", "軟墊握把", "快扣設計"],
  },
  {
    emoji: "☀️",
    name: "寵物防曬配件",
    desc: "UPF 50+ 防曬衣、遮陽帽與護目鏡，減少紫外線對毛孩皮膚與眼睛的傷害。",
    price: "NT$ 490 起",
    tags: ["UPF 50+", "涼感布料", "護眼設計"],
  },
];

const features = [
  { icon: "🐾", title: "毛孩實測", text: "每款商品都經過狗狗貓咪實際試穿試用" },
  { icon: "🚚", title: "快速出貨", text: "現貨 24 小時內出貨，滿千免運" },
  { icon: "🔁", title: "尺寸安心換", text: "尺寸不合 7 天內免費換貨" },
];

// 主視覺周圍漂浮的玻璃小物，各自用不同速度移動製造景深
const floaters = [
  { emoji: "🐾", speed: -0.35, className: "left-[6%] top-16 h-20 w-20 text-3xl" },
  { emoji: "☂️", speed: 0.15, className: "right-[8%] top-10 h-24 w-24 text-4xl" },
  { emoji: "🦴", speed: -0.6, className: "left-[12%] bottom-4 h-16 w-16 text-2xl" },
  { emoji: "🕶️", speed: -0.2, className: "right-[14%] bottom-0 h-20 w-20 text-3xl" },
];

const glass =
  "rounded-3xl border border-white/50 bg-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-xl";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-12">
      {/* 主視覺 */}
      <section className="relative py-28">
        {floaters.map((f) => (
          <Parallax
            key={f.emoji}
            speed={f.speed}
            className={`pointer-events-none absolute hidden md:block ${f.className}`}
          >
            <div className={`${glass} flex h-full w-full items-center justify-center`}>
              {f.emoji}
            </div>
          </Parallax>
        ))}

        <Parallax speed={0.35} fadeOut={650} className="flex flex-col items-center text-center">
          <Welcome />
          <span className={`${glass} mb-6 px-4 py-1.5 text-sm font-medium text-sky-700`}>
            2026 秋冬新品上市
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            晴天雨天，
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-pink-500 bg-clip-text text-transparent">
              都陪毛孩出門走走
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            從防水雨衣、減震牽繩到防曬配件，為每一次散步準備最舒適的裝備。
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#products"
              className="rounded-full bg-gradient-to-r from-sky-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              逛逛商品
            </a>
            <a
              href="#contact"
              className={`${glass} rounded-full px-8 py-3 font-semibold transition hover:bg-white/50`}
            >
              聯絡我們
            </a>
          </div>
        </Parallax>
      </section>

      {/* 商品 */}
      <section id="products" className="relative scroll-mt-28 py-12">
        <Reveal>
          <h2 className="mb-10 text-center text-3xl font-bold">熱門商品</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 150}>
              <article
                className={`${glass} group relative h-full overflow-hidden p-8 transition hover:-translate-y-1 hover:bg-white/40`}
              >
                {/* 玻璃亮面反光 */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
                <div className="relative">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/60 bg-white/50 text-4xl shadow-inner transition group-hover:scale-110 group-hover:-rotate-6">
                    {p.emoji}
                  </div>
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{p.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/60 bg-white/40 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-lg font-bold text-pink-600">{p.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 特色 */}
      <section id="features" className="relative scroll-mt-28 py-12">
        <Reveal>
          <div className={`${glass} grid gap-8 p-10 sm:grid-cols-3`}>
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 聯絡 */}
      <section id="contact" className="relative scroll-mt-28 py-12">
        <Reveal>
          <div className={`${glass} relative overflow-hidden p-10 text-center`}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl font-bold">想幫毛孩挑選合適的尺寸？</h2>
              <p className="mt-4 text-slate-600">
                留下訊息，我們的毛孩顧問會協助你找到最適合的裝備。
              </p>
              <a
                href="mailto:hello@example.com"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-sky-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
              >
                寄信給我們
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <LuckyDraw />
    </main>
  );
}
