import supabase from "@/app/utils/supabase";
import { NextResponse } from "next/server";

async function getPageData(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  const { data, error } = await supabase.from("pages").select("*").eq("id", id);
  if (error) throw error;
  return data;
}

async function updatePageData(id, data) {
  const timestamp = new Date().toISOString();

  const item = {
    ...data,
    date_edited: timestamp,
  };

  const { data: result, error } = await supabase
    .from("pages")
    .update(item)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return result;
}

export async function GET(request) {
  try {
    const data = await getPageData(request);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id, data } = await request.json();
    const result = await updatePageData(id, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add other HTTP methods as needed
