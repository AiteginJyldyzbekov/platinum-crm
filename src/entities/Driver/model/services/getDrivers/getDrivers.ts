import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/createDriverSchema'
import { usersRef } from 'shared/config/firebase/firebase'
import { type QueryDocumentSnapshot, getDocs, query, where } from 'firebase/firestore'
import { driverActions } from '../../slice/DriverSlice'

export const getDrivers = createAsyncThunk<Driver[], undefined, { rejectValue: string }>(
  'get/drivers',
  async (_, thunkApi) => {
    try {
      const q = query(usersRef, where('role', '==', 'driver'))
      const querySnapshot = await getDocs(q)

      const data: Driver[] = []

      querySnapshot.forEach((doc: QueryDocumentSnapshot<Driver>) => {
        data.push({ tid: doc.id, ...doc.data() })
      })

      thunkApi.dispatch(driverActions.setDrivers(data))
    } catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
