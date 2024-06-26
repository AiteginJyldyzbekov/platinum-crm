import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { loginReducer } from 'features/AuthByEmail/model/slice/LoginSlice'
import { driverReducer } from 'entities/Driver/model/slice/DriverSlice'
import { carReducer } from 'entities/Car/model/slice/CarSlice'
import { paginationReducer } from 'entities/Pagination/model/slice/PaginationSlice'

export function createReduxStore (initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    driver: driverReducer,
    car: carReducer,
    pagination: paginationReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })
}

const store = createReduxStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
