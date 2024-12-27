import seedData from "@/app/utils/seedData";
import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { data, error } = await supabase
      .from("pagedata")
      .upsert(seedData)
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Database seeded successfully", data });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
