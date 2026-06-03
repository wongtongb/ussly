export default function Hero() {
  return (
    <section className="relative pt-16 lg:pt-24 pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10 lg:mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Independent Studio · Vol. 02
          </span>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            <span>Lynnwood / Remote</span>
            <span>·</span>
            <span>Est. 2026</span>
          </div>
        </div>

        {/* Massive editorial headline */}
        <h1 className="font-display text-[clamp(60px,11.5vw,190px)] text-ink leading-[0.88] tracking-[-0.035em] rise">
          <span className="block font-black">The one website</span>
          <span className="block">
            <span className="font-display-italic font-medium text-accent text-glow">
              your block
            </span>
          </span>
          <span className="block font-black">remembers.</span>
        </h1>

        {/* Sub-grid: lede + intro */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-14 lg:mt-20">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 md:col-start-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              The studio
            </p>
            <p className="font-display text-2xl lg:text-[28px] leading-[1.15] text-ink tracking-tight">
              A one-person practice building sites for the kind of place people{" "}
              <span className="font-display-italic text-accent">
                drive across town
              </span>{" "}
              for.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              Why it&apos;s different
            </p>
            <p className="text-base lg:text-[17px] leading-[1.55] text-ink/85">
              A template makes your shop look like the shop next door. We start
              from your actual room, your actual menu, your actual regulars, and
              hand-code something that still loads under a second and still looks
              right in five years. Costs less than a year of Squarespace plus
              plugins.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group glow inline-flex items-center gap-2 bg-accent text-paper px-5 py-3 rounded-full text-sm font-medium hover:bg-accent-deep transition-colors"
              >
                Start a project
                <span>↗</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-ink px-1 py-3 text-sm font-medium border-b border-ink hover:text-accent hover:border-accent transition-colors"
              >
                See the work
              </a>
            </div>
          </div>
        </div>

        {/* Ledger strip — receipts */}
        <div className="mt-20 lg:mt-28 pt-6 border-t border-ink">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-8">
            The receipts
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {[
              { prefix: "+", num: "42", suffix: "%", label: "Reservations after launch · Yemeni House" },
              { prefix: "#", num: "1", suffix: "", label: "Google result · Northwest Fades" },
              { prefix: "", num: "0.9", suffix: "s", label: "Page load, every build" },
              { prefix: "", num: "0", suffix: "", label: "Templates used, lifetime" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display text-[64px] lg:text-[88px] leading-none text-ink tracking-tighter">
                  {stat.prefix && (
                    <span className="text-accent font-display-italic">{stat.prefix}</span>
                  )}
                  {stat.num}
                  {stat.suffix && (
                    <span className="text-accent font-display-italic">{stat.suffix}</span>
                  )}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-2 max-w-[180px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
