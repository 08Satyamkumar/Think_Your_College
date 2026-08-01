import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const ownership = searchParams.get("ownership") || "";
    const exam = searchParams.get("exam") || "";

    const offset = (page - 1) * limit;

    // Start building query
    let query = supabase
      .from("colleges")
      .select("*", { count: "exact" });

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply exact match filters (supporting multiple comma-separated values)
    if (state) {
      query = query.in("state", state.split(","));
    }
    if (city) {
      query = query.in("city", city.split(","));
    }
    
    if (ownership) {
      const ownershipValues = ownership.split(",").map(val => val.trim().toLowerCase());
      const mappedValues = [];
      for (const val of ownershipValues) {
        if (val.includes("public") || val.includes("govt") || val.includes("government")) {
          mappedValues.push("Public");
        } else if (val.includes("private")) {
          mappedValues.push("Private");
        } else {
          mappedValues.push(val);
        }
      }
      if (mappedValues.length > 0) {
        query = query.in("ownership", mappedValues);
      }
    }

    if (exam) {
      const examList = exam.split(",");
      // For multiple exams, search if any are accepted
      const filters = examList.map(ex => `exams_accepted.ilike.%${ex.trim()}%`).join(",");
      query = query.or(filters);
    }

    // Paginate and sort (by popularity or NIRF rank equivalent, default rating/name)
    query = query
      .order("rating", { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      colleges: data || [],
      total: count || 0,
      page,
      limit,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error("API error fetching colleges:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
