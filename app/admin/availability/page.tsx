import { requireAdminPage } from "@/lib/supabase/require-admin";
import AvailabilityForm from "./AvailabilityForm";
import type { Availability } from "@/lib/supabase/types";

export default async function AvailabilityPage() {
  const { admin } = await requireAdminPage();
  const { data } = await admin
    .from("availability")
    .select("*")
    .eq("id", 1)
    .single();

  const a = data as Availability | null;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
          § II · The ribbon
        </p>
        <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
          Booking state<span className="text-accent font-display-italic">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-ink/75 text-[15px] leading-[1.55]">
          What the homepage ribbon broadcasts to every visitor. Update this when
          a slot fills or opens — the public site re-renders on save.
        </p>
      </header>

      <AvailabilityForm a={a} />
    </div>
  );
}
