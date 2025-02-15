import { MigrationInterface, QueryRunner } from 'typeorm';

export class Docs1738841956260 implements MigrationInterface {
  name = 'Docs1738841956260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspace-permissions" ("id" uuid NOT NULL, "manage" boolean NOT NULL DEFAULT false, "edit" boolean NOT NULL DEFAULT false, "comment" boolean NOT NULL DEFAULT false, "view" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_25909c15ce8fe85ac1e755c0f33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doc_generate_inputs" ("id" uuid NOT NULL, "status" character varying NOT NULL, "prompt" character varying NOT NULL, "content" character varying, "settings" jsonb, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf02c6b9eadf05e91a8ca32bc2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" uuid NOT NULL, "title" character varying, "archived" boolean NOT NULL DEFAULT false, "is_favorite" boolean NOT NULL DEFAULT false, "workspace_id" uuid NOT NULL, "folder_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "preview_id" uuid, "doc_generate_id" uuid NOT NULL, CONSTRAINT "REL_cd9893742ab1f193e40bb1143c" UNIQUE ("doc_generate_id"), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" ADD CONSTRAINT "FK_a2b00f09d17db612f44d4377aa0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_99cefff804cbef8529fe9cfe844" FOREIGN KEY ("preview_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_5a879c083b13ba9dbd0751d0e6a" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2" FOREIGN KEY ("doc_generate_id") REFERENCES "doc_generate_inputs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_e0ccba38ea80d444e2f4614d7cd" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_e0ccba38ea80d444e2f4614d7cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_5a879c083b13ba9dbd0751d0e6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_99cefff804cbef8529fe9cfe844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" DROP CONSTRAINT "FK_a2b00f09d17db612f44d4377aa0"`,
    );
    await queryRunner.query(`DROP TABLE "documents"`);
    await queryRunner.query(`DROP TABLE "doc_generate_inputs"`);
    await queryRunner.query(`DROP TABLE "workspace-permissions"`);
  }
}
