import { lazy } from 'react'

export const MainPageAsync = lazy(async () => await new Promise((resolve) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // При деплое на продакшн УБРАТЬ!!!
  setTimeout(() => { resolve(import('./MainPage')) }, 1500)
}))
