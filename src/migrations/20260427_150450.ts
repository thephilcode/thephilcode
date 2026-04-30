import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='slug') THEN
        ALTER TABLE "projects" ADD COLUMN "slug" varchar;
        ALTER TABLE "_projects_v" ADD COLUMN "version_slug" varchar;
        CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
        CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
      END IF;
    END $$);
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='slug') THEN
        DROP INDEX IF EXISTS "projects_slug_idx";
        DROP INDEX IF EXISTS "_projects_v_version_version_slug_idx";
        ALTER TABLE "projects" DROP COLUMN IF EXISTS "slug";
        ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_slug";
      END IF;
    END $$);
  `);
}
