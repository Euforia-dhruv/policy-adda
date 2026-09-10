import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, name, mobile, branch } = body;

    if (!product || !name || !mobile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("applications").insert({
      customer_id: user?.id || null,
      policy_id: null,
      status: "submitted",
      form_data: {
        product,
        name,
        mobile,
        branch,
        source: "quote_form",
        submitted_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Quote submission error:", error);
      return NextResponse.json({ error: "Failed to submit quote" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
