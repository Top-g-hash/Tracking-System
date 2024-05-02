import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);

    const { data, error } = await client.from("Products").select("*");

    return { products: data };
  } catch (error) {
    console.log(error);
  }
 
});
