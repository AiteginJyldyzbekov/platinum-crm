import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Car } from '../../types/CarSchema'
import { carsRef } from 'shared/config/firebase/firebase'
import { addDoc } from 'firebase/firestore'

interface CreateCarProps {
  car: string
  model: string
  color: string
  numberPlate: string
}

export const createCar = createAsyncThunk<Car, CreateCarProps, { rejectValue: string }>(
  'create/car',
  async (data, thunkApi) => {
    try {
      const newCar = {
        car: data.car,
        model: data.model,
        color: data.color,
        numberPlate: data.numberPlate
      }

      await addDoc(carsRef, newCar)
    } catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
