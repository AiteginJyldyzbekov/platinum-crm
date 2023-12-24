import { createSlice } from '@reduxjs/toolkit'
import { createDriver } from '../services/createDriver/createDriver'
import { type DriversSchema } from '../types/driverSchema'
import { getDrivers } from '../services/getDrivers/getDrivers'
import { deleteDriver } from '../services/deleteDriver/deleteDriver'
import { getDriverById } from '../services/getDriverById/getDriverById'

const initialState: DriversSchema = {
  drivers: {
    isLoading: false,
    error: '',
    result: []
  },
  driverDetail: {
    isLoading: false,
    error: '',
    result: null
  },
  createDriver: {
    isLoading: false,
    error: ''
  }
}

export const driverSlice = createSlice({
  name: 'create/driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create driver
      .addCase(createDriver.pending, (state) => {
        state.createDriver.error = undefined
        state.createDriver.isLoading = true
        console.log('pending')
      })
      .addCase(createDriver.fulfilled, (state) => {
        console.log('fulfilled')
        state.createDriver.isLoading = false
      })
      .addCase(createDriver.rejected, (state, action) => {
        console.log('rejected')
        state.createDriver.isLoading = false
        state.createDriver.error = action.payload
      })
      // Get drivers
      .addCase(getDrivers.pending, (state) => {
        state.drivers.error = undefined
        state.drivers.isLoading = true
        console.log('pending')
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        console.log('fulfilled')
        state.drivers.result = action.payload
        state.drivers.isLoading = false
      })
      .addCase(getDrivers.rejected, (state, action) => {
        console.log('rejected')
        state.drivers.isLoading = false
        state.drivers.error = action.payload
      })

      // Delete driver
      .addCase(deleteDriver.pending, (state) => {
        state.driverDetail.error = undefined
        state.driverDetail.isLoading = true
        console.log('pending')
      })
      .addCase(deleteDriver.fulfilled, (state) => {
        console.log('fulfilled')
        state.driverDetail.isLoading = false
      })
      .addCase(deleteDriver.rejected, (state, action) => {
        console.log('rejected')
        state.driverDetail.isLoading = false
        state.driverDetail.error = action.payload
      })

      // Get driver detail
      .addCase(getDriverById.pending, (state) => {
        state.driverDetail.error = undefined
        state.driverDetail.isLoading = true
        console.log('pending')
      })
      .addCase(getDriverById.fulfilled, (state, action) => {
        console.log('fulfilled')
        state.driverDetail.isLoading = false
        state.driverDetail.result = action.payload
      })
      .addCase(getDriverById.rejected, (state, action) => {
        console.log('rejected')
        state.driverDetail.isLoading = false
        state.driverDetail.error = action.payload
      })
  }
})

export const { actions: driverActions } = driverSlice
export const { reducer: driverReducer } = driverSlice
