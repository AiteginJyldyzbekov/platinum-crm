import { CarsPage } from 'pages/ADMIN/cars/CarsPage'
import CreateDriverPage from 'pages/ADMIN/drivers/CreateDriverPage/ui/CreateDriverPage'
import { DriversPage } from 'pages/ADMIN/drivers/DriversPage'
import { MainPage } from 'pages/ADMIN/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum AdminRoutes {
  MAIN = 'main',
  CARS = 'cars',
  DRIVERS = 'drivers',
  CREATE_DRIVER = 'create_driver',
  NOT_FOUND = 'not_found'
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
  [AdminRoutes.MAIN]: '/',
  [AdminRoutes.CARS]: '/cars',
  [AdminRoutes.DRIVERS]: '/drivers',
  [AdminRoutes.CREATE_DRIVER]: '/create-driver',
  [AdminRoutes.NOT_FOUND]: '*'
}

export const AdminRouteConfig: Record<AdminRoutes, RouteProps> = {
  [AdminRoutes.MAIN]: {
    path: AdminRoutePath.main,
    element: <MainPage />
  },
  [AdminRoutes.CARS]: {
    path: AdminRoutePath.cars,
    element: <CarsPage />
  },
  [AdminRoutes.DRIVERS]: {
    path: AdminRoutePath.drivers,
    element: <DriversPage />
  },
  [AdminRoutes.CREATE_DRIVER]: {
    path: AdminRoutePath.create_driver,
    element: <CreateDriverPage />
  },
  [AdminRoutes.NOT_FOUND]: {
    path: AdminRoutePath.not_found,
    element: <NotFoundPage />
  }
}
