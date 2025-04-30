import { db } from "./database";
import { IPolisInput } from "../utils/type";

export const createPolisQuery = async (input: IPolisInput) => {
  const today = new Date();
  const dateFormat = today.toISOString().slice(0, 10).replace(/-/g, "");
  const premium_price = input.vehicle_price * (input.premium_rate / 100);

  const insertValue = await db.one(
    `INSERT INTO policies (
      insured_name, effective_date, expiry_date,
      vehicle_brand, vehicle_type, vehicle_year,
      vehicle_price, premium_rate, premium_price
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING id`,
    [
      input.insured_name,
      input.effective_date,
      input.expiry_date,
      input.vehicle_brand,
      input.vehicle_type,
      input.vehicle_year,
      input.vehicle_price,
      input.premium_rate,
      premium_price,
    ]
  );

  const policy_number = `${dateFormat}${String(insertValue.id).padStart(
    6,
    "0"
  )}`;

  await db.none("UPDATE policies SET policy_number = $1 WHERE id = $2", [
    policy_number,
    insertValue.id,
  ]);

  const result = await db.one("SELECT * FROM policies WHERE id = $1", [
    insertValue.id,
  ]);

  return result;
};

export const getAllPolisQuery = async () => {
  const result = await db.any("SELECT * FROM policies ORDER BY id DESC");
  return result;
};

export const updatePolisQuery = async (id: number, input: IPolisInput) => {
  const premium_price = input.vehicle_price * (input.premium_rate / 100);

  await db.none(
    `UPDATE policies SET
      insured_name = $1,
      effective_date = $2,
      expiry_date = $3,
      vehicle_brand = $4,
      vehicle_type = $5,
      vehicle_year = $6,
      vehicle_price = $7,
      premium_rate = $8,
      premium_price = $9
    WHERE id = $10`,
    [
      input.insured_name,
      input.effective_date,
      input.expiry_date,
      input.vehicle_brand,
      input.vehicle_type,
      input.vehicle_year,
      input.vehicle_price,
      input.premium_rate,
      premium_price,
      id,
    ]
  );

  const updated = await db.one("SELECT * FROM policies WHERE id = $1", [id]);
  return updated;
};

export const deletePolisQuery = async (id: number) => {
  await db.none("DELETE FROM policies WHERE id = $1", [id]);
  return { id };
};
