import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/driverSchema'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, firebaseConfig } from 'shared/config/firebase/firebase'
import { deleteApp, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export interface DeleteDriverProps {
  tid: string
  email: string
  password: string
}

export const deleteDriver = createAsyncThunk<Driver, DeleteDriverProps, { rejectValue: string }>(
  'delete/driver',
  async (data, thunkApi) => {
    try {
      const secondaryApp = initializeApp(firebaseConfig)
      const auth = getAuth(secondaryApp)

      await signInWithEmailAndPassword(auth, data.email, data.password)

      const user = auth.currentUser
      if (user) {
        await deleteDoc(doc(db, 'users', data.tid))
        await user.delete()
        await signOut(auth)
        deleteApp(secondaryApp)
        window?.location?.reload()
      } else {
        console.error('Пользователь не найден')
      }
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
