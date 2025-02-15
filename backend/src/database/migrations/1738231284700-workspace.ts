import { MigrationInterface, QueryRunner } from 'typeorm';

export class Workspace1738231284700 implements MigrationInterface {
  name = 'Workspace1738231284700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspaces" ("id" uuid NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "invite_code" character varying NOT NULL, "workspace_member_permission" character varying NOT NULL, "access_link_permission" character varying NOT NULL, "owner_id" uuid NOT NULL, "disabled" boolean NOT NULL DEFAULT false, "disabled_reason" boolean NOT NULL DEFAULT false, "disabled_comment" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "logo_id" uuid, CONSTRAINT "REL_3bc45ecdd8fdc2108bb92516dd" UNIQUE ("owner_id"), CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workspace_roles" ("id" uuid NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_f25b9e91f9422ef01d5195c9c81" UNIQUE ("name"), CONSTRAINT "UQ_6e0c6f1c70170f2be1101a95d17" UNIQUE ("slug"), CONSTRAINT "PK_baba9a412031c7b3ab0e878b49b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workspace_members" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "workspace_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workspace_role_id" uuid NOT NULL, CONSTRAINT "PK_22ab43ac5865cd62769121d2bc4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "folders" ("id" uuid NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "workspace_id" uuid NOT NULL, "member_count" integer NOT NULL, "is_member" boolean NOT NULL DEFAULT true, "archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workspaces_members" ("workspace_id" uuid NOT NULL, "member_id" uuid NOT NULL, CONSTRAINT "PK_e7a337c7898034d92e7eb83a9a1" PRIMARY KEY ("workspace_id", "member_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2cbb278277bebf896ab6109414" ON "workspaces_members" ("workspace_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee2311e96e8dab0218c7d9a8b7" ON "workspaces_members" ("member_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "folders_members" ("user_id" uuid NOT NULL, "folder_id" uuid NOT NULL, CONSTRAINT "PK_7c7fba8d70329282a3f7f3f6120" PRIMARY KEY ("user_id", "folder_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8acfca57b90d07f7d6a403ec5" ON "folders_members" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99973a81b837a94878e3286ca4" ON "folders_members" ("folder_id") `,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "profile_image_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_3bc45ecdd8fdc2108bb92516dde" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_db982ac46f9291e1942441845c2" FOREIGN KEY ("logo_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_96d6f1aafc327443850f263cd50" FOREIGN KEY ("profile_image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" ADD CONSTRAINT "FK_4e83431119fa585fc7aa8b817db" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" ADD CONSTRAINT "FK_4a7c584ddfe855379598b5e20fd" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" ADD CONSTRAINT "FK_230fa7c6a9952480a2925eab59b" FOREIGN KEY ("workspace_role_id") REFERENCES "workspace_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "folders" ADD CONSTRAINT "FK_844e3900fec9d852b18cb6996dc" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" ADD CONSTRAINT "FK_2cbb278277bebf896ab6109414c" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" ADD CONSTRAINT "FK_ee2311e96e8dab0218c7d9a8b78" FOREIGN KEY ("member_id") REFERENCES "workspace_members"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "folders_members" ADD CONSTRAINT "FK_e8acfca57b90d07f7d6a403ec53" FOREIGN KEY ("user_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "folders_members" ADD CONSTRAINT "FK_99973a81b837a94878e3286ca40" FOREIGN KEY ("folder_id") REFERENCES "workspace_members"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "folders_members" DROP CONSTRAINT "FK_99973a81b837a94878e3286ca40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "folders_members" DROP CONSTRAINT "FK_e8acfca57b90d07f7d6a403ec53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" DROP CONSTRAINT "FK_ee2311e96e8dab0218c7d9a8b78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces_members" DROP CONSTRAINT "FK_2cbb278277bebf896ab6109414c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "folders" DROP CONSTRAINT "FK_844e3900fec9d852b18cb6996dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" DROP CONSTRAINT "FK_230fa7c6a9952480a2925eab59b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" DROP CONSTRAINT "FK_4a7c584ddfe855379598b5e20fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_members" DROP CONSTRAINT "FK_4e83431119fa585fc7aa8b817db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_96d6f1aafc327443850f263cd50"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_db982ac46f9291e1942441845c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_3bc45ecdd8fdc2108bb92516dde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "profile_image_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99973a81b837a94878e3286ca4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8acfca57b90d07f7d6a403ec5"`,
    );
    await queryRunner.query(`DROP TABLE "folders_members"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee2311e96e8dab0218c7d9a8b7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2cbb278277bebf896ab6109414"`,
    );
    await queryRunner.query(`DROP TABLE "workspaces_members"`);
    await queryRunner.query(`DROP TABLE "folders"`);
    await queryRunner.query(`DROP TABLE "workspace_members"`);
    await queryRunner.query(`DROP TABLE "workspace_roles"`);
    await queryRunner.query(`DROP TABLE "workspaces"`);
  }
}
