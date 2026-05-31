import { getPublicSupabase } from "@/lib/supabase/public";
import type { PortfolioItem } from "@/lib/supabase/types";

const fallback: PortfolioItem[] = [
  {
    id: "fallback-1",
    created_at: "",
    sort_order: 1,
    num: "001",
    year: "2025",
    title: "The Yemeni House",
    italic: "Restaurant, Lynnwood",
    description:
      "Authentic Yemeni cuisine, slow-cooked and unapologetic. Sister to Taste of Yemen — Infatuation's Best New Restaurant of 2025.",
    role: ["Web design", "Build", "Copy"],
    palette: ["bg-[#7A2F0E]", "bg-[#C8501E]", "bg-[#EBC591]"],
    accent: "from-amber-700 via-orange-800 to-stone-900",
    url: "https://yemeni-house.vercel.app",
    domain: "yemeni-house.vercel.app",
    published: true,
  },
  {
    id: "fallback-2",
    created_at: "",
    sort_order: 2,
    num: "002",
    year: "2024",
    title: "Northwest Fades",
    italic: "Barbershop, PNW",
    description:
      "Frankie and Ahmed's shop. The cleanest cut in the Northwest — fades, beard work, straight razors, and real conversation.",
    role: ["Web design", "Build", "Local SEO"],
    palette: ["bg-[#1E2230]", "bg-[#4A5468]", "bg-[#C0A572]"],
    accent: "from-slate-700 via-slate-800 to-stone-900",
    url: "https://northwestfades.netlify.app",
    domain: "northwestfades.netlify.app",
    published: true,
  },
];

async function getProjects(): Promise<PortfolioItem[]> {
  try {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("portfolio")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    return (data && data.length > 0 ? data : fallback) as PortfolioItem[];
  } catch {
    return fallback;
  }
}

export default async function Portfolio() {
  const projects = await getProjects();
  return (
    <section id="work" className="relative py-24 lg:py-36">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6 mb-16 lg:mb-20">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              § I · Selected Work
            </span>
            <div className="dotted-rule text-rule mt-4 hidden md:block" />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(40px,7vw,108px)] text-ink leading-[0.92] tracking-tight">
              Live work,
              <br />
              <span className="font-display-italic text-accent">
                no mockups.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-ink/80 text-base lg:text-[17px] leading-[1.55]">
              Both of these are open for business right now. Click through.
              Nothing here is a concept piece or a coming-soon.
            </p>
          </div>
        </div>

        {/* Project list — editorial cards */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((p, i) => (
            <article
              key={p.num}
              className={`group grid grid-cols-12 gap-x-6 gap-y-6 items-start ${
                i % 2 === 1 ? "md:[&>*:nth-child(1)]:order-2" : ""
              }`}
            >
              {/* Preview block */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-12 md:col-span-7 block lift"
              >
                <div className="relative overflow-hidden rounded-sm border border-ink/10">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-paper-deep/80 border-b border-ink/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                    <span className="ml-3 font-mono text-[10px] text-ink-muted truncate">
                      {p.domain}
                    </span>
                  </div>
                  {/* Visual */}
                  <div
                    className={`relative aspect-[16/10] bg-gradient-to-br ${p.accent} overflow-hidden`}
                  >
                    {/* Abstract identity composition */}
                    <div className="absolute inset-0">
                      <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full border-2 border-paper/20" />
                      <div className="absolute top-20 right-12 w-48 h-48 rounded-full border border-paper/30" />
                      <div className="absolute bottom-8 left-8 flex gap-2">
                        {p.palette.map((c) => (
                          <span
                            key={c}
                            className={`w-10 h-10 rounded-full ring-2 ring-paper/30 ${c}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display-italic text-[clamp(48px,9vw,128px)] text-paper/95 tracking-tight leading-none text-center px-6">
                        {p.title}
                      </span>
                    </div>

                    {/* Corner mark */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70">
                      № {p.num} / {p.year}
                    </div>
                    <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70 group-hover:text-paper transition-colors">
                      Visit ↗
                    </div>
                  </div>
                </div>
              </a>

              {/* Meta block */}
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    № {p.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    / {p.year}
                  </span>
                </div>

                <h3 className="font-display text-4xl lg:text-5xl text-ink leading-[0.95] tracking-tight">
                  {p.title}
                </h3>
                <p className="font-display-italic text-2xl text-accent mt-1">
                  {p.italic}
                </p>

                <p className="mt-5 text-ink/85 text-[15px] leading-[1.6] max-w-md">
                  {p.description}
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-y-2">
                  <div className="flex gap-4 border-t border-rule pt-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted w-20">
                      Role
                    </dt>
                    <dd className="text-sm text-ink">
                      {p.role.join(" · ")}
                    </dd>
                  </div>
                  <div className="flex gap-4 border-t border-rule pt-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted w-20">
                      Live at
                    </dt>
                    <dd className="text-sm">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors break-all"
                      >
                        {p.domain}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-20 pt-8 border-t border-ink flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <p className="font-display-italic text-2xl lg:text-3xl text-ink max-w-xl">
            Want to be number three?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors self-start sm:self-auto"
          >
            Claim the slot
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
