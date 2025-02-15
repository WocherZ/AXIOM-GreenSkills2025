import { MigrationInterface, QueryRunner } from 'typeorm';

export class DraftContent1739634603286 implements MigrationInterface {
  name = 'DraftContent1739634603286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" DROP CONSTRAINT "FK_ee2311e96e8dab0218c7d9a8b78"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee2311e96e8dab0218c7d9a8b7"`,
    );
    await queryRunner.query(`ALTER TABLE "documents" ADD "content" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" ADD "content" jsonb`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_90d143ce779b0920c4111be6ad" ON "workspaces_members" ("member_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" ADD CONSTRAINT "FK_90d143ce779b0920c4111be6adc" FOREIGN KEY ("member_id") REFERENCES "workspace_members"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" DROP CONSTRAINT "FK_90d143ce779b0920c4111be6adc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_90d143ce779b0920c4111be6ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doc_generate_inputs" ADD "content" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "content"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_ee2311e96e8dab0218c7d9a8b7" ON "workspaces_members" ("member_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" ADD CONSTRAINT "FK_ee2311e96e8dab0218c7d9a8b78" FOREIGN KEY ("member_id") REFERENCES "workspace_members"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
