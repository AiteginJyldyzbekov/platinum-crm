import { lazy } from 'react'

export const CarsPageAsync = lazy(async () => await import('./CarsPage'))
