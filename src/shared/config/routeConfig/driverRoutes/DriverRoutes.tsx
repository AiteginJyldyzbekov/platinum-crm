import { MainPage } from 'pages/MainPage'
import { type RouteProps } from 'react-router-dom'

export enum DriverRoutes {
  PROFILE = 'profile',
  CAR = 'car',
}

export const DriverRoutePath: Record<DriverRoutes, string> = {
  [DriverRoutes.PROFILE]: '/',
  [DriverRoutes.CAR]: '/car'
}

export const DriverRouteConfig: Record<DriverRoutes, RouteProps> = {
  [DriverRoutes.PROFILE]: {
    path: DriverRoutePath.profile,
    element: <MainPage />
  },
  [DriverRoutes.CAR]: {
    path: DriverRoutePath.car,
    element: <MainPage />
  }
}
