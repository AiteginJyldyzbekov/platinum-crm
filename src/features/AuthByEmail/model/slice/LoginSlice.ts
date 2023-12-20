import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { LoginSchema } from '../types/loginSchema'
import { loginByEmail } from '../services/loginByEmail/loginByEmail'

const initialState: LoginSchema = {
  isLoading: false,
  email: '',
  password: '',
  error: ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = undefined
        state.isLoading = true
        console.log('pending')
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        console.log('fulfilled')
        state.isLoading = false
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        console.log('rejected')
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
