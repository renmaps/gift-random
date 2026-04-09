import { sql } from "bun";

export function startCleanupCron() {
  // Configura el intervalo (ejemplo: cada 1 hora = 3600000 ms)
  const ONE_HOUR = 60 * 60 * 1000;

  setInterval(async () => {
    try {
      console.log("--- Ejecutando limpieza de tokens expirados ---");
      
      const result = await sql`
        DELETE FROM resettoken 
        WHERE expires_at < NOW() 
           OR created_at < NOW() - INTERVAL '24 hours'
           OR used = true
      `;

      console.log(`Limpieza completada. Filas eliminadas: ${result.rowCount}`);
    } catch (error) {
      console.error("Error en el cron job de limpieza:", error);
    }
  }, ONE_HOUR);

  console.log("Cron job de limpieza inicializado.");
}
