import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemesAndFonts1739206331727 implements MigrationInterface {
  name = 'ThemesAndFonts1739206331727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" DROP CONSTRAINT "FK_a2b00f09d17db612f44d4377aa0"`,
    );
    await queryRunner.query(
      `CREATE TABLE "fonts" ("id" character varying NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "UQ_cb7f04e24b87e03fe5b55c80bf1" UNIQUE ("name"), CONSTRAINT "PK_92c3bb05530017556c195ac4a2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "themes" ("id" character varying NOT NULL, "name" character varying, "heading_font" character varying, "heading_font_weight" integer, "body_font" character varying, "body_font_weight" integer, "accent_color" character varying, "logo_url" character varying, "config" jsonb, "priority" integer, "preview_url" character varying, "archived" boolean, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ddbeaab913c18682e5c88155592" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "slides" ("id" uuid NOT NULL, "attrs" jsonb, "content" jsonb, "document_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7907bb06ab78980c123912f7a7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "themes_fonts" ("theme_id" character varying NOT NULL, "font_id" character varying NOT NULL, CONSTRAINT "PK_d10afbce218e7e0c5907c6eb27a" PRIMARY KEY ("theme_id", "font_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e2c4d824eb1da6f0edaef9642" ON "themes_fonts" ("theme_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6bbe373332bbe442904e1d3a00" ON "themes_fonts" ("font_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "theme_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD "theme_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_2c71c7a9ad68bf832d502cbbb1a" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" ADD CONSTRAINT "FK_7630ae50cf3cb8eb4ce0e7f3286" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_f9e002c8c3408fc65aa11bba3ba" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "slides" ADD CONSTRAINT "FK_e7c8b3865ce7777139d4a32a2ac" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "themes_fonts" ADD CONSTRAINT "FK_2e2c4d824eb1da6f0edaef96424" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "themes_fonts" ADD CONSTRAINT "FK_6bbe373332bbe442904e1d3a007" FOREIGN KEY ("font_id") REFERENCES "fonts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "themes_fonts" DROP CONSTRAINT "FK_6bbe373332bbe442904e1d3a007"`,
    );
    await queryRunner.query(
      `ALTER TABLE "themes_fonts" DROP CONSTRAINT "FK_2e2c4d824eb1da6f0edaef96424"`,
    );
    await queryRunner.query(
      `ALTER TABLE "slides" DROP CONSTRAINT "FK_e7c8b3865ce7777139d4a32a2ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_f9e002c8c3408fc65aa11bba3ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" DROP CONSTRAINT "FK_7630ae50cf3cb8eb4ce0e7f3286"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_2c71c7a9ad68bf832d502cbbb1a"`,
    );
    await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "theme_id"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "theme_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6bbe373332bbe442904e1d3a00"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e2c4d824eb1da6f0edaef9642"`,
    );
    await queryRunner.query(`DROP TABLE "themes_fonts"`);
    await queryRunner.query(`DROP TABLE "slides"`);
    await queryRunner.query(`DROP TABLE "themes"`);
    await queryRunner.query(`DROP TABLE "fonts"`);
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" ADD CONSTRAINT "FK_a2b00f09d17db612f44d4377aa0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
