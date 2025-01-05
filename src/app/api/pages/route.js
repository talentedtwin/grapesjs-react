import { supabase } from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("pagedata").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const { title, metaTitle, metaDescription } = await request.json();

    const { data, error } = await supabase
      .from("pages")
      .insert([
        {
          title,
          meta_title: metaTitle,
          meta_description: metaDescription,
          content: "",
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
