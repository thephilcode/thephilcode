import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_settings_social_links_platform" AS ENUM('github', 'linkedin', 'linktree', 'twitter', 'other');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "hero_settings_typing_phrases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phrase" varchar NOT NULL
  );
  
  CREATE TABLE "hero_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Freelance Web Developer — Uganda',
  	"portrait_id" integer,
  	"primary_cta_label" varchar DEFAULT 'View My Work',
  	"primary_cta_href" varchar DEFAULT '#work',
  	"secondary_cta_label" varchar DEFAULT 'GitHub',
  	"secondary_cta_href" varchar DEFAULT 'https://github.com/thephilcode',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_settings_stack_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" varchar NOT NULL
  );
  
  CREATE TABLE "about_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bio_intro" varchar DEFAULT 'I''m a freelance web developer based in Lira, Uganda. I create digital experiences that range from bold and expressive to clean and precise — whatever the project calls for. Whether it''s a vibrant landing page that demands attention or a structured platform built for clarity, I shape the work to fit the story.',
  	"bio_company_context" varchar DEFAULT 'Much of my work is done through [COMPANY], where I collaborate on web projects for clients across Northern Uganda and beyond. I also take on freelance engagements independently.',
  	"company_name" varchar DEFAULT 'KaKebe Technologies',
  	"company_url" varchar DEFAULT 'https://github.com/KaKebe-Technologies-Limited',
  	"bio_closing" varchar DEFAULT 'I work primarily with JavaScript and Python, and I''ve grown especially fond of React and Next.js for bringing ideas to life on the web. I care about craft — the details that make something feel considered, not just functional. If a thing is worth building, it''s worth building with intention.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_contact_settings_social_links_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar DEFAULT 'Open to freelance work, collaborations, and interesting problems. Send a message and I’ll get back to you.',
  	"formspree_id" varchar DEFAULT 'xzdkvkzl',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "_projects_v" ADD COLUMN "version_thumbnail_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "hero_settings_typing_phrases" ADD CONSTRAINT "hero_settings_typing_phrases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_settings" ADD CONSTRAINT "hero_settings_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_settings_stack_items" ADD CONSTRAINT "about_settings_stack_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_settings_stack" ADD CONSTRAINT "about_settings_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_settings_social_links" ADD CONSTRAINT "contact_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "hero_settings_typing_phrases_order_idx" ON "hero_settings_typing_phrases" USING btree ("_order");
  CREATE INDEX "hero_settings_typing_phrases_parent_id_idx" ON "hero_settings_typing_phrases" USING btree ("_parent_id");
  CREATE INDEX "hero_settings_portrait_idx" ON "hero_settings" USING btree ("portrait_id");
  CREATE INDEX "about_settings_stack_items_order_idx" ON "about_settings_stack_items" USING btree ("_order");
  CREATE INDEX "about_settings_stack_items_parent_id_idx" ON "about_settings_stack_items" USING btree ("_parent_id");
  CREATE INDEX "about_settings_stack_order_idx" ON "about_settings_stack" USING btree ("_order");
  CREATE INDEX "about_settings_stack_parent_id_idx" ON "about_settings_stack" USING btree ("_parent_id");
  CREATE INDEX "contact_settings_social_links_order_idx" ON "contact_settings_social_links" USING btree ("_order");
  CREATE INDEX "contact_settings_social_links_parent_id_idx" ON "contact_settings_social_links" USING btree ("_parent_id");
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "_projects_v_version_version_thumbnail_idx" ON "_projects_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_settings_typing_phrases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_settings_stack_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_settings_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  DROP TABLE "hero_settings_typing_phrases" CASCADE;
  DROP TABLE "hero_settings" CASCADE;
  DROP TABLE "about_settings_stack_items" CASCADE;
  DROP TABLE "about_settings_stack" CASCADE;
  DROP TABLE "about_settings" CASCADE;
  DROP TABLE "contact_settings_social_links" CASCADE;
  DROP TABLE "contact_settings" CASCADE;
  ALTER TABLE "projects" DROP CONSTRAINT "projects_thumbnail_id_media_id_fk";
  
  ALTER TABLE "_projects_v" DROP CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "projects_thumbnail_idx";
  DROP INDEX "_projects_v_version_version_thumbnail_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "projects" DROP COLUMN "thumbnail_id";
  ALTER TABLE "_projects_v" DROP COLUMN "version_thumbnail_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_contact_settings_social_links_platform";`)
}
