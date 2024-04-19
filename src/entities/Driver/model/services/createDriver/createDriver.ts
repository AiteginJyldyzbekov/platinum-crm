import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, usersRef } from 'shared/config/firebase/firebase'
import { addDoc, doc, updateDoc } from 'firebase/firestore'
import { type DriverImages } from '../../types/driverSchema'
import { Car } from 'entities/Car/model/types/CarSchema'

export interface DriverCreateProps {
  email: string
  password: string
  name: string
  lastName: string
  phoneNumber: string
  images?: DriverImages[]
  balance: number
  startRentDate: string
  weekendDates: string[]
  car: string
}

export const createDriver =
  createAsyncThunk<User, DriverCreateProps, { rejectValue: string }>(
    'create/driver',
    async (data, thunkApi) => {
      try {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredential) => {
            const user = userCredential.user
            const carRef = doc(db, "cars", data.car)

            const newDriver = {
              uid: user.uid,
              email: data.email,
              password: data.password,
              name: data.name,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              car: data.car,
              images: data.images,
              balance: 0,
              role: 'driver',
              status: "atWork",
              startRentDate: data.startRentDate,
              weekendDates: data.weekendDates
            }

            await addDoc(usersRef, newDriver)
              .then((data) => {
                updateDoc(carRef, { status: "atWork", driver: data.id })
              })
          })
      } catch (e) {
        console.log(e)
        return thunkApi.rejectWithValue('error')
      }
    }
  )
