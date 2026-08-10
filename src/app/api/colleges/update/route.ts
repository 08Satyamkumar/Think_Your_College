import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, slug, updatedFields } = body;

    // Verify admin credentials
    if (username !== "Samrat1311" || password !== "1311161161") {
      return NextResponse.json(
        { error: "Unauthorized admin access." },
        { status: 401 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "College slug is required to identify the record." },
        { status: 400 }
      );
    }

    // Perform database update
    const { data, error } = await supabase
      .from("colleges")
      .update(updatedFields)
      .eq("slug", slug)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "College details updated successfully in the database.",
      college: data ? data[0] : null,
    });
  } catch (error: any) {
    console.error("API error updating college:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update college details." },
      { status: 500 }
    );
  }
}
