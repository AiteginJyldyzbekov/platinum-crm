import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/driverSchema'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, firebaseConfig, storage } from 'shared/config/firebase/firebase'
import { deleteApp, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { deleteObject, ref } from 'firebase/storage'

export interface DeleteDriverProps {
  driver: Driver
}

export const deleteDriver = createAsyncThunk<Driver, DeleteDriverProps, { rejectValue: string }>(
  'delete/driver',
  async (data, thunkApi) => {
    const { driver } = data
    try {
      const secondaryApp = initializeApp(firebaseConfig)
      const auth = getAuth(secondaryApp)

      await signInWithEmailAndPassword(auth, driver.email, driver.password)
      if (driver.car) {
        const carRef = doc(db, 'cars', driver.car)
        updateDoc(carRef, { status: 'free', driver: null })
      }

      if (driver.images) {
        for (const image of driver.images) {
          await deleteObject(ref(storage, image.url))
        }
      }

      const user = auth.currentUser
      if (user) {
        await deleteDoc(doc(db, 'users', driver.tid))
        await user.delete()
        await signOut(auth)
        deleteApp(secondaryApp)
      } else {
        console.error('Пользователь не найден')
      }
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
