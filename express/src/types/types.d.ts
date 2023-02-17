declare namespace Express {
  import { IAuth } from '../models/auth.model'
  import { IUser } from '../models/user.model'

  export interface Request {
    token: string
    auth: IAuth
    user: IUser
  }
}
