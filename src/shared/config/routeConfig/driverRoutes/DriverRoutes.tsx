import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum DriverRoutes {
  PROFILE = 'profile',
  CAR = 'car',
  NOT_FOUND = 'not_found'
}

export const DriverRoutePath: Record<DriverRoutes, string> = {
  [DriverRoutes.PROFILE]: '/',
  [DriverRoutes.CAR]: '/car',
  [DriverRoutes.NOT_FOUND]: '*'
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
  [DriverRoutes.NOT_FOUND]: {
    path: DriverRoutePath.not_found,
    element: <NotFoundPage />
  }
}
