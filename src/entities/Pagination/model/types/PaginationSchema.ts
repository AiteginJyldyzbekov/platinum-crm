import { type DocumentSnapshot } from 'firebase/firestore'

export interface PaginationSchema {
  offset: number
  limit: number
  page: number
  totalPages: number
  lastDoc: DocumentSnapshot
  firstDoc: DocumentSnapshot
}
