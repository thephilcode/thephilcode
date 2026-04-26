import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "slug" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_slug" varchar;
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "projects_slug_idx";
  DROP INDEX "_projects_v_version_version_slug_idx";
  ALTER TABLE "projects" DROP COLUMN "slug";
  ALTER TABLE "_projects_v" DROP COLUMN "version_slug";`)
}
