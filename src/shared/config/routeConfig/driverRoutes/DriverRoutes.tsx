import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum DriverRoutes {
    PROFILE = "profile",
}

export const DriverRoutePath: Record<DriverRoutes, string> = {
    [DriverRoutes.PROFILE]: "/profile",
}

export const DriverRouteConfig: Record<DriverRoutes, RouteProps> = {
    [DriverRoutes.PROFILE]: {
        path: DriverRoutePath.profile,
        element: <MainPage />
    },
}