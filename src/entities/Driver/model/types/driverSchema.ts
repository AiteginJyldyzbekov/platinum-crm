import { type Car } from 'entities/Car/model/types/CarSchema'

export interface DriverTransactionHistory {
  amount: string
  date: string
  amountType: string
}

export interface DriverImages {
  file?: File | null
  url: string | null
  isLoading: boolean
  name: string
}

export interface Driver {
  email: string
  password: string
  tid?: string
  name: string
  lastName: string
  phoneNumber: string
  images?: DriverImages[]
  balance: number
  transactionHistory: DriverTransactionHistory[]
  startRentDate: string | any
  weekendDates: string[] | any
  car?: string
  status: string
}

export interface DriversSchema {
  drivers: {
    isLoading: boolean
    error?: string
    result: Driver[]
  }
  driverDetail: {
    isLoading: boolean
    error?: string
    result: Driver | null
  }
  createDriver: {
    isLoading: boolean
    error?: string
  }
}
