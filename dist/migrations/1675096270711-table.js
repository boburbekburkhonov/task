"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table1675096270711 = void 0;
class table1675096270711 {
    name = 'table1675096270711';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "employees" ("employees_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employees_name" character varying NOT NULL, CONSTRAINT "PK_7045b9a3fb93da09691e29bdd41" PRIMARY KEY ("employees_id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "employees"`);
    }
}
exports.table1675096270711 = table1675096270711;
