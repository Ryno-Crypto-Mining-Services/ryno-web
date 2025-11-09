import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Rate limiting table for contact form submissions.
 * Tracks IP addresses and submission counts to prevent spam.
 */
export const contactFormRateLimits = mysqlTable("contactFormRateLimits", {
  id: int("id").autoincrement().primaryKey(),
  /** IP address of the submitter */
  ipAddress: varchar("ipAddress", { length: 45 }).notNull(), // IPv6 max length is 45
  /** Number of submissions within the current time window */
  submissionCount: int("submissionCount").default(1).notNull(),
  /** Timestamp of the first submission in the current window */
  windowStart: timestamp("windowStart").defaultNow().notNull(),
  /** Timestamp of the most recent submission */
  lastSubmission: timestamp("lastSubmission").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactFormRateLimit = typeof contactFormRateLimits.$inferSelect;
export type InsertContactFormRateLimit = typeof contactFormRateLimits.$inferInsert;

// TODO: Add your tables here