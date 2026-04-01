import { sql } from "bun";
import { ensureDatabaseReady } from "./src/db/init";
const PASSWORD = process.env.RESET_PASSWORD 

try {
  console.log("Start DB...");
  await ensureDatabaseReady();
} catch (error) {
  console.error("Error, to start DB!", error);
  process.exit(1); // Stop container, no DB
}

const server = Bun.serve({
  port: Number(process.env.PORT) || 3000,
  hostname: "0.0.0.0",
   async fetch(req) {
    const url = new URL(req.url);
     
    // Healthcheck endpoint
    if (url.pathname === "/") {
      return new Response("OK->");
    }
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers});
    }

    const headers = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. RESPUESTA INMEDIATA PARA PREFLIGHT (CRÍTICO)
if (req.method === "OPTIONS") {
  return new Response(null, { headers, status: 204 });
}

try {
  // 2. RUTA PARA LOGIN (Parece que usas PATCH aquí según tu código anterior)
  if (url.pathname === "/auth/login" && req.method === "PATCH") {
    // ... tu lógica de login/registro ...
    return new Response(JSON.stringify({ status: "login" }), { headers });
  }

  // 3. RUTA PARA RESET (La que te está fallando)
  if (url.pathname === "/auth/reset" && req.method === "PATCH") {
    const { email } = await req.json();
    
    return new Response(JSON.stringify({ status: "changed" }), { headers });
  }

  // Respuesta por defecto si no entra en ninguna ruta
  return new Response("Not Found", { headers, status: 404 });

} catch (error) {
  return new Response(JSON.stringify({ status: "error", message: error.message }), { 
    headers, 
    status: 500 
  });
}
      
      if (url.pathname === "/auth/reset" && req.method === "POST") {
        const { email } = await req.json();
        const password = PASSWORD // 
        
        const user = await sql`
          SELECT * FROM host WHERE email = ${email}
        `;

        if (user.length > 0) {
          await sql`
            UPDATE host SET frpass = ${password} WHERE email = ${email};
          `;
          return new Response(JSON.stringify({ status: "changed" }), { headers });
        }
        return new Response(JSON.stringify({ status: "error", message: "You are not the owner of this account" }), { headers, status: 401 });
      }
      
      return new Response("Not Found", { status: 404 });

    } catch (err) {
      console.error(err);
      return new Response("Internal error", { status: 500 });
    }
  },
});
