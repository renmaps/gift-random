import { db, initDB } from "./src/db/initdb";

await initDB();

const server = Bun.serve({
  port: Number(process.env.PORT) || 3000,
  hostname: "0.0.0.0",


  async fetch(req) {
    const url = new URL(req.url);

    // Healthcheck endpoint
    if (url.pathname === "/") {
      return new Response("OK");
    }

    const headers = {
      "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
       "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers});
    }

    try {
      if (url.pathname === "/auth/login" && req.method === "POST") {
        const { email, password } = await req.json();

        const user = await db`
          SELECT * FROM host WHERE email = ${email}
        `;

        if (user.length > 0) {
          if (user[0].frpass === password) {
            return new Response(JSON.stringify({ status: "login" }), { headers });
          }
          return new Response(JSON.stringify({ status: "error", message: "Wrong password" }), { headers, status: 401 });
        }

        await db`
          INSERT INTO host (email, frpass)
          VALUES (${email}, ${password})
        `;

        return new Response(JSON.stringify({ status: "registered" }), { headers });
      }

      return new Response("Not Found", { status: 404 });

    } catch (err) {
      console.error(err);
      return new Response("Internal error", { status: 500 });
    }
  },
});

