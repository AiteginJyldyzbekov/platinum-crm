import { createSlice } from '@reduxjs/toolkit'
import { createDriver } from '../services/createDriver/createDriver'
import { type CreateDriverSchema } from '../types/createDriverSchema'

const initialState: CreateDriverSchema = {
  isLoading: false,
  error: ''
}

export const createDriverSlice = createSlice({
  name: 'create/driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDriver.pending, (state) => {
        state.error = undefined
        state.isLoading = true
        console.log('pending')
      })
      .addCase(createDriver.fulfilled, (state) => {
        console.log('fulfilled')
        state.isLoading = false
      })
      .addCase(createDriver.rejected, (state, action) => {
        console.log('rejected')
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: createDriverActions } = createDriverSlice
export const { reducer: createDriverReducer } = createDriverSlice
