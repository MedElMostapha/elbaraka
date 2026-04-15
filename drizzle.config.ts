import "dotenv/config";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.elbaraka_TURSO_DATABASE_URL!,
    authToken: process.env.elbaraka_TURSO_AUTH_TOKEN!,
  },
});
