"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validationSignUp = joi_1.default.object().keys({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
