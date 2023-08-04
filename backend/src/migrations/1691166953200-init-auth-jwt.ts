import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAuthJwt1691166953200 implements MigrationInterface {
    name = 'InitAuthJwt1691166953200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(256) NOT NULL, "passwordHashed" character varying(128) NOT NULL, "username" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jwt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "revoked" boolean NOT NULL, "expiry" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_5d23295f3f8f90b85e63e8040fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jwt" ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jwt" DROP CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f"`);
        await queryRunner.query(`DROP TABLE "jwt"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
