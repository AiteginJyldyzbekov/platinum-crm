import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/createDriverSchema'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'

export interface DeleteDriverProps {
  tid: string
}

export const deleteDriver =
    createAsyncThunk<Driver, DeleteDriverProps, { rejectValue: string }>(
      'delete/driver',
      async (data, thunkApi) => {
        try {
          await deleteDoc(doc(db, 'drivers', data.tid)).then(() => {
            window?.location?.reload()
          })
        } catch (e) {
          console.log(e)
          return thunkApi.rejectWithValue('error')
        }
      }
    )
