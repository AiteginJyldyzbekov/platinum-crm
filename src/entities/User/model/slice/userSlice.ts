import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type UserSchema, type User } from '../types/user'

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage'

const initialState: UserSchema = {
  isAuth: false,
  authData: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      state.isAuth = true
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        state.authData = JSON.parse(user)
        state.isAuth = true
      }
    },
    logout: (state) => {
      state.authData = undefined
      state.isAuth = false
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
