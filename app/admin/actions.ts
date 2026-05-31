"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { BriefStatus } from "@/lib/supabase/types";

// Result every mutation returns so the UI can show success/failure instead of
// silently swallowing errors. Shape works with React's useActionState.
export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const ok = (message: string): ActionState => ({ status: "success", message });
const fail = (message: string): ActionState => ({ status: "error", message });

type AdminClient = Awaited<ReturnType<typeof requireAdmin>>["admin"];

// Centralizes auth + turns thrown errors (auth, network) into a clean result
// rather than an uncaught server-action error.
async function run(
  fn: (admin: AdminClient) => Promise<ActionState>
): Promise<ActionState> {
  try {
    const { admin } = await requireAdmin();
    return await fn(admin);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Something went wrong");
  }
}

// ─── Validation helpers ──────────────────────────────────────────────────────
const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const list = (fd: FormData, key: string) =>
  str(fd, key)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

function intInRange(fd: FormData, key: string, min: number, max: number) {
  const n = Number(fd.get(key) ?? NaN);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < min || n > max) {
    return null;
  }
  return n;
}

function isHttpUrl(u: string) {
  try {
    const url = new URL(u);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Returns the first failing message, or null when every [label, ok] passes.
function firstError(checks: [string, boolean][]): string | null {
  for (const [label, valid] of checks) if (!valid) return label;
  return null;
}

export async function signOut() {
  const supabase = await getServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Briefs ──────────────────────────────────────────────────────────────────
const BRIEF_STATUSES: BriefStatus[] = ["new", "replied", "archived"];

export async function setBriefStatus(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    const status = str(fd, "status") as BriefStatus;
    if (!id) return fail("Missing brief id");
    if (!BRIEF_STATUSES.includes(status)) return fail("Invalid status");

    const { error } = await admin.from("briefs").update({ status }).eq("id", id);
    if (error) return fail(error.message);

    revalidatePath("/admin/briefs");
    revalidatePath("/admin");
    return ok(`Marked ${status}`);
  });
}

export async function saveBriefNotes(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    if (!id) return fail("Missing brief id");
    const notes = str(fd, "notes") || null;

    const { error } = await admin.from("briefs").update({ notes }).eq("id", id);
    if (error) return fail(error.message);

    revalidatePath("/admin/briefs");
    return ok("Notes saved");
  });
}

export async function deleteBrief(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    if (!id) return fail("Missing brief id");

    const { error } = await admin.from("briefs").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePath("/admin/briefs");
    revalidatePath("/admin");
    return ok("Brief deleted");
  });
}

// ─── Availability ─────────────────────────────────────────────────────────────
export async function updateAvailability(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const booking_label = str(fd, "booking_label");
    const next_open_label = str(fd, "next_open_label");
    const slots_left = intInRange(fd, "slots_left", 0, 99);

    const err = firstError([
      ["Booking label is required", booking_label.length > 0],
      ["Next-open label is required", next_open_label.length > 0],
      ["Slots left must be a whole number between 0 and 99", slots_left !== null],
    ]);
    if (err) return fail(err);

    const { error } = await admin
      .from("availability")
      .update({
        is_open: fd.get("is_open") === "on",
        booking_label,
        slots_left,
        next_open_label,
        after_label: str(fd, "after_label"),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) return fail(error.message);

    revalidatePath("/admin/availability");
    revalidatePath("/");
    return ok("Saved & published");
  });
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export async function upsertPortfolio(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    const url = str(fd, "url");
    const sort_order = intInRange(fd, "sort_order", 0, 9999);

    const row = {
      sort_order: sort_order ?? 0,
      num: str(fd, "num"),
      year: str(fd, "year"),
      title: str(fd, "title"),
      italic: str(fd, "italic"),
      description: str(fd, "description"),
      role: list(fd, "role"),
      palette: list(fd, "palette"),
      accent: str(fd, "accent"),
      url,
      domain: str(fd, "domain"),
      published: fd.get("published") === "on",
    };

    const err = firstError([
      ["Title is required", row.title.length > 0],
      ["Number is required", row.num.length > 0],
      ["Year is required", row.year.length > 0],
      ["Domain is required", row.domain.length > 0],
      ["Live URL must be a valid http(s) link", isHttpUrl(url)],
      ["Sort order must be a whole number", sort_order !== null],
    ]);
    if (err) return fail(err);

    const { error } = id
      ? await admin.from("portfolio").update(row).eq("id", id)
      : await admin.from("portfolio").insert(row);
    if (error) return fail(error.message);

    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return ok(id ? "Project saved" : "Project added");
  });
}

export async function deletePortfolio(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    if (!id) return fail("Missing project id");

    const { error } = await admin.from("portfolio").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return ok("Project deleted");
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function upsertTestimonial(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    const sort_order = intInRange(fd, "sort_order", 0, 9999);

    const row = {
      sort_order: sort_order ?? 0,
      quote: str(fd, "quote"),
      name: str(fd, "name"),
      role: str(fd, "role"),
      org: str(fd, "org"),
      accent: str(fd, "accent") || "text-accent",
      published: fd.get("published") === "on",
    };

    const err = firstError([
      ["Quote is required", row.quote.length > 0],
      ["Name is required", row.name.length > 0],
      ["Role is required", row.role.length > 0],
      ["Organization is required", row.org.length > 0],
      ["Sort order must be a whole number", sort_order !== null],
    ]);
    if (err) return fail(err);

    const { error } = id
      ? await admin.from("testimonials").update(row).eq("id", id)
      : await admin.from("testimonials").insert(row);
    if (error) return fail(error.message);

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return ok(id ? "Quote saved" : "Quote added");
  });
}

export async function deleteTestimonial(
  _prev: ActionState,
  fd: FormData
): Promise<ActionState> {
  return run(async (admin) => {
    const id = str(fd, "id");
    if (!id) return fail("Missing testimonial id");

    const { error } = await admin.from("testimonials").delete().eq("id", id);
    if (error) return fail(error.message);

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return ok("Quote deleted");
  });
}
