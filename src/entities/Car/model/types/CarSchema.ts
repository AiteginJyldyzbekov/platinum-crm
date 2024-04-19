import { type Driver } from 'entities/Driver/model/types/driverSchema'

export interface ImageData {
  file?: File | null
  url: string | null
  isLoading: boolean
  name: string
}

export interface CarExpenseHistory {
  date: string
  expenseType: string
  amount: string
  description?: string
}

export interface Car {
  tid?: string
  brand: string
  model: string
  color: string
  numberPlate: string
  year: string
  status?: string
  images: ImageData[]
  techPassport: ImageData
  driver?: string
  expenseHistory: CarExpenseHistory[]
  lastOilChangeDate: any
  lastGearChangeDate: any
}

export interface CarsSchema {
  cars: {
    isLoading: boolean
    error?: string
    result: Car[]
  }
  carDetail: {
    isLoading: boolean
    error?: string
    result: Car | null
  }
  createCar: {
    isLoading: boolean
    error?: string
  }
}
