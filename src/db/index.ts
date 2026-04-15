import "dotenv/config";
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
  url: process.env.elbaraka_TURSO_DATABASE_URL!,
  authToken: process.env.elbaraka_TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
