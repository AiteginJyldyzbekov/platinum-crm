import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { type Car } from '../../types/CarSchema'

export const updateCar = createAsyncThunk<User, Car, { rejectValue: string }>(
  'update/car',
  async (data, thunkApi) => {
    const { tid, ...authData } = data
    try {
      const ref = doc(db, 'cars', tid)
      await updateDoc(ref, authData)
    } catch (e) {
      console.log(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
