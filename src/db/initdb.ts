import { SQL } from "bun";

export const db = new SQL(process.env.DATABASE_URL!);

export async function initDB() {
  console.log("Initializing DB...");

  try {
    await db`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
  } catch (err) {
    console.warn("⚠️ pgcrypto not available");
  }

  try {
    await db`
      CREATE TABLE IF NOT EXISTS host ( 
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        frpass TEXT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    console.log("✅ Table 'host' ready");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}