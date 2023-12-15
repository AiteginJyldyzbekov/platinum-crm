export interface User {
  id: string
  email: string
  role: string
  uid: string
}

export interface UserSchema {
  authData?: User
}
