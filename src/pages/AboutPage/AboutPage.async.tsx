import { lazy } from "react"

export const AboutPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // При деплое на продакшн УБРАТЬ!!!
    setTimeout(() => resolve(import("./AboutPage")), 1500)
}))