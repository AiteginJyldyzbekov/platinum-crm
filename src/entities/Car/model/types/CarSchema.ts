export interface Car {
  tid: string
  car: string
  model: string
  color: string
  numberPlate: string
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
