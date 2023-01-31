"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const validate_1 = require("../validate/validate");
const router = (0, express_1.Router)();
exports.default = router
    .post('/users/login', user_controller_1.default.POST_LOGIN)
    .post('/users/sign', (0, validate_middleware_1.default)(validate_1.validationSignUp), user_controller_1.default.POST_SIGN);
