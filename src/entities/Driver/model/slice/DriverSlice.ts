import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createDriver } from '../services/createDriver/createDriver'
import { type Driver, type DriversSchema } from '../types/createDriverSchema'
import { getDrivers } from '../services/getDrivers/getDrivers'
import { deleteDriver } from '../services/deleteDriver/deleteDriver'

const initialState: DriversSchema = {
  isLoading: false,
  error: '',
  drivers: []
}

export const driverSlice = createSlice({
  name: 'create/driver',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<Driver[]>) => {
      state.drivers = action.payload
    }
  },
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
      // Get drivers
      .addCase(getDrivers.pending, (state) => {
        state.error = undefined
        state.isLoading = true
        console.log('pending')
      })
      .addCase(getDrivers.fulfilled, (state) => {
        console.log('fulfilled')
        state.isLoading = false
      })
      .addCase(getDrivers.rejected, (state, action) => {
        console.log('rejected')
        state.isLoading = false
        state.error = action.payload
      })

      // Delete driver
      .addCase(deleteDriver.pending, (state) => {
        state.error = undefined
        state.isLoading = true
        console.log('pending')
      })
      .addCase(deleteDriver.fulfilled, (state) => {
        console.log('fulfilled')
        state.isLoading = false
      })
      .addCase(deleteDriver.rejected, (state, action) => {
        console.log('rejected')
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: driverActions } = driverSlice
export const { reducer: driverReducer } = driverSlice
