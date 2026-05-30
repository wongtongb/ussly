import Link from "next/link";
import { requireAdminPage } from "@/lib/supabase/require-admin";

export default async function AdminHome() {
  const { admin } = await requireAdminPage();

  const [briefs, portfolio, testimonials, availability] = await Promise.all([
    admin.from("briefs").select("id, status", { count: "exact" }),
    admin.from("portfolio").select("id", { count: "exact" }),
    admin.from("testimonials").select("id", { count: "exact" }),
    admin.from("availability").select("*").eq("id", 1).single(),
  ]);

  const newCount =
    briefs.data?.filter((b) => b.status === "new").length ?? 0;
  const totalBriefs = briefs.count ?? 0;
  const portfolioCount = portfolio.count ?? 0;
  const testimonialsCount = testimonials.count ?? 0;
  const a = availability.data;

  const cards = [
    {
      href: "/admin/briefs",
      kicker: "§ I",
      title: "Briefs",
      meta: `${newCount} new · ${totalBriefs} total`,
      highlight: newCount > 0,
    },
    {
      href: "/admin/availability",
      kicker: "§ II",
      title: "Availability",
      meta: a
        ? `${a.is_open ? "Open" : "Closed"} · ${a.slots_left} slot${a.slots_left === 1 ? "" : "s"}`
        : "Not set",
    },
    {
      href: "/admin/portfolio",
      kicker: "§ III",
      title: "Portfolio",
      meta: `${portfolioCount} project${portfolioCount === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/testimonials",
      kicker: "§ IV",
      title: "Testimonials",
      meta: `${testimonialsCount} quote${testimonialsCount === 1 ? "" : "s"}`,
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
          ◍ Studio desk
        </p>
        <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
          What needs you<span className="text-accent font-display-italic">.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex items-baseline justify-between gap-6 border-t border-ink py-6 lg:py-7"
          >
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted pt-1">
                {c.kicker}
              </span>
              <h2 className="font-display text-3xl lg:text-4xl text-ink leading-none group-hover:text-accent transition-colors">
                {c.title}
              </h2>
            </div>
            <div className="text-right flex items-baseline gap-3">
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                  c.highlight ? "text-accent" : "text-ink-muted"
                }`}
              >
                {c.meta}
              </span>
              <span className="text-ink-muted group-hover:text-accent transition-colors">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
