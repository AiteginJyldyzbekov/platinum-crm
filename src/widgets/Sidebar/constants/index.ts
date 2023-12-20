export interface SideBarLink {
  title: string
  path: string
  id: number
}

export const admin: SideBarLink[] = [
  {
    title: 'drivers',
    path: '/drivers',
    id: 0
  },
  {
    title: 'cars',
    path: '/cars',
    id: 1
  },
  {
    title: 'profile',
    path: '/profile',
    id: 2
  }
]

export const driver: SideBarLink[] = [
  {
    title: 'car',
    path: '/car',
    id: 0
  },
  {
    title: 'profile',
    path: '/',
    id: 1
  }
]
