import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum NotAuthRoutes {
  LOGIN = 'login',
  NOT_FOUND = 'not_found'
}

export const NotAuthRoutePath: Record<NotAuthRoutes, string> = {
  [NotAuthRoutes.LOGIN]: '/login',
  [NotAuthRoutes.NOT_FOUND]: '*'
}

export const NotAuthRouteConfig: Record<NotAuthRoutes, RouteProps> = {
  [NotAuthRoutes.LOGIN]: {
    path: NotAuthRoutePath.login,
    element: <MainPage />
  },
  [NotAuthRoutes.NOT_FOUND]: {
    path: NotAuthRoutePath.not_found,
    element: <NotFoundPage />
  }
}
