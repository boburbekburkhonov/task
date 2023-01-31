"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = __importDefault(require("../config/ormconfig"));
const user_entity_1 = require("../entities/user.entity");
const errorHandler_1 = require("../error/errorHandler");
const jwt_1 = require("../utils/jwt");
class UserController {
    async POST_LOGIN(req, res, next) {
        const { name, password } = req.body;
        const allUsers = await ormconfig_1.default.getRepository(user_entity_1.Users).find()
            .catch((err) => console.log(err.message, 500));
        if (!allUsers) {
            return next(new errorHandler_1.ErrorHandler('Users not found', 404));
        }
        const foundUser = allUsers.find(e => e.first_name.toLowerCase() == name.toLowerCase() && e.password == password);
        if (!foundUser) {
            return next(new errorHandler_1.ErrorHandler('User not found', 404));
        }
        res.json({
            message: 'Successfully',
            status: 200,
            access_token: (0, jwt_1.sign)({ id: foundUser.id })
        });
    }
    async POST_SIGN(req, res, next) {
        const { first_name, last_name, password } = req.filtered;
        const { raw: [row] } = await ormconfig_1.default
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.Users)
            .values({ first_name, last_name, password })
            .execute();
        if (row) {
            res.status(201).json({
                message: 'User created successfully',
                status: 201,
                access_token: (0, jwt_1.sign)({ id: row.user_id })
            });
        }
    }
}
exports.default = new UserController();
