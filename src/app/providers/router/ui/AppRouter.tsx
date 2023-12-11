import {
  AdminRouteConfig
} from 'shared/config/routeConfig/adminRoutes/AdminRoutes'
import Page from './Page'
import { UserRole } from '../types'
import {
  NotAuthRouteConfig
} from 'shared/config/routeConfig/notAuthRoutes/NotAuthRoutes'
import {
  DriverRouteConfig
} from 'shared/config/routeConfig/driverRoutes/DriverRoutes'

const AppRouter = () => {
  const role: string = '' // admin | driver
  const isAuth = true

  if (!isAuth) return <Page routes={NotAuthRouteConfig} />
  if (role) {
    if (role === UserRole.admin) return <Page routes={AdminRouteConfig} />
    if (role === UserRole.driver) return <Page routes={DriverRouteConfig} />
  }

  return <Page routes={NotAuthRouteConfig} />
}

export default AppRouter
