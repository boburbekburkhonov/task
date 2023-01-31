import { NextFunction, Request, Response } from "express";
import dataSource from "../config/ormconfig";
import { Users } from "../entities/user.entity";
import { ErrorHandler } from "../error/errorHandler";
import { comparePassword, encodePassword } from "../utils/bcrypt";
import { sign } from "../utils/jwt";

class UserController {
  public async GET(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req;

    const foundUser: any = await dataSource
      .getRepository(Users)
      .findOneBy({
        id: userId,
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)));

    res.status(200).json({
      data: foundUser,
      status: 200,
    });
  }

  public async POST_LOGIN(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, password } = req.body;

    const allUsers: any = await dataSource
      .getRepository(Users)
      .find()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)));

    const foundUser: any = allUsers?.find(
      (e: { first_name: string; password: any }) =>
        e.first_name.toLowerCase() == name.toLowerCase() &&
        comparePassword(password, e.password)
    );

    if (!foundUser) {
      return next(
        new ErrorHandler(
          "Siz registratsiya qilmagansiz, yoki ma'lumotingizni o'zgartirgansiz",
          400
        )
      );
    }

    res.json({
      message: "Successfully",
      status: 200,
      access_token: sign({ id: foundUser.id }),
    });
  }

  public async POST_SIGN(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, password } = req.filtered;
    const passwordHash = encodePassword(password);

    const allUsers: any = await dataSource
      .getRepository(Users)
      .find()
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)));

    const foundUser: any = allUsers?.find(
      (e: { first_name: string; last_name: string; password: string }) =>
        e.first_name.toLowerCase() == firstName?.toLowerCase() &&
        e.last_name.toLowerCase() == lastName?.toLowerCase() &&
        comparePassword(password, e.password)
    );

    if (foundUser) {
      return next(new ErrorHandler("Siz ro'yxatdan o'tgansiz", 400));
    }

    const {
      raw: [row],
    }: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
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
        access_token: sign({ id: row.user_id }),
      });
    }
  }

  public async PUT(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId } = req;
    const { firstName, lastName, password } = req.body;

    let hashPassword: any;

    if (password) {
      hashPassword = encodePassword(password);
    }

    const foundUser: any = await dataSource
      .getRepository(Users)
      .findOneBy({
        id: userId,
      })
      .catch((err: ErrorHandler) => next(new ErrorHandler(err.message, 500)));

    const updateUser: any = await dataSource
      .getRepository(Users)
      .createQueryBuilder()
      .update(Users)
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

export default new UserController();
