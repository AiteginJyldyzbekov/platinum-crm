import { type StateSchema } from 'app/providers/StoreProvider'

export const getDriverState = (state: StateSchema) => state.driver.driverDetail
