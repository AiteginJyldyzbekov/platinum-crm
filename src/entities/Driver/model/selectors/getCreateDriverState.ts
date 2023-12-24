import { type StateSchema } from 'app/providers/StoreProvider'

export const getCreateDriverState = (state: StateSchema) => state.driver.createDriver
