import { type DriversSchema } from 'entities/Driver/model/types/createDriverSchema'
import { type UserSchema } from '../../../../entities/User'
import { type LoginSchema } from 'features/AuthByEmail'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  drivers: DriversSchema
}
