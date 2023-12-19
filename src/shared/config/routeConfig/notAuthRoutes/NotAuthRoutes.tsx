import { LoginPage } from 'pages/LoginPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

export enum NotAuthRoutes {
  LOGIN = 'login',
  NOT_FOUND = 'not_found'
}

export const NotAuthRoutePath: Record<NotAuthRoutes, string> = {
  [NotAuthRoutes.LOGIN]: '/',
  [NotAuthRoutes.NOT_FOUND]: '*'
}

export const NotAuthRouteConfig: Record<NotAuthRoutes, RouteProps> = {
  [NotAuthRoutes.LOGIN]: {
    path: NotAuthRoutePath.login,
    element: <LoginPage />
  },
  [NotAuthRoutes.NOT_FOUND]: {
    path: NotAuthRoutePath.not_found,
    element: <NotFoundPage />
  }
}
