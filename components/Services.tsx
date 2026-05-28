const services = [
  {
    num: "01",
    title: "Web Design",
    italic: "from blank page",
    description:
      "Custom site design, never templates. Typography, layout, and pacing built around your actual business — not a Figma kit.",
    tags: ["Layout", "Type", "Art direction"],
  },
  {
    num: "02",
    title: "Development",
    italic: "clean & fast",
    description:
      "Hand-written code. Sites load in under a second, work on every phone, and stay easy to update for the next five years.",
    tags: ["Next.js", "Astro", "Hand-coded"],
  },
  {
    num: "03",
    title: "Brand Identity",
    italic: "small but mighty",
    description:
      "Logo, palette, type system, and the dozen tiny details that make a brand feel coherent across a sign, a menu, and a screen.",
    tags: ["Logo", "Palette", "System"],
  },
  {
    num: "04",
    title: "Strategy & Copy",
    italic: "say it right",
    description:
      "We figure out what the site is actually for and write the words that go on it. Plain English, not marketing speak.",
    tags: ["Positioning", "Copy", "Sitemap"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-36 bg-paper-deep/40">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        {/* Section header — editorial spread */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              § II · Services
            </span>
            <div className="dotted-rule text-rule mt-4 hidden md:block" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,108px)] text-ink leading-[0.92] tracking-tight">
              What we make,
              <br />
              <span className="font-display-italic text-accent">
                end to end.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-ink/80 text-base lg:text-[17px] leading-[1.55]">
              One designer. One builder. Same person. That means every decision —
              from the typeface to the page-load tweak — runs through one head.
              Fewer meetings. Better outcomes.
            </p>
          </div>
        </div>

        {/* Service grid — alternating offsets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`group relative border-t border-ink py-8 lg:py-10 ${
                i % 2 === 1 ? "md:translate-y-12" : ""
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted pt-2">
                  {s.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-[40px] lg:text-[56px] text-ink leading-[0.95] tracking-tight">
                    {s.title}
                    <br />
                    <span className="font-display-italic text-accent text-[32px] lg:text-[44px]">
                      {s.italic}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="pl-0 md:pl-12 max-w-md">
                <p className="text-ink/85 leading-relaxed text-[15px] mb-4">
                  {s.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
                    >
                      ◦ {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
