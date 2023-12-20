import { type UserSchema } from '../../../../entities/User'
import { type LoginSchema } from 'features/AuthByEmail'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
}
