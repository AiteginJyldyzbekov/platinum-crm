import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'
import { type Driver } from '../../types/driverSchema'

export const updateDriver = createAsyncThunk<User, Driver, { rejectValue: string }>(
  'update/driver',
  async (data, thunkApi) => {
    const { tid, ...authData } = data
    try {
      const ref = doc(db, 'users', tid)
      await updateDoc(ref, authData)
    } catch (e) {
      console.log(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
