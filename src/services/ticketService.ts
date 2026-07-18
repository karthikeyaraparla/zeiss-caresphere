import { supabase } from "@/lib/supabase";

export async function getTickets() {
  const { data, error } = await supabase
    .from("tickets")
    .select(`
      *,
      assets (
        id,
        asset_name,
        serial_number,
        customers (
          company
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createTicket(ticket: {
  asset_id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}) {
  const { data, error } = await supabase
    .from("tickets")
    .insert([ticket])
    .select()
    .single();

  if (error) throw error;

  return data;
}