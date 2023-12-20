import { type CreateDriverSchema } from 'features/CreateDriver/model/types/createDriverSchema'
import { type UserSchema } from '../../../../entities/User'
import { type LoginSchema } from 'features/AuthByEmail'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  createDriver: CreateDriverSchema
}
