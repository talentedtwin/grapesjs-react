import supabase from "@app/utils/supabase";

async function createEditorTable() {
  try {
    // Create the table
    const { error: createError } = await supabase.rpc("create_editor_table");

    if (createError) {
      console.error("Error creating table:", createError);
      return;
    }

    console.log("Table created successfully");

    // Insert initial entry
    const { data, error: insertError } = await supabase
      .from("editors")
      .insert([{ id: 1 }])
      .select();

    if (insertError) {
      console.error("Error inserting initial entry:", insertError);
    } else {
      console.log("Initial entry inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

createEditorTable();
