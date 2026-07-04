import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import { generateNKeysBetween } from 'payload/shared'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "archive" ADD COLUMN IF NOT EXISTS "_order" varchar;
    CREATE INDEX IF NOT EXISTS "archive__order_idx" ON "archive" USING btree ("_order");
  `)

  const existingOrderColumn = await db.execute(sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'archive'
      AND column_name = 'order';
  `)

  if (existingOrderColumn.rows.length === 0) {
    return
  }

  const { rows } = await db.execute<{ id: number; order: string }>(sql`
    SELECT id, "order"
    FROM "archive"
    ORDER BY "order" ASC;
  `)

  if (rows.length === 0) {
    await db.execute(sql`ALTER TABLE "archive" DROP COLUMN IF EXISTS "order";`)
    return
  }

  const orderKeys = generateNKeysBetween(null, null, rows.length)

  for (const [index, row] of rows.entries()) {
    await db.execute(sql`
      UPDATE "archive"
      SET "_order" = ${orderKeys[index]}
      WHERE id = ${row.id};
    `)
  }

  await db.execute(sql`ALTER TABLE "archive" DROP COLUMN IF EXISTS "order";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "archive" ADD COLUMN IF NOT EXISTS "order" numeric;
    ALTER TABLE "archive" DROP COLUMN IF EXISTS "_order";
    DROP INDEX IF EXISTS "archive__order_idx";
  `)
}
