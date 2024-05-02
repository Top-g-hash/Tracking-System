import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);

    const { data, error } = await client
      .from("Products")
      .insert({ some_column: "someValue", other_column: "otherValue" })
      .select();

    return { addedProducts: data };
  } catch (error) {
    console.log(error);
  }
});
