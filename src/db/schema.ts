import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";

/**
 * Users Table - Syncable with Clerk user IDs
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk User ID (e.g., user_2b...) or custom ID
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("participant").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Submissions / Items Table - Adaptable for any hackathon problem statement
 * Using JSONB metadata allows zero-migration adaptation on hackathon day!
 */
export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").default("general").notNull(),
  status: text("status").default("draft").notNull(), // draft, submitted, reviewed, approved
  isFeatured: boolean("is_featured").default(false).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Events / Activity Log - Great for tracking AI agents, audit trails, or notifications
 */
export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(), // "ai_inference", "login", "create_submission", etc.
  details: jsonb("details").$type<Record<string, unknown>>().default({}),
  userId: text("user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
