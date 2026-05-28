const steps = [
  {
    num: "i.",
    title: "Conversation",
    duration: "Week 0",
    body: "A real call, not a form-bot. We talk about your business, your customers, and what success looks like. If we're not a fit, we say so on the spot.",
  },
  {
    num: "ii.",
    title: "Direction",
    duration: "Week 1",
    body: "Moodboard, sitemap, and a written design direction. You'll see exactly where this is headed before any pixel-pushing begins.",
  },
  {
    num: "iii.",
    title: "Design & Build",
    duration: "Weeks 2–4",
    body: "Design lives in the browser, not Figma. You'll get a real, working link to click around — and feedback gets baked in same-day.",
  },
  {
    num: "iv.",
    title: "Launch & beyond",
    duration: "Week 5",
    body: "Deploy, hand-off, and a 30-day check-in. We're around for tweaks and won't ghost you the day the invoice clears.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-36 bg-ink text-paper">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              § III · Process
            </span>
            <div className="dotted-rule text-paper/40 mt-4 hidden md:block" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,108px)] text-paper leading-[0.92] tracking-tight">
              Four weeks,
              <br />
              <span className="font-display-italic text-accent">
                no surprises.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-paper/75 text-base lg:text-[17px] leading-[1.55]">
              Each project follows the same arc. You always know where it is,
              what comes next, and what you owe.
            </p>
          </div>
        </div>

        {/* Steps — numbered list, magazine style */}
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
          {steps.map((s, i) => (
            <li
              key={s.num}
              className={`relative py-8 lg:py-12 border-t border-paper/15 ${
                i % 2 === 1 ? "md:translate-y-16" : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-display-italic text-[80px] lg:text-[120px] text-accent leading-none">
                  {s.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                  {s.duration}
                </span>
              </div>

              <h3 className="font-display text-3xl lg:text-4xl text-paper tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-paper/75 leading-[1.6] text-[15px] max-w-md">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        {/* Footnote */}
        <div className="mt-20 pt-6 border-t border-paper/15 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">
            P.S.
          </span>
          <p className="font-display-italic text-2xl lg:text-3xl text-paper">
            Fixed scope. Fixed price. No retainer traps.
          </p>
        </div>
      </div>
    </section>
  );
}
