const services = [
  {
    num: "01",
    title: "Design",
    italic: "the look",
    description:
      "Custom design from a blank canvas. Type, grid, color, and pacing chosen for your business, not lifted from a kit everyone else is using.",
    tags: ["Art direction", "Layout", "Type"],
  },
  {
    num: "02",
    title: "Build",
    italic: "the engine",
    description:
      "Hand-written code. Fast on the cheapest phone, simple to update, and yours to keep. No monthly platform rent, no plugin tower waiting to break.",
    tags: ["Next.js", "Astro", "Hand-coded"],
  },
  {
    num: "03",
    title: "Identity",
    italic: "the face",
    description:
      "Logo, color, and a type system that holds together everywhere your business shows up, from the sign on the door to a story highlight.",
    tags: ["Logo", "Palette", "System"],
  },
  {
    num: "04",
    title: "Words",
    italic: "the plan",
    description:
      "We work out what the site is for, then write the pages in plain English. No filler paragraphs, no slogans nobody believes.",
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
              What you get,
              <br />
              <span className="font-display-italic text-accent">
                and who does it.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-ink/80 text-base lg:text-[17px] leading-[1.55]">
              One person designs it, builds it, and writes it. Every decision
              runs through one head, so nothing gets lost in a handoff and nobody
              books a meeting to schedule the next meeting.
            </p>
          </div>
        </div>

        {/* Service index — full-width rows */}
        <div className="border-t border-ink">
          {services.map((s) => (
            <div
              key={s.num}
              className="group grid grid-cols-12 gap-x-6 gap-y-4 items-start border-b border-rule py-8 lg:py-12 transition-colors"
            >
              {/* Number + title */}
              <div className="col-span-12 md:col-span-5 flex items-baseline gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted pt-3 group-hover:text-accent transition-colors">
                  {s.num}
                </span>
                <h3 className="font-display text-[44px] lg:text-[64px] text-ink leading-[0.92] tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {s.title}{" "}
                  <span className="font-display-italic text-accent text-[30px] lg:text-[40px]">
                    {s.italic}
                  </span>
                </h3>
              </div>

              {/* Description + tags */}
              <div className="col-span-12 md:col-span-6 md:col-start-7 max-w-xl">
                <p className="text-ink/85 leading-relaxed text-[15px] lg:text-base mb-4">
                  {s.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
                    >
                      {t}
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
