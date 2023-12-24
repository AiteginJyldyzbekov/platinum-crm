import { type StateSchema } from 'app/providers/StoreProvider'

export const getCarsState = (state: StateSchema) => state.car.cars
