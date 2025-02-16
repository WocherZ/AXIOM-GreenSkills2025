import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fix11739694779698 implements MigrationInterface {
  name = 'Fix11739694779698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" ADD "preview_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP COLUMN "preview_url"`,
    );
  }
}
