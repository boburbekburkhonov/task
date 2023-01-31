"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675101596861 = void 0;
class table1675101596861 {
    name = 'table1675101596861';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_first_name" character varying NOT NULL, "user_last_name" character varying NOT NULL, "user_password" character varying NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.table1675101596861 = table1675101596861;
