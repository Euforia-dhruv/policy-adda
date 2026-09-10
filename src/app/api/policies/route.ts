import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "active";

    const supabase = await createClient();

    let query = supabase
      .from("policies")
      .select("*, category:policy_categories(name, slug, icon)")
      .eq("status", status)
      .order("name");

    if (category) {
      const { data: cat } = await supabase
        .from("policy_categories")
        .select("id")
        .eq("slug", category)
        .single();

      if (cat) {
        query = query.eq("category_id", cat.id);
      }
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ policies: data });
  } catch (error) {
    console.error("Policies API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
