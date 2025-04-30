export const fieldNames = [
  "insured_name",
  "effective_date",
  "vehicle_brand",
  "expiry_date",
  "vehicle_type",
  "vehicle_year",
  "vehicle_price",
  "premium_rate",
];

export const fieldLabels: Record<string, string> = {
  insured_name: "Nama Tertanggung",
  effective_date: "Tanggal Efektif",
  expiry_date: "Tanggal Expired",
  vehicle_brand: "Merek Kendaraan",
  vehicle_type: "Tipe Kendaraan",
  vehicle_year: "Tahun Kendaraan",
  vehicle_price: "Harga Kendaraan",
  premium_rate: "Rate Premi",
};

export const dateFields = ["effective_date", "expiry_date"];
