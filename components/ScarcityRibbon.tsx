import { getPublicSupabase } from "@/lib/supabase/public";
import type { Availability } from "@/lib/supabase/types";

const fallback: Pick<
  Availability,
  "is_open" | "booking_label" | "slots_left" | "next_open_label" | "after_label"
> = {
  is_open: true,
  booking_label: "Booking Q3 2026",
  slots_left: 1,
  next_open_label: "Next open · Oct",
  after_label: "After: closed til 2027",
};

async function getAvailability() {
  try {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("availability")
      .select("is_open, booking_label, slots_left, next_open_label, after_label")
      .eq("id", 1)
      .single();
    return (data ?? fallback) as typeof fallback;
  } catch {
    return fallback;
  }
}

export default async function ScarcityRibbon() {
  const a = await getAvailability();
  if (!a.is_open) return null;

  const slotsText =
    a.slots_left === 1
      ? "1 slot left"
      : a.slots_left === 0
        ? "Waitlist only"
        : `${a.slots_left} slots left`;

  return (
    <div className="relative pt-16 lg:pt-20">
      <div className="bg-accent text-paper border-y border-accent-deep/40">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4 py-2.5 lg:py-3 font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.22em]">
            <div className="flex items-center gap-3 lg:gap-5 overflow-hidden">
              <span className="hidden sm:inline shrink-0">◍ {a.booking_label}</span>
              <span className="hidden sm:inline opacity-60 shrink-0">✺</span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-paper opacity-75 pulse-dot" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-paper" />
                </span>
                <span className="font-semibold">{slotsText}</span>
              </span>
              <span className="opacity-60 shrink-0">✺</span>
              <span className="shrink-0">{a.next_open_label}</span>
              {a.after_label && (
                <>
                  <span className="hidden lg:inline opacity-60 shrink-0">✺</span>
                  <span className="hidden lg:inline shrink-0 truncate">{a.after_label}</span>
                </>
              )}
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 shrink-0 border-b border-paper/40 hover:border-paper pb-px transition-colors"
            >
              <span>Claim it</span>
              <span className="arrow-pop">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
