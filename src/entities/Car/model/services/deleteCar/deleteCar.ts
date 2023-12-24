import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { type Car } from '../../types/CarSchema'

export interface DeleteCarProps {
  tid: string
}

export const deleteCar = createAsyncThunk<Car, DeleteCarProps, { rejectValue: string }>(
  'delete/car',
  async (data, thunkApi) => {
    try {
      await deleteDoc(doc(db, 'cars', data.tid)).then(() => {
        window?.location?.reload()
      })
    } catch (error) {
      console.error('Ошибка при удалении машины:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
