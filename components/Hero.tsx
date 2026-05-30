export default function Hero() {
  return (
    <section className="relative pt-16 lg:pt-24 pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10 lg:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Independent Studio · Vol. 01
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            <span>Lynnwood / Remote</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>

        {/* Massive editorial headline */}
        <h1 className="font-display text-[clamp(64px,12vw,200px)] text-ink leading-[0.88] tracking-[-0.035em] rise">
          <span className="block font-black">Websites that</span>
          <span className="block">
            <span className="font-display-italic font-medium text-accent">
              earn their keep,
            </span>
          </span>
          <span className="block font-black">built by hand.</span>
        </h1>

        {/* Sub-grid: lede + intro */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-14 lg:mt-20">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 md:col-start-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              The studio
            </p>
            <p className="font-display text-2xl lg:text-[28px] leading-[1.15] text-ink tracking-tight">
              A small, sharp practice making sites that{" "}
              <span className="font-display-italic text-accent">don&apos;t look</span>{" "}
              like everyone else&apos;s.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              What it&apos;s worth
            </p>
            <p className="text-base lg:text-[17px] leading-[1.55] text-ink/85">
              Most small-business sites are a tax. Ours pay rent — more bookings,
              better search rank, fewer no-shows. Built once, hand-coded, no
              redesign for five years. The cost? Less than three months of
              third-party Squarespace + plugins.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                Claim the slot
                <span>↗</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-ink px-1 py-3 text-sm font-medium border-b border-ink hover:text-accent hover:border-accent transition-colors"
              >
                See receipts
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip — receipts */}
        <div className="mt-20 lg:mt-28 pt-8 border-t border-rule grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {[
            { prefix: "+", num: "42", suffix: "%", label: "Reservations lift · Yemeni House" },
            { prefix: "#", num: "1", suffix: "", label: "On Google · Northwest Fades" },
            { prefix: "", num: "0.9", suffix: "s", label: "Page-load, every site" },
            { prefix: "", num: "0", suffix: "", label: "Templates used. Ever." },
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
    </section>
  );
}
