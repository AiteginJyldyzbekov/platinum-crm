import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Car } from '../../types/CarSchema'
import { db } from 'shared/config/firebase/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getCars = createAsyncThunk<Car[], undefined, { rejectValue: string }>(
  'get/cars',
  async (_, thunkApi) => {
    try {
      const cars: Car[] = []
      const data = await getDocs(collection(db, 'cars'))
      data.forEach((doc) => {
        cars.push({ tid: doc.id, ...doc.data() } as Car)
      })
      return cars
    } catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
