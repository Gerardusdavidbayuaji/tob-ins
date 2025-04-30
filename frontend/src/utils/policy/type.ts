export interface IPolicy {
  id: number;
  policy_number: string;
  insured_name: string;
  effective_date: string;
  expiry_date: string;
  vehicle_brand: string;
  vehicle_type: string;
  vehicle_year: number;
  vehicle_price: string;
  premium_rate: string;
  premium_price?: any;
}
