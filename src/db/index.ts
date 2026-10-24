import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// Singleton pattern for database client in development/serverless
declare global {
  // eslint-disable-next-line no-var
  var __postgres_client__: postgres.Sql | undefined;
}

let client: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  client = postgres(connectionString || "postgres://placeholder:placeholder@localhost:5432/placeholder", {
    prepare: false, // Required for Supabase Transaction Pooler (port 6543)
    max: 10,
  });
} else {
  if (!global.__postgres_client__) {
    global.__postgres_client__ = postgres(connectionString || "postgres://placeholder:placeholder@localhost:5432/placeholder", {
      prepare: false,
      max: 5,
    });
  }
  client = global.__postgres_client__;
}

export const db = drizzle(client, { schema });
export { schema };
