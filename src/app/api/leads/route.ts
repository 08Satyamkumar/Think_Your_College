import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course_interest, state_interest, college_interest } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required fields." },
        { status: 400 }
      );
    }

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email: email || null,
          phone,
          course_interest: course_interest || null,
          state_interest: state_interest || null,
          college_interest: college_interest || null,
          status: "Pending"
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully! Our counselor will contact you soon.",
      lead: data ? data[0] : null
    });
  } catch (error: any) {
    console.error("API error submitting lead:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit lead." },
      { status: 500 }
    );
  }
}
