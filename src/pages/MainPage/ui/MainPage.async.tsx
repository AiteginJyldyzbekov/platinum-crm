import { lazy } from "react"

export const MainPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // При деплое на продакшн УБРАТЬ!!!
    setTimeout(() => resolve(import("./MainPage")), 1500)
}))