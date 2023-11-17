import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum AdminRoutes {
    MAIN = "main",
    CARS = "cars",
    DRIVERS = "drivers"
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
    [AdminRoutes.MAIN]: "/",
    [AdminRoutes.CARS]: "/cars",
    [AdminRoutes.DRIVERS]: "/drivers",
}

export const AdminRouteConfig: Record<AdminRoutes, RouteProps> = {
    [AdminRoutes.MAIN]: {
        path: AdminRoutePath.main,
        element: <MainPage />
    },
    [AdminRoutes.CARS]: {
        path: AdminRoutePath.cars,
        element: <AboutPage />
    },
    [AdminRoutes.DRIVERS]: {
        path: AdminRoutePath.drivers,
        element: <AboutPage />
    },
}
