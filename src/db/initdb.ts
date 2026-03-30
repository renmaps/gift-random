import { sql } from "bun";

export async function ensureDatabaseReady() {
  console.log("Initializing DB...");

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS host ( 
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        frpass TEXT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}
