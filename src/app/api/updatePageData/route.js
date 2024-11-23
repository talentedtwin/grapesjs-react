import supabase from "./supabase";

export const updatePageData = async (id, data) => {
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
};
