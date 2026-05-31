import { getPublicSupabase } from "@/lib/supabase/public";
import type { Testimonial } from "@/lib/supabase/types";

const fallback: Pick<Testimonial, "quote" | "name" | "role" | "org" | "accent">[] = [
  {
    quote:
      "Before Ussly we had no real online presence. Now people book through the site, find us on Google, and show up already knowing what we offer. The site just speaks for us.",
    name: "Frankie",
    role: "Co-Owner",
    org: "Northwest Fades",
    accent: "text-accent",
  },
  {
    quote:
      "We told them what we were about — community, quality, no corporate feel — and they nailed it on the first try. It actually looks like us.",
    name: "Ahmed",
    role: "Co-Owner",
    org: "Northwest Fades",
    accent: "text-ink",
  },
  {
    quote:
      "We needed something that felt true to our food and culture, not a generic restaurant template. Ussly delivered exactly that — our regulars noticed it the day we launched.",
    name: "The Yemeni House",
    role: "Restaurant",
    org: "Lynnwood WA",
    accent: "text-accent",
  },
];

async function getQuotes() {
  try {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("testimonials")
      .select("quote, name, role, org, accent")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    return data && data.length > 0 ? data : fallback;
  } catch {
    return fallback;
  }
}

export default async function Testimonials() {
  const testimonials = await getQuotes();
  return (
    <section id="testimonials" className="relative py-24 lg:py-36">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-24">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              § IV · Words
            </span>
            <div className="dotted-rule text-rule mt-4 hidden md:block" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,108px)] text-ink leading-[0.92] tracking-tight">
              What they say
              <br />
              <span className="font-display-italic text-accent">
                once it&apos;s live.
              </span>
            </h2>
          </div>
        </div>

        {/* Pull quotes — staggered */}
        <div className="space-y-20 lg:space-y-28">
          {testimonials.map((t, i) => (
            <figure
              key={t.name + i}
              className={`grid grid-cols-12 gap-x-6 gap-y-4 ${
                i % 2 === 1 ? "md:[&>blockquote]:col-start-3" : ""
              }`}
            >
              {/* Big quote mark */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-display-italic text-accent text-[120px] lg:text-[180px] leading-none block -translate-y-6">
                  &ldquo;
                </span>
              </div>

              <blockquote className="col-span-10 md:col-span-9 lg:col-span-8">
                <p
                  className={`font-display text-[32px] md:text-[44px] lg:text-[58px] leading-[1.05] tracking-tight ${t.accent}`}
                >
                  {t.quote
                    .split(" ")
                    .map((word: string, idx: number, arr: string[]) => {
                      const isLast = idx === arr.length - 1;
                      return (
                        <span key={idx}>
                          {word}
                          {!isLast && " "}
                        </span>
                      );
                    })}
                </p>
                <figcaption className="mt-8 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display-italic text-2xl text-ink">
                    {t.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    · {t.role} · {t.org}
                  </span>
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
