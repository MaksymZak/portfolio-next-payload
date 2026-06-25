import { fail, warn } from './logger'

export function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL && process.env.DATABASE_URI) {
    process.env.DATABASE_URL = process.env.DATABASE_URI
    warn('DATABASE_URL missing; falling back to DATABASE_URI')
  }

  if (!process.env.DATABASE_URL) {
    fail('DATABASE_URL is required. Set it in .env (postgres connection string).')
  }

  if (!process.env.PAYLOAD_SECRET) {
    fail('PAYLOAD_SECRET is required.')
  }
}
