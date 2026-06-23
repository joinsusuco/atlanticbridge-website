// Shipping Schedule Types & Defaults
// Data is fetched from Supabase at runtime, these are fallbacks

export interface ShippingSchedule {
  id: string;
  type: "container" | "gp";
  departure_date: string;
  arrival_date: string;
  booking_deadline: string;
  departure_port: string;
  arrival_port: string;
  show_banner: boolean;
  updated_at: string;
}

export const defaultContainerSchedule: ShippingSchedule = {
  id: "",
  type: "container",
  departure_date: "TBD",
  arrival_date: "TBD",
  booking_deadline: "TBD",
  departure_port: "Seattle-Tacoma, WA",
  arrival_port: "Banjul, The Gambia",
  show_banner: true,
  updated_at: "",
};

export const defaultGPSchedule: ShippingSchedule = {
  id: "",
  type: "gp",
  departure_date: "TBD",
  arrival_date: "TBD",
  booking_deadline: "TBD",
  departure_port: "Seattle, WA",
  arrival_port: "Dakar / Banjul",
  show_banner: true,
  updated_at: "",
};
