import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, usersRef } from 'shared/config/firebase/firebase'
import { addDoc } from 'firebase/firestore'
import { type DriverImages, type DriverWeekendDates } from '../../types/driverSchema'
import { type Car } from 'entities/Car/model/types/CarSchema'

export interface DriverCreateProps {
  email: string
  password: string
  name: string
  lastName: string
  phoneNumber: string
  images?: DriverImages[]
  balance: number
  startRentDate: string
  weekendDates: DriverWeekendDates[]
  car: Car
}

export const createDriver =
  createAsyncThunk<User, DriverCreateProps, { rejectValue: string }>(
    'create/driver',
    async (data, thunkApi) => {
      try {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            const user = userCredential.user
            const newDriver = {
              uid: user.uid,
              email: data.email,
              password: data.password,
              name: data.name,
              lastname: data.lastName,
              phoneNumber: data.phoneNumber,
              car: data.car,
              images: data.images,
              balance: 0,
              role: 'driver'
            }

            await addDoc(usersRef, newDriver)
          })
      } catch (e) {
        console.log(e)
        return thunkApi.rejectWithValue('error')
      }
    }
  )
