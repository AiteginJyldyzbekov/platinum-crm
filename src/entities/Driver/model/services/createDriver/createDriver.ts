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
}

export const createDriver =
    createAsyncThunk<User, CreateDriverProps, { rejectValue: string }>(
      'create/driver',
      async (authData, thunkApi) => {
        try {
          createUserWithEmailAndPassword(auth, authData.email, authData.password)
            .then(async (userCredential) => {
              const user = userCredential.user
              const newDriver = {
                uid: user.uid,
                email: authData.email,
                password: authData.password,
                name: authData.name,
                surname: authData.surname,
                lastname: authData.lastname,
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
