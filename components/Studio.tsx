const colophon = [
  { label: "Founded", value: "2026 · Lynnwood, WA" },
  { label: "Practice", value: "Web design + build, one pair of hands" },
  {
    label: "Method",
    value: "Hand-coded. No page builders, no templates, no plugins-as-architecture.",
  },
  { label: "Clients", value: "Restaurants, barbers, and shops with a point of view" },
  { label: "Promise", value: "Built once. No redesign for five years." },
];

const refusals = [
  "Templates. Not as a starting point, not ever.",
  "Stock photos standing in for your actual room.",
  "Fourteen-tab dashboards you'll never log into.",
  "A retainer you can't cancel by email.",
  "Handing you a CMS and calling it a website.",
];

export default function Studio() {
  return (
    <section
      id="studio"
      className="relative py-24 lg:py-36 bg-paper-deep overflow-hidden"
    >
      {/* Oversized masthead watermark — decorative depth */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-[0.18em] -right-6 lg:right-4 font-display font-black text-ink/[0.04] leading-none tracking-[-0.04em] text-[34vw] lg:text-[22vw]"
      >
        Ussly
      </span>

      <div className="relative max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Left rail — colophon kicker */}
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent rise">
              / The Studio
            </span>
            <div className="dotted-rule text-ink/25 mt-4 hidden md:block" />
            <p className="hidden md:block mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted leading-relaxed">
              Colophon
              <br />
              No. 01
            </p>
          </div>

          {/* Manifesto headline */}
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,104px)] text-ink leading-[0.92] tracking-tight rise">
              We&apos;d rather build
              <br />
              ten sites well,
              <br />
              <span className="font-display-italic text-accent">
                than a hundred fast.
              </span>
            </h2>
          </div>
        </div>

        {/* Lede + colophon + refusals */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-14 mt-16 lg:mt-24">
          {/* Lede + masthead colophon */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-4">
            <p className="font-display text-2xl lg:text-[30px] leading-[1.2] text-ink tracking-tight max-w-xl">
              Ussly is one designer-developer in Lynnwood, not an agency floor in
              three time zones. Every line of every site is{" "}
              <span className="font-display-italic text-accent">
                hand-written and read twice.
              </span>
            </p>
            <p className="mt-6 text-base lg:text-[17px] leading-[1.6] text-ink/80 max-w-lg">
              I take a handful of projects a year so each one gets the attention
              it&apos;s paying for. You work with the person building the thing,
              start to finish. No account manager playing telephone.
            </p>

            {/* Masthead colophon grid */}
            <dl className="mt-12 border-t border-rule">
              {colophon.map((row) => (
                <div
                  key={row.label}
                  className="group grid grid-cols-12 gap-x-4 items-baseline py-4 border-b border-rule transition-colors"
                >
                  <dt className="col-span-4 sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted group-hover:text-accent transition-colors">
                    {row.label}
                  </dt>
                  <dd className="col-span-8 sm:col-span-9 text-[15px] leading-[1.5] text-ink/85 transition-transform duration-300 ease-out group-hover:translate-x-1">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Refusals — single-sided POV list */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">
              Things we won&apos;t do
            </p>
            <ul className="space-y-0">
              {refusals.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-4 py-4 border-t border-rule last:border-b"
                >
                  <span className="font-display-italic text-2xl text-accent leading-none shrink-0 w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.5] text-ink/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-display-italic text-2xl lg:text-[26px] text-ink leading-tight">
              Made by hand,
              <br />
              in Lynnwood.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
