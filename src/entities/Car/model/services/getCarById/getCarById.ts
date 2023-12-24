import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Car } from '../../types/CarSchema'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'

export interface getCarByIdProps {
  tid: string
}

export const getCarById = createAsyncThunk<Car, getCarByIdProps, { rejectValue: string }>(
  'get/car',
  async (data, thunkApi) => {
    try {
      const docRef = doc(db, 'cars', data.tid)
      const res = await getDoc(docRef)
      if (res.exists()) {
        const carData = res.data() as Car
        return carData
      }
      throw new Error('Car not found')
    } catch (error) {
      console.error('Ошибка при получении информации о водителе:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
