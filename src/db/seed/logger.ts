export const log = (message: string) => console.log(`[seed] ${message}`)

export const warn = (message: string) => console.warn(`[seed] WARN ${message}`)

export const fail = (message: string): never => {
  console.error(`[seed] ERROR ${message}`)
  process.exit(1)
}
