// Native Bun PostgreSQL client
import { SQL } from "bun";

// Load env
const db = new SQL(process.env.DATABASE_URL!);

// Simple server
const server = Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    // Enable CORS (for React frontend)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Content-Type": "application/json"
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      // ---------------- LOGIN / REGISTER ----------------
      if (url.pathname === "/auth/login" && req.method === "POST") {
        const { email, password } = await req.json();

        // Check if user exists
        const user = await db`
          SELECT * FROM host WHERE email = ${email}
        `;

        if (user.length > 0) {
          // Validate password
          if (user[0].frpass === password) {
            return new Response(
              JSON.stringify({ status: "login", message: "Logged in" }),
              { headers }
            );
          } else {
            return new Response(
              JSON.stringify({ status: "error", message: "Wrong password" }),
              { headers, status: 401 }
            );
          }
        }

        // Register new user
        await db`
          INSERT INTO host (email, frpass)
          VALUES (${email}, ${password})
        `;

        return new Response(
          JSON.stringify({ status: "registered", message: "you are signed!" }),
          { headers }
        );
      }

      // ---------------- RESET PASSWORD ----------------
      if (url.pathname === "/auth/reset" && req.method === "POST") {
        const { email } = await req.json();

        const user = await db`
          SELECT * FROM host WHERE email = ${email}
        `;

        if (user.length === 0) {
          return new Response(
            JSON.stringify({ status: "error", message: "Email not found" }),
            { headers, status: 404 }
          );
        }

        // Clear password
        await db`
          UPDATE host
          SET frpass = ''
          WHERE email = ${email}
        `;

        return new Response(
          JSON.stringify({ status: "ok", message: "Password cleared" }),
          { headers }
        );
      }

      return new Response("Not Found", { status: 404 });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: String(err) }),
        { headers, status: 500 }
      );
    }
  },
});

console.log(`Server running on http://localhost:${server.port}`);