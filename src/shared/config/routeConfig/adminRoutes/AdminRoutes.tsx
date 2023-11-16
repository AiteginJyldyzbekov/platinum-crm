import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum AdminRoutes {
    MAIN = "main",
    ABOUT = "about",
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
    [AdminRoutes.MAIN]: "/",
    [AdminRoutes.ABOUT]: "/about"
}

export const AdminRouteConfig: Record<AdminRoutes, RouteProps> = {
    [AdminRoutes.MAIN]: {
        path: AdminRoutePath.main,
        element: <MainPage />
    },
    [AdminRoutes.ABOUT]: {
        path: AdminRoutePath.about,
        element: <AboutPage />
    }
}
