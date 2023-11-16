import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum NotAuthRoutes {
    LOGIN = "login"
}

export const NotAuthRoutePath: Record<NotAuthRoutes, string> = {
    [NotAuthRoutes.LOGIN]: "/login",
}

export const NotAuthRouteConfig: Record<NotAuthRoutes, RouteProps> = {
    [NotAuthRoutes.LOGIN]: {
        path: NotAuthRoutePath.login,
        element: <MainPage />
    },
}