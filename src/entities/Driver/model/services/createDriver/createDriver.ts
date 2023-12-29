import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, usersRef } from 'shared/config/firebase/firebase'
import { addDoc } from 'firebase/firestore'

interface CreateDriverProps {
  email: string
  password: string
  name: string
  surname: string
  lastname: string
  phoneNumber: string
}

export const createDriver =
  createAsyncThunk<User, CreateDriverProps, { rejectValue: string }>(
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
              surname: data.surname,
              lastname: data.lastname,
              phoneNumber: data.phoneNumber,
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
