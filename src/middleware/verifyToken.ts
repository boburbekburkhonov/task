import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../error/errorHandler'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  if(!token){
    return next(new ErrorHandler('Provide access token', 401))
  }

  jwt.verify(token, 'qwert12345', (err: unknown, decode: any): void => {
    if(err instanceof jwt.JsonWebTokenError){
      return next(new ErrorHandler('Invalid token', 401))
    }

    req.userId = decode.id

    next()
  })
}