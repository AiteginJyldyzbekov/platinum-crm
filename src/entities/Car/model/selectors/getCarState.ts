import { type StateSchema } from 'app/providers/StoreProvider'

export const getCarState = (state: StateSchema) => state.car.carDetail
