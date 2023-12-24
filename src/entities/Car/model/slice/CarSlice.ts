import { createSlice } from '@reduxjs/toolkit'
import { type CarsSchema } from '../types/CarSchema'
import { getCarById } from '../services/getCarById/getCarById'
import { createCar } from '../services/createCar/createCar'
import { getCars } from '../services/getCars/getCars'
import { deleteCar } from '../services/deleteCar/deleteCar'

const initialState: CarsSchema = {
  cars: {
    isLoading: false,
    error: '',
    result: []
  },
  carDetail: {
    isLoading: false,
    error: '',
    result: null
  },
  createCar: {
    isLoading: false,
    error: ''
  }
}

export const carSlice = createSlice({
  name: 'create/car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create car
      .addCase(createCar.pending, (state) => {
        state.createCar.error = undefined
        state.createCar.isLoading = true
        console.log('pending')
      })
      .addCase(createCar.fulfilled, (state) => {
        console.log('fulfilled')
        state.createCar.isLoading = false
      })
      .addCase(createCar.rejected, (state, action) => {
        console.log('rejected')
        state.createCar.isLoading = false
        state.createCar.error = action.payload
      })
    // Get cars
      .addCase(getCars.pending, (state) => {
        state.cars.error = undefined
        state.cars.isLoading = true
        console.log('pending')
      })
      .addCase(getCars.fulfilled, (state, action) => {
        console.log('fulfilled')
        state.cars.result = action.payload
        state.cars.isLoading = false
      })
      .addCase(getCars.rejected, (state, action) => {
        console.log('rejected')
        state.cars.isLoading = false
        state.cars.error = action.payload
      })

    // Delete car
      .addCase(deleteCar.pending, (state) => {
        state.carDetail.error = undefined
        state.carDetail.isLoading = true
        console.log('pending')
      })
      .addCase(deleteCar.fulfilled, (state) => {
        console.log('fulfilled')
        state.carDetail.isLoading = false
      })
      .addCase(deleteCar.rejected, (state, action) => {
        console.log('rejected')
        state.carDetail.isLoading = false
        state.carDetail.error = action.payload
      })

    // Get car detail
      .addCase(getCarById.pending, (state) => {
        state.carDetail.error = undefined
        state.carDetail.isLoading = true
        console.log('pending')
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        console.log('fulfilled')
        state.carDetail.isLoading = false
        state.carDetail.result = action.payload
      })
      .addCase(getCarById.rejected, (state, action) => {
        console.log('rejected')
        state.carDetail.isLoading = false
        state.carDetail.error = action.payload
      })
  }
})

export const { actions: carActions } = carSlice
export const { reducer: carReducer } = carSlice
