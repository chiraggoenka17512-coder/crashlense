import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        success: false,
        message: "DATABASE_URL is not set in environment variables.",
        instructions:
          "Copy your Supabase connection string from Project Settings -> Database -> Connection string (URI) to DATABASE_URL in .env.local",
      },
      { status: 400 }
    );
  }

  const startTime = Date.now();
  try {
    const result = await db.execute(sql`SELECT NOW() as current_time, current_database() as db_name;`);
    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Supabase Postgres connected successfully via Drizzle ORM!",
      latencyMs: `${latencyMs}ms`,
      data: result[0],
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Supabase PostgreSQL database.",
        error: err.message,
        tip: "If connecting to Supabase transaction pooler, ensure port is 6543 and prepare: false is set.",
      },
      { status: 500 }
    );
  }
}
