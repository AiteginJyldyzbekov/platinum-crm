import { lazy } from 'react'

export const CarsPageAsync = lazy(async () => await new Promise((resolve) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // При деплое на продакшн УБРАТЬ!!!
  setTimeout(() => { resolve(import('./CarsPage')) }, 1500)
}))
