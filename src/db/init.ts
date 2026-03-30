import { sql } from "bun";

let initPromise: Promise<void> | null = null;

async function runSchemaSync() {
  const schema = await Bun.file(import.meta.dir + "/schema.sql").text();
   console.log("[db] Esquema listo");
  await sql.unsafe(schema);
}

export function ensureDatabaseReady() {
  console.log(`API escuchando 2`);
  if (!initPromise) {
    initPromise = (async () => {
      await runSchemaSync();
    })();
  }

  return initPromise;
}
