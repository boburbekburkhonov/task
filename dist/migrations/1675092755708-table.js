"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675092755708 = void 0;
class table1675092755708 {
    name = 'table1675092755708';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "thing" ("id" SERIAL NOT NULL, "point" character varying NOT NULL, "linestring" character varying NOT NULL, CONSTRAINT "PK_e7757c5911e20acd09faa22d1ac" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "thing"`);
    }
}
exports.table1675092755708 = table1675092755708;
