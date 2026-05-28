export default function Hero() {
  return (
    <section className="relative pt-36 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
      {/* Decorative top rule + meta */}
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10 lg:mb-14 rise rise-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              ◍ Independent Studio
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            <span>Vol. 01</span>
            <span>·</span>
            <span>Lynnwood / Remote</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>

        {/* Massive editorial headline */}
        <div className="relative">
          <h1 className="font-display text-[clamp(64px,12vw,200px)] text-ink leading-[0.88] tracking-[-0.035em] rise rise-2">
            <span className="block font-black">Websites with</span>
            <span className="block">
              <span className="font-display-italic font-medium text-accent">
                character,
              </span>
            </span>
            <span className="block font-black">built by hand.</span>
          </h1>

          {/* Decorative asterisk */}
          <div className="absolute -top-6 right-0 sm:right-8 lg:right-24 hidden sm:block">
            <svg
              viewBox="0 0 100 100"
              className="w-12 lg:w-20 text-accent spin-slow"
              fill="currentColor"
            >
              <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
            </svg>
          </div>
        </div>

        {/* Sub-grid: lede + intro */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-14 lg:mt-20 rise rise-3">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 md:col-start-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              ¶ The studio
            </p>
            <p className="font-display text-2xl lg:text-[28px] leading-[1.15] text-ink tracking-tight">
              A small, sharp practice making sites that{" "}
              <span className="font-display-italic text-accent">don&apos;t look</span>{" "}
              like everyone else&apos;s.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              ¶ What we do
            </p>
            <p className="text-base lg:text-[17px] leading-[1.55] text-ink/85">
              We design and build websites for restaurants, barbers, and small
              businesses with a point of view. Strategy, design, code — all from
              the same desk. No handoffs, no committees.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
              >
                See the work
                <span className="arrow-pop">↗</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-ink px-1 py-3 text-sm font-medium border-b border-ink hover:text-accent hover:border-accent transition-colors"
              >
                <span className="marker">Start a project</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 lg:mt-28 pt-8 border-t border-rule grid grid-cols-2 lg:grid-cols-4 gap-y-8 rise rise-4">
          {[
            { num: "04", label: "Projects shipped", suffix: "+" },
            { num: "100", label: "On-time delivery", suffix: "%" },
            { num: "02", label: "Years in practice", suffix: "+" },
            { num: "01", label: "Designer at the keyboard" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-[64px] lg:text-[88px] leading-none text-ink tracking-tighter">
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

      {/* Bottom ticker */}
      <div className="mt-20 lg:mt-28 border-y border-rule py-4 overflow-hidden bg-paper-deep/30">
        <div className="flex ticker whitespace-nowrap font-display text-3xl lg:text-5xl tracking-tight text-ink/90">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "Web design",
                "Brand systems",
                "Editorial layouts",
                "Restaurant sites",
                "Local business",
                "Custom builds",
                "No templates",
              ].map((word) => (
                <span key={`${i}-${word}`} className="flex items-center px-6">
                  <span>{word}</span>
                  <span className="ml-12 text-accent font-display-italic">
                    ✺
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
