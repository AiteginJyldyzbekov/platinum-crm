import { type StateSchema } from 'app/providers/StoreProvider'

export const getCreateCarState = (state: StateSchema) => state.car.createCar
