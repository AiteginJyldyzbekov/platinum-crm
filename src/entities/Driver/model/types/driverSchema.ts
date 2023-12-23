export interface Driver {
  tid: string
  email: string
  password: string
  name: string
  surname: string
  lastname: string
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
