import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { loginReducer } from 'features/AuthByEmail/model/slice/LoginSlice'
import { createDriverReducer } from 'features/CreateDriver/model/slice/CreateDriverSlice'

export function createReduxStore (initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    createDriver: createDriverReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
