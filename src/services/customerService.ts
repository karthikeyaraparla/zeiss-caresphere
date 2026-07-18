import { supabase } from "@/lib/supabase";
import type { Customer } from "@/types";

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return (data || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? "",
    company: c.company,
    industry: c.industry ?? "",
    country: c.country ?? "",
    city: c.city ?? "",
    status: c.status,
    tier: c.tier,
    assetCount: 0,
    openTickets: 0,
    contractStart: c.contract_start ?? "",
    contractEnd: c.contract_end ?? "",
    createdAt: c.created_at,
    updatedAt: c.updated_at,
    avatar: "",
  }));
}

export async function createCustomer(customer: {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  country: string;
  city: string;
  status: string;
  tier: string;
  contract_start: string;
  contract_end: string;
}) {
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getCustomerList() {
  const { data, error } = await supabase
    .from("customers")
    .select("id, name, company")
    .order("company", { ascending: true });

  if (error) throw error;

  return data;
}