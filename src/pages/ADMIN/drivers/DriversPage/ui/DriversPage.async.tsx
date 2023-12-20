import { lazy } from 'react'

export const DriversPageAsync = lazy(async () => await new Promise((resolve) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // При деплое на продакшн УБРАТЬ!!!
  setTimeout(() => { resolve(import('./DriversPage')) }, 1500)
}))
