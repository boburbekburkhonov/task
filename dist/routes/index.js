"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const verifyToken_1 = require("../middleware/verifyToken");
const validate_1 = require("../validate/validate");
const router = (0, express_1.Router)();
exports.default = router
    .get("/user/", verifyToken_1.verifyToken, user_controller_1.default.GET)
    .post("/users/login", user_controller_1.default.POST_LOGIN)
    .post("/users/sign", (0, validate_middleware_1.default)(validate_1.validationSignUp), user_controller_1.default.POST_SIGN)
    .put("/user/update", verifyToken_1.verifyToken, user_controller_1.default.PUT);
