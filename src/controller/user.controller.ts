import { NextFunction, Request, Response } from "express";
import dataSource from '../config/ormconfig'
import { Users } from "../entities/user.entity";
import { ErrorHandler } from "../error/errorHandler";
import { sign } from "../utils/jwt";

class UserController {
  public async POST_LOGIN(req: Request, res: Response, next: NextFunction): Promise<void>  {
    const { name, password } = req.body;

    const allUsers = await dataSource.getRepository(Users).find()
    .catch((err: ErrorHandler) => console.log(err.message, 500))

    if(!allUsers){
      return next(new ErrorHandler('Users not found', 404))
    }

    const foundUser = allUsers.find(e => e.first_name.toLowerCase() == name.toLowerCase() && e.password == password);

    if(!foundUser){
      return next(new ErrorHandler('User not found', 404))
    }

    res.json({
      message: 'Successfully',
      status: 200,
      access_token: sign({ id: foundUser.id })
    })
  }

  public async POST_SIGN(req: Request, res: Response, next: NextFunction): Promise<void>  {
    const { first_name, last_name, password } = req.filtered

    const { raw: [row] }: any = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({ first_name, last_name, password })
      .execute()


    if(row){
      res.status(201).json({
        message: 'User created successfully',
        status: 201,
        access_token: sign({ id: row.user_id })
      })
    }
  }

}

export default new UserController()