import { serve, sql } from "bun";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize database table using Bun's native SQL client
// It automatically connects using the DATABASE_URL environment variable
await sql`
  CREATE TABLE IF NOT EXISTS crEv (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    frpass VARCHAR(17) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    created_at_ev TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at_ev TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const server = serve({
  port: 3180,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {...CORS_HEADERS
        },
      });
    }

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    // Authentication endpoint
    if (url.pathname === "/api/login" && req.method === "POST") {
      const { email, frpass } = await req.json();
      
      // Check if the email already exists in the database
      const existingUser = await sql`SELECT * FROM crEv WHERE email = ${email}`;
      
      if (existingUser.length > 0) {
        // Email exists, proceed to log in directly
        return new Response(JSON.stringify({ status: "logged" }), { headers });
      } else {
        // Email does not exist, create a new record
        try {
          await sql`
            INSERT INTO crEv (email, frpass)
            VALUES (${email}, ${frpass})
          `;
          return new Response(JSON.stringify({ status: "logged" }), { headers });
        } catch (error) {
          // Handle potential unique constraint errors (e.g., duplicated frpass)
          return new Response(JSON.stringify({ error: "Registration failed" }), { 
            status: 400, 
            headers 
          });
        }
      }
    }

    // Password reset endpoint
    if (url.pathname === "/api/reset" && req.method === "POST") {
      // Logic to trigger email recovery goes here
      return new Response(JSON.stringify({ status: "email_sent" }), { headers });
    }

    // Default 404 response
    return new Response("Not Found", { status: 404, headers });
  }
});

//console.log(`Server running at http://localhost:${server.port}`);
