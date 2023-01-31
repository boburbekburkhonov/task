import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675101596861 implements MigrationInterface {
    name = 'table1675101596861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_first_name" character varying NOT NULL, "user_last_name" character varying NOT NULL, "user_password" character varying NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
