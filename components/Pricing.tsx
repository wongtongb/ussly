const tiers = [
  {
    num: "01",
    name: "Starter",
    price: "250",
    tag: "One page, done right",
    items: [
      "A single sharp page — hero, services, contact",
      "Mobile-tuned and quick to load",
      "One round of revisions",
    ],
    note: "A new shop, or a link-in-bio you're not embarrassed by.",
    featured: false,
  },
  {
    num: "02",
    name: "Standard",
    price: "400",
    tag: "The full small-business site",
    items: [
      "Up to five pages, built around your business",
      "Contact form plus Google and Maps setup",
      "Two rounds of revisions",
    ],
    note: "Where most restaurants and shops land.",
    featured: true,
  },
  {
    num: "03",
    name: "Complete",
    price: "500",
    tag: "Site, plus the polish",
    items: [
      "Everything in Standard",
      "Copywriting and local-SEO basics",
      "A month of post-launch tweaks",
    ],
    note: "When you want it handled end to end.",
    featured: false,
  },
  {
    num: "04",
    name: "Brand + Site",
    price: "750",
    tag: "Identity, and the site to match",
    items: [
      "Logo, color, and a type system",
      "The Complete site on your new brand",
      "Built from one cohesive direction",
    ],
    note: "Starting a business from scratch.",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-36 bg-paper-deep overflow-hidden"
    >
      <div className="relative max-w-[1380px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              / Pricing
            </span>
            <div className="dotted-rule text-ink/25 mt-4 hidden md:block" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,108px)] text-ink leading-[0.92] tracking-tight">
              Honest prices,
              <br />
              <span className="font-display-italic text-accent">up front.</span>
            </h2>
            <p className="mt-6 max-w-xl text-ink/80 text-base lg:text-[17px] leading-[1.55]">
              No quote-by-appointment games. Here is what a site costs, start to
              finish. One-time, no monthly rent, paid in two halves: one to
              start, one at launch.
            </p>
          </div>
        </div>

        {/* Price index — full-width rows */}
        <div className="border-t border-ink">
          {tiers.map((t) => (
            <div
              key={t.num}
              className="group grid grid-cols-12 gap-x-6 gap-y-6 items-start border-b border-rule py-10 lg:py-14"
            >
              {/* Name + price */}
              <div className="col-span-12 md:col-span-5 lg:col-span-4">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    {t.num}
                  </span>
                  {t.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      Most pick this
                    </span>
                  )}
                </div>
                <h3 className="font-display text-4xl lg:text-5xl text-ink leading-[0.95] tracking-tight mb-4">
                  {t.name}
                </h3>
                <p className="font-display text-[72px] lg:text-[96px] leading-none tracking-tighter text-ink">
                  <span className="font-display-italic text-accent align-top text-[36px] lg:text-[44px] mr-1">
                    $
                  </span>
                  {t.price}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-3">
                  One-time · {t.tag}
                </p>
              </div>

              {/* What's included + choose */}
              <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7">
                <ul className="space-y-3">
                  {t.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[15px] lg:text-base text-ink/85 leading-[1.5]"
                    >
                      <span className="font-display-italic text-accent shrink-0">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-display-italic text-xl text-ink/70">
                  {t.note}
                </p>
              </div>

              {/* CTA */}
              <div className="col-span-12 lg:col-span-2 lg:text-right">
                <a
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 text-sm font-medium text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors"
                >
                  Choose {t.name}
                  <span className="transition-transform group-hover/btn:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Note
          </span>
          <p className="text-[15px] text-ink/75 max-w-xl leading-[1.55]">
            Bigger or odder than this? Tell me what you have in mind and I&apos;ll
            send a flat quote, not an hourly meter.
          </p>
        </div>
      </div>
    </section>
  );
}
