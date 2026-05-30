import { redirect } from "next/navigation";
import { getServerSupabase } from "./server";
import { getAdminSupabase } from "./admin";

// Resolve the current session and verify it belongs to an allowlisted admin
// (present in the `admin_emails` table). Returns null when unauthorized.
async function checkAdmin() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const admin = getAdminSupabase();
  const { data } = await admin
    .from("admin_emails")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();
  if (!data) return null;

  return { user, admin };
}

// For server components / pages: redirect unauthorized visitors to login.
// Pages read client PII via the service-role client, so this gates reads too —
// not just the mutations in actions.ts.
export async function requireAdminPage() {
  const result = await checkAdmin();
  if (!result) redirect("/admin/login");
  return result;
}

// For server actions: throw on unauthorized so the mutation never runs.
export async function requireAdmin() {
  const result = await checkAdmin();
  if (!result) throw new Error("Not an admin");
  return result;
}
