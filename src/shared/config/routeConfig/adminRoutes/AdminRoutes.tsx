import { CarDetailPage } from 'pages/ADMIN/cars/CarDetailPage'
import { CarEditPage } from 'pages/ADMIN/cars/CarEditPage'
import { CarsPage } from 'pages/ADMIN/cars/CarsPage'
import { CreateCarPage } from 'pages/ADMIN/cars/CreateCarPage'
import { CreateDriverPage } from 'pages/ADMIN/drivers/CreateDriverPage'
import { DriverDetailPage } from 'pages/ADMIN/drivers/DriverDetailPage'
import { DriverEditPage } from 'pages/ADMIN/drivers/DriverEditPage'
import { DriversPage } from 'pages/ADMIN/drivers/DriversPage'
import { MainPage } from 'pages/ADMIN/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum AdminRoutes {
  MAIN = 'main',
  CARS = 'cars',
  CAR_EDIT = 'car_edit',
  CAR_DETAIL = 'car_detail',
  CREATE_CAR = 'create_car',
  DRIVERS = 'drivers',
  DRIVER_EDIT = 'driver_edit',
  DRIVER_DETAIL = 'driver_detail',
  CREATE_DRIVER = 'create_driver',
  NOT_FOUND = 'not_found'
}

export const AdminRoutePath: Record<AdminRoutes, string> = {
  [AdminRoutes.MAIN]: '/',
  [AdminRoutes.CARS]: '/cars',
  [AdminRoutes.CAR_EDIT]: '/cars/edit/:id',
  [AdminRoutes.CAR_DETAIL]: '/cars/detail/:id',
  [AdminRoutes.CREATE_CAR]: '/create-car',
  [AdminRoutes.DRIVERS]: '/drivers',
  [AdminRoutes.DRIVER_EDIT]: '/drivers/edit/:id',
  [AdminRoutes.DRIVER_DETAIL]: '/drivers/detail/:id',
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
  [AdminRoutes.CAR_EDIT]: {
    path: AdminRoutePath.car_edit,
    element: <CarEditPage />
  },
  [AdminRoutes.CAR_DETAIL]: {
    path: AdminRoutePath.car_detail,
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
  [AdminRoutes.DRIVER_EDIT]: {
    path: AdminRoutePath.driver_edit,
    element: <DriverEditPage />
  },
  [AdminRoutes.DRIVER_DETAIL]: {
    path: AdminRoutePath.driver_detail,
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
