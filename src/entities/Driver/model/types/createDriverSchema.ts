export interface Driver {
  tid: string
  email: string
  password: string
  name: string
  surname: string
  lastname: string
}

export interface DriversSchema {
  isLoading: boolean
  error?: string
  drivers: Driver[]
}
