"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = __importDefault(require("../config/ormconfig"));
const user_entity_1 = require("../entities/user.entity");
const errorHandler_1 = require("../error/errorHandler");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
class UserController {
    async GET(req, res, next) {
        const { userId } = req;
        const foundUser = await ormconfig_1.default
            .getRepository(user_entity_1.Users)
            .findOneBy({
            id: userId,
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        res.status(200).json({
            data: foundUser,
            status: 200,
        });
    }
    async POST_LOGIN(req, res, next) {
        const { name, password } = req.body;
        const allUsers = await ormconfig_1.default
            .getRepository(user_entity_1.Users)
            .find()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        const foundUser = allUsers?.find((e) => e.first_name.toLowerCase() == name.toLowerCase() &&
            (0, bcrypt_1.comparePassword)(password, e.password));
        if (!foundUser) {
            return next(new errorHandler_1.ErrorHandler("Siz registratsiya qilmagansiz, yoki ma'lumotingizni o'zgartirgansiz", 400));
        }
        res.json({
            message: "Successfully",
            status: 200,
            access_token: (0, jwt_1.sign)({ id: foundUser.id }),
        });
    }
    async POST_SIGN(req, res, next) {
        const { firstName, lastName, password } = req.filtered;
        const passwordHash = (0, bcrypt_1.encodePassword)(password);
        const allUsers = await ormconfig_1.default
            .getRepository(user_entity_1.Users)
            .find()
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        const foundUser = allUsers?.find((e) => e.first_name.toLowerCase() == firstName?.toLowerCase() &&
            e.last_name.toLowerCase() == lastName?.toLowerCase() &&
            (0, bcrypt_1.comparePassword)(password, e.password));
        if (foundUser) {
            return next(new errorHandler_1.ErrorHandler("Siz ro'yxatdan o'tgansiz", 400));
        }
        const { raw: [row], } = await ormconfig_1.default
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.Users)
            .values({
            first_name: firstName,
            last_name: lastName,
            password: passwordHash,
        })
            .execute();
        if (row) {
            res.status(201).json({
                message: "User created successfully",
                status: 201,
                access_token: (0, jwt_1.sign)({ id: row.user_id }),
            });
        }
    }
    async PUT(req, res, next) {
        const { userId } = req;
        const { firstName, lastName, password } = req.body;
        let hashPassword;
        if (password) {
            hashPassword = (0, bcrypt_1.encodePassword)(password);
        }
        const foundUser = await ormconfig_1.default
            .getRepository(user_entity_1.Users)
            .findOneBy({
            id: userId,
        })
            .catch((err) => next(new errorHandler_1.ErrorHandler(err.message, 500)));
        const updateUser = await ormconfig_1.default
            .getRepository(user_entity_1.Users)
            .createQueryBuilder()
            .update(user_entity_1.Users)
            .set({
            first_name: firstName || foundUser?.first_name,
            last_name: lastName || foundUser?.last_name,
            password: hashPassword || foundUser?.password,
        })
            .where("id = :id", { id: userId })
            .execute();
        if (updateUser) {
            res.status(200).json({
                message: "Updated successfully",
                status: 200,
            });
        }
    }
}
exports.default = new UserController();
