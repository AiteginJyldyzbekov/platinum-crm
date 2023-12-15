import { usersRef } from 'shared/config/firebase/firebase'
import { getDocs, query, where } from 'firebase/firestore'
import { type User } from 'entities/User'

export async function getUserByUID (uid: string): Promise<User | null> {
  const withQuery = query(usersRef, where('uid', '==', uid))
  const response = await getDocs(withQuery)
  let user = null

  response.docs.forEach((doc) => {
    user = doc.data()
  })

  return user
}
