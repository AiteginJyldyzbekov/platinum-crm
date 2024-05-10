import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Car } from '../../types/CarSchema'
import { carsRef } from 'shared/config/firebase/firebase'
import { Timestamp, addDoc } from 'firebase/firestore'
import createPrefixes from 'shared/lib/createPrefix'

export const createCar = createAsyncThunk<Car, Car, { rejectValue: string }>(
  'create/car',
  async (data, thunkApi) => {
    try {
      const newCar = {
        brand: data.brand,
        model: data.model,
        color: data.color,
        numberPlate: data.numberPlate,
        year: data.year,
        lastOilChangeDate: data.lastOilChangeDate,
        lastGearChangeDate: data.lastGearChangeDate,
        images: data.images,
        techPassport: data.techPassport,
        expenseHistory: data.expenseHistory,
        status: 'free',
        createdAt: Timestamp.fromDate(new Date()),
        payment: data.payment,
        searchWords: [
          ...createPrefixes(data.brand),
          ...createPrefixes(data.model),
          ...createPrefixes(data.numberPlate)
        ]
      }

      await addDoc(carsRef, newCar)
    } catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('error')
    }
  }
)
