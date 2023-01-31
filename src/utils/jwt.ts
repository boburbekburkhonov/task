import jwt from 'jsonwebtoken'

export const sign = (payload: any) => jwt.sign(payload, 'qwert12345')
