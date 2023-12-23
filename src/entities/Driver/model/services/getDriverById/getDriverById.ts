import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/driverSchema'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'

export interface getDriverByIdProps {
  tid: string
}

export const getDriverById = createAsyncThunk<Driver, getDriverByIdProps, { rejectValue: string }>(
  'get/driver',
  async (data, thunkApi) => {
    try {
      const docRef = doc(db, 'users', data.tid)
      const res = await getDoc(docRef)
      if (res.exists()) {
        const driverData = res.data() as Driver
        return driverData
      }
      throw new Error('Driver not found')
    } catch (error) {
      console.error('Ошибка при получении информации о водителе:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
