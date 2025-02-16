import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fix1739689147230 implements MigrationInterface {
  name = 'Fix1739689147230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "REL_cd9893742ab1f193e40bb1143c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2" FOREIGN KEY ("doc_generate_id") REFERENCES "doc_generate_inputs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "REL_cd9893742ab1f193e40bb1143c" UNIQUE ("doc_generate_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_cd9893742ab1f193e40bb1143c2" FOREIGN KEY ("doc_generate_id") REFERENCES "doc_generate_inputs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
