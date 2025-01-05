//import supabase from "@/app/utils/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function getPageData(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  const { data, error } = await supabase
    .from("pagedata")
    .select("*")
    .eq("id", id);
  if (error) throw error;
  //console.log("data", data);
  return data;
}

async function updatePageData(id, data) {
  const timestamp = new Date().toISOString();

  const item = {
    html: data.html,
    css: data.css,
    components: data.components,
    styles: data.styles,
    assets: data.assets,
    pages: data.pages,
    updated_at: timestamp,
  };

  const { data: result, error } = await supabase
    .from("pagedata")
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { data } = await request.json();
    //console.log("data", data);
    //console.log("id", id);
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const result = await updatePageData(id, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add other HTTP methods as needed
