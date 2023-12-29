import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from 'entities/User'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'shared/config/firebase/firebase'

export enum BalanceType {
  'plus',
  'minus'
}

interface changeBalanceProps {
  tid: string
  type: BalanceType
  currentBalance: number
  amount: number
}

export const changeBalance =
    createAsyncThunk<User, changeBalanceProps, { rejectValue: string }>(
      'changeBalance/driver',
      async (data, thunkApi) => {
        const { tid, currentBalance, type, amount } = data
        const ref = doc(db, 'users', tid)
        try {
          if (type === BalanceType.minus) {
            const newBalance = currentBalance - amount
            await updateDoc(ref, {
              balance: newBalance
            })
          } else {
            const newBalance = currentBalance + amount
            await updateDoc(ref, {
              balance: newBalance
            })
          }
        } catch (e) {
          console.log(e)
          return thunkApi.rejectWithValue('error')
        }
      }
    )
