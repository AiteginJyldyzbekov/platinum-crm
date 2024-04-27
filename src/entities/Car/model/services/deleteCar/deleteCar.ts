import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, storage } from 'shared/config/firebase/firebase'
import { type Car } from '../../types/CarSchema'
import { deleteObject, ref } from 'firebase/storage'

export interface DeleteCarProps {
  car: Car
}

export const deleteCar = createAsyncThunk<Car, DeleteCarProps, { rejectValue: string }>(
  'delete/car',
  async (data, thunkApi) => {
    try {
      await deleteDoc(doc(db, 'cars', data.car.tid))
      if (data.car.driver) {
        const driverRef = doc(db, 'users', data.car.driver)
        updateDoc(driverRef, { status: 'free', car: null })
      }
      if (data.car.images && data.car.images.length > 0) {
        for (const image of data.car.images) {
          await deleteObject(ref(storage, image.url))
        }
      }
      if (data.car.techPassport) {
        await deleteObject(ref(storage, data.car.techPassport.url))
      }
    } catch (error) {
      console.error('Ошибка при удалении машины:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
