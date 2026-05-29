import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { signOut } from "./actions";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/briefs", label: "Briefs" },
  { href: "/admin/availability", label: "Availability" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/login renders before this layout via route segment, but the layout
  // wraps it anyway in Next.js — let unauthed users through so /login works.
  // Middleware already redirects unauthed users on protected routes.

  return (
    <div className="min-h-screen bg-paper">
      {user && (
        <header className="border-b border-rule">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
            <Link href="/admin" className="font-display text-xl text-ink">
              Ussly <span className="text-ink-muted font-mono text-[10px] uppercase tracking-[0.18em] ml-2">/ admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em]">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 text-ink-muted hover:text-ink transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <form action={signOut}>
              <button className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </header>
      )}
      <div className="max-w-[1200px] mx-auto px-6 py-10">{children}</div>
    </div>
  );
}

export const dynamic = "force-dynamic";
