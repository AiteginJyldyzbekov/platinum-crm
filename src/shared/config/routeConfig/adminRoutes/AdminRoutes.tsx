import { CarDetailPage } from 'pages/ADMIN/cars/CarDetailPage'
import { CarsPage } from 'pages/ADMIN/cars/CarsPage'
import { CreateCarPage } from 'pages/ADMIN/cars/CreateCarPage'
import { CreateDriverPage } from 'pages/ADMIN/drivers/CreateDriverPage'
import { DriverDetailPage } from 'pages/ADMIN/drivers/DriverDetailPage'
import { DriversPage } from 'pages/ADMIN/drivers/DriversPage'
import { MainPage } from 'pages/ADMIN/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum AdminRoutes {
  MAIN = 'main',
  CARS = 'cars',
  CAR = 'car',
  CREATE_CAR = 'create_car',
  DRIVERS = 'drivers',
  DRIVER = 'driver',
  CREATE_DRIVER = 'create_driver',
  NOT_FOUND = 'not_found'
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
  [AdminRoutes.MAIN]: '/',
  [AdminRoutes.CARS]: '/cars',
  [AdminRoutes.CAR]: '/cars/:id',
  [AdminRoutes.CREATE_CAR]: '/create-car',
  [AdminRoutes.DRIVERS]: '/drivers',
  [AdminRoutes.DRIVER]: '/drivers/:id',
  [AdminRoutes.CREATE_DRIVER]: '/create-driver',
  [AdminRoutes.NOT_FOUND]: '*'
}

export const AdminRouteConfig: Record<AdminRoutes, RouteProps> = {
  [AdminRoutes.MAIN]: {
    path: AdminRoutePath.main,
    element: <MainPage />
  },

  // Car
  [AdminRoutes.CARS]: {
    path: AdminRoutePath.cars,
    element: <CarsPage />
  },
  [AdminRoutes.CAR]: {
    path: AdminRoutePath.car,
    element: <CarDetailPage />
  },
  [AdminRoutes.CREATE_CAR]: {
    path: AdminRoutePath.create_car,
    element: <CreateCarPage />
  },

  // Driver
  [AdminRoutes.DRIVERS]: {
    path: AdminRoutePath.drivers,
    element: <DriversPage />
  },
  [AdminRoutes.DRIVER]: {
    path: AdminRoutePath.driver,
    element: <DriverDetailPage />
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
