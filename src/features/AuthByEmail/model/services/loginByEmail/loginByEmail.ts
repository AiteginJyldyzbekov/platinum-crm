import { createAsyncThunk } from '@reduxjs/toolkit'
import { userActions, type User } from '../../../../../entities/User'
import { getUserByUID } from 'features/AuthByEmail/hook/getUserByUID'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'shared/config/firebase/firebase'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage'

interface AuthByEmailProps {
  email: string
  password: string
  isRemember: boolean
}

export const loginByEmail =
  createAsyncThunk<User, AuthByEmailProps, { rejectValue: string }>(
    'login/loginByEmail',
    async (authData, thunkApi) => {
      try {
        signInWithEmailAndPassword(auth, authData.email, authData.password)
          .then(async (data) => {
            const user = await getUserByUID(data.user.uid)
            if (authData.isRemember) {
              localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
            }
            thunkApi.dispatch(userActions.setAuthData(user))
          })
      } catch (e) {
        console.log(e)
        return thunkApi.rejectWithValue('error')
      }
    }
  )
