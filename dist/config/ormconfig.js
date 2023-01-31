"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'boburbek0119',
    database: 'n37',
    entities: [
        path_1.default.join(__dirname, '..', 'entities', '*.entity.{ts,js}')
    ],
    migrations: [
        path_1.default.join(__dirname, '..', 'migrations', '*.{ts,js}')
    ],
    logging: true,
    synchronize: false
});
