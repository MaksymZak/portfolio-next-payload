import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_visits_locale" AS ENUM('en', 'uk');
  CREATE TABLE "visits_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "visits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"visitor_id" varchar NOT NULL,
  	"owner" boolean DEFAULT false,
  	"locale" "enum_visits_locale",
  	"country" varchar,
  	"referrer" varchar,
  	"ref" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar;
  ALTER TABLE "archive" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
  ALTER TABLE "archive" ADD COLUMN IF NOT EXISTS "featured_order" numeric;
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "repo_url" varchar;
  ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "demo_url" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "visits_id" integer;
  ALTER TABLE "visits_paths" ADD CONSTRAINT "visits_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visits"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "visits_paths_order_idx" ON "visits_paths" USING btree ("_order");
  CREATE INDEX "visits_paths_parent_id_idx" ON "visits_paths" USING btree ("_parent_id");
  CREATE INDEX "visits_visitor_id_idx" ON "visits" USING btree ("visitor_id");
  CREATE INDEX "visits_updated_at_idx" ON "visits" USING btree ("updated_at");
  CREATE INDEX "visits_created_at_idx" ON "visits" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_visits_fk" FOREIGN KEY ("visits_id") REFERENCES "public"."visits"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_visits_id_idx" ON "payload_locked_documents_rels" USING btree ("visits_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visits_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "visits" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "visits_paths" CASCADE;
  DROP TABLE "visits" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_visits_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_visits_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "visits_id";
  DROP TYPE IF EXISTS "public"."enum_visits_locale";`)
}
