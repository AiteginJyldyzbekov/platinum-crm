import { type DriversSchema } from 'entities/Driver/model/types/driverSchema'
import { type UserSchema } from '../../../../entities/User'
import { type LoginSchema } from 'features/AuthByEmail'
import { type CarsSchema } from 'entities/Car/model/types/CarSchema'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  driver: DriversSchema
  car: CarsSchema
}
