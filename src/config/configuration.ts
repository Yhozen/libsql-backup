import { z } from 'zod';

const configSchema = z.object({
  TURSO_SYNC_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
});

export type ConfigSchema = z.infer<typeof configSchema>;

export const configuration = (): ConfigSchema =>
  configSchema.parse({
    TURSO_SYNC_URL: process.env.TURSO_SYNC_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  });
