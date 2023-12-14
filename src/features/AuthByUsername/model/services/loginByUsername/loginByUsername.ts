import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type User } from 'entities/User'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername =
    createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
      'login/loginByUsername',
      async (authData, thunkApi) => {
        try {
          const response = await axios.post('/api/login', {
            username: authData.username,
            password: authData.password
          })

          if (!response.data) {
            throw new Error()
          }
        } catch (e) {
          console.log(e)
          return thunkApi.rejectWithValue('error')
        }
      }
    )
