"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
let Users = class Users {
    id;
    first_name;
    last_name;
    password;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', {
        name: 'user_id'
    })
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_first_name',
        type: 'varchar',
        nullable: false,
    })
], Users.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_last_name',
        type: 'varchar',
        nullable: false,
    })
], Users.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_password',
        type: 'varchar',
        nullable: false,
    })
], Users.prototype, "password", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users'
    })
], Users);
exports.Users = Users;
