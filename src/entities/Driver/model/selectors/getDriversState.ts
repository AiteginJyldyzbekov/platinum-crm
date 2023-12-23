import { type StateSchema } from 'app/providers/StoreProvider'

export const getDriversState = (state: StateSchema) => state.driver.drivers
