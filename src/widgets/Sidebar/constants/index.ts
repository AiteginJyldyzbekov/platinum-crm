import driverIcon from 'shared/assets/icons/Sidebar/driver__icon.svg'
import carIcon from 'shared/assets/icons/Sidebar/car__icon.svg'
import diagnosticIcon from 'shared/assets/icons/Sidebar/diagnostic__icon.svg'

import driverActiveIcon from 'shared/assets/icons/Sidebar/driver__icon_active.svg'
import carActiveIcon from 'shared/assets/icons/Sidebar/car__icon_active.svg'
import diagnosticsActiveIcon from 'shared/assets/icons/Sidebar/diagnostic__icon_active.svg'

export interface SideBarLink {
  title: string
  path: string
  icon: any
  activeIcon: any
  id: number
}

export const admin: SideBarLink[] = [
  {
    title: 'diagnostics',
    icon: diagnosticIcon,
    activeIcon: diagnosticsActiveIcon,
    path: '/',
    id: 0
  },
  {
    title: 'drivers',
    icon: driverIcon,
    activeIcon: driverActiveIcon,
    path: '/drivers',
    id: 1
  },
  {
    title: 'cars',
    icon: carIcon,
    activeIcon: carActiveIcon,
    path: '/cars',
    id: 2
  }
]

export const driver: SideBarLink[] = [
  {
    title: 'car',
    activeIcon: carActiveIcon,
    icon: carIcon,
    path: '/car',
    id: 0
  },
  {
    title: 'diagnostics',
    icon: diagnosticIcon,
    activeIcon: diagnosticsActiveIcon,
    path: '/diagnostics',
    id: 1
  }
]
