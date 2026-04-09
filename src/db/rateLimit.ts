import { sql } from "bun";

async function verifyResetCode(userId: number, inputCode: string) {
  // 1. Find the most recent active token
  const token = await sql
    `SELECT * FROM resettoken 
     WHERE host_id = $1 AND used = false 
     ORDER BY created_at DESC LIMIT 1`;

  if (!token) throw new Error("No hay solicitud de cambio activa");

  // 2. Check expiration date
  if (new Date() > new Date(token.expires_at)) {
    throw new Error("El código ha expirado");
  }

  // 3. Verify attempt limit (Rate Limit)
  if (token.attempts >= 3) {
    // Optional: Revoke the token for security reasons
    await sql `UPDATE resettoken SET used = true WHERE id = $1`;
    throw new Error("Demasiados intentos fallidos. Solicita un código nuevo.");
  }

  // 4. Compare the code
  if (token.code !== inputCode) {
    // Increase the number of failed attempts
    await sql `UPDATE resettoken SET attempts = attempts + 1 WHERE id = $1`;
    throw new Error("Código incorrecto");
  }

  // 5. Success! Mark as used and proceed to change your password
  await sql `UPDATE resettoken SET used = true WHERE id = $1`;
  
  // Aquí llamarías a tu función para actualizar el hash del password en la tabla 'users'
  return { success: true };
}
