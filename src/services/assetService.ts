import { supabase } from "@/lib/supabase";

export async function getAssets() {
  const { data, error } = await supabase
    .from("assets")
    .select(`
      *,
      customers (
        id,
        name,
        company
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createAsset(asset: {
  customer_id: string;
  asset_name: string;
  serial_number: string;
  device_type: string;
  installation_date: string;
  warranty_end: string;
  health_status: string;
}) {
  const { data, error } = await supabase
    .from("assets")
    .insert([asset])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export interface Asset {
  id: string;

  customer_id: string;

  asset_name: string;

  serial_number: string;

  device_type: string;

  installation_date: string;

  warranty_end: string;

  health_status: string;

  created_at: string;

  updated_at: string;

  customers?: {
    id: string;
    name: string;
    company: string;
  };
}

export async function getAssetList() {
  const { data, error } = await supabase
    .from("assets")
    .select("id, asset_name, serial_number")
    .order("asset_name", { ascending: true });

  if (error) throw error;

  return data;
}