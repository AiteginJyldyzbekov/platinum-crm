import { type CounterSchema } from 'entities/Counter/model/types/counterSchema'
import { type UserSchema } from '../../../../entities/User'
import { type LoginSchema } from 'features/AuthByEmail'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  loginForm: LoginSchema
}
