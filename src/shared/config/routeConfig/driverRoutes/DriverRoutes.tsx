import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum DriverRoutes {
    PROFILE = "profile",
    CAR = "car",
}

export const DriverRoutePath: Record<DriverRoutes, string> = {
    [DriverRoutes.PROFILE]: "/",
    [DriverRoutes.CAR]: "/car",
}

export const DriverRouteConfig: Record<DriverRoutes, RouteProps> = {
    [DriverRoutes.PROFILE]: {
        path: DriverRoutePath.profile,
        element: <MainPage />
    },
    [DriverRoutes.CAR]: {
        path: DriverRoutePath.car,
        element: <MainPage />
    },
}