import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum AdminRoutes {
  MAIN = 'main',
  CARS = 'cars',
  DRIVERS = 'drivers',
  NOT_FOUND = 'not_found'
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
  [AdminRoutes.MAIN]: '/',
  [AdminRoutes.CARS]: '/cars',
  [AdminRoutes.DRIVERS]: '/drivers',
  [AdminRoutes.NOT_FOUND]: '*'
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
  [AdminRoutes.NOT_FOUND]: {
    path: AdminRoutePath.not_found,
    element: <NotFoundPage />
  }
}
