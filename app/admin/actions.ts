"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { BriefStatus } from "@/lib/supabase/types";

export async function signOut() {
  const supabase = await getServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Briefs ────────────────────────────────────────────────────────────────
export async function updateBriefStatus(id: string, status: BriefStatus) {
  const { admin } = await requireAdmin();
  await admin.from("briefs").update({ status }).eq("id", id);
  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
}

export async function deleteBrief(id: string) {
  const { admin } = await requireAdmin();
  await admin.from("briefs").delete().eq("id", id);
  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
}

// ─── Availability ──────────────────────────────────────────────────────────
export async function updateAvailability(formData: FormData) {
  const { admin } = await requireAdmin();
  const payload = {
    is_open: formData.get("is_open") === "on",
    booking_label: String(formData.get("booking_label") || "").trim(),
    slots_left: Number(formData.get("slots_left") || 0),
    next_open_label: String(formData.get("next_open_label") || "").trim(),
    after_label: String(formData.get("after_label") || "").trim(),
    updated_at: new Date().toISOString(),
  };
  await admin.from("availability").update(payload).eq("id", 1);
  revalidatePath("/admin/availability");
  revalidatePath("/");
}

// ─── Portfolio ─────────────────────────────────────────────────────────────
export async function upsertPortfolio(formData: FormData) {
  const { admin } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const row = {
    sort_order: Number(formData.get("sort_order") || 0),
    num: String(formData.get("num") || "").trim(),
    year: String(formData.get("year") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    italic: String(formData.get("italic") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    role: String(formData.get("role") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    palette: String(formData.get("palette") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    accent: String(formData.get("accent") || "").trim(),
    url: String(formData.get("url") || "").trim(),
    domain: String(formData.get("domain") || "").trim(),
    published: formData.get("published") === "on",
  };
  if (id) {
    await admin.from("portfolio").update(row).eq("id", id);
  } else {
    await admin.from("portfolio").insert(row);
  }
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function deletePortfolio(id: string) {
  const { admin } = await requireAdmin();
  await admin.from("portfolio").delete().eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

// ─── Testimonials ──────────────────────────────────────────────────────────
export async function upsertTestimonial(formData: FormData) {
  const { admin } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const row = {
    sort_order: Number(formData.get("sort_order") || 0),
    quote: String(formData.get("quote") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    org: String(formData.get("org") || "").trim(),
    accent: String(formData.get("accent") || "text-accent").trim(),
    published: formData.get("published") === "on",
  };
  if (id) {
    await admin.from("testimonials").update(row).eq("id", id);
  } else {
    await admin.from("testimonials").insert(row);
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const { admin } = await requireAdmin();
  await admin.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
