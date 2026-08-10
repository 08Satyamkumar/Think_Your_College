import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, slug } = body;

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

    // Perform database deletion
    const { error } = await supabase
      .from("colleges")
      .delete()
      .eq("slug", slug);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "College deleted successfully from database.",
    });
  } catch (error: any) {
    console.error("API error deleting college:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete college." },
      { status: 500 }
    );
  }
}
