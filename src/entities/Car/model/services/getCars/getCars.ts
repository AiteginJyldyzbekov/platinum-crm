import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Car } from '../../types/CarSchema'
import { carsRef } from 'shared/config/firebase/firebase'
import {
  getDocs,
  type DocumentSnapshot,
  query,
  orderBy,
  limit,
  where,
  startAfter,
  endBefore,
  limitToLast
} from 'firebase/firestore'
import { paginationActions } from 'entities/Pagination/model/slice/PaginationSlice'

interface getCarsProps {
  startAfterDoc?: DocumentSnapshot
  endBeforeDoc?: DocumentSnapshot
  limitNumber: number
  direction?: 'next' | 'prev' | undefined
  orderByProp: string
  searchValue?: string
  filter?: string
}

export const getCars = createAsyncThunk<Car[], getCarsProps, { rejectValue: string }>(
  'get/cars',
  async ({
    startAfterDoc,
    limitNumber,
    direction,
    endBeforeDoc,
    orderByProp,
    searchValue,
    filter
  }, thunkApi) => {
    try {
      let dataQuery = query(
        carsRef,
        orderBy(orderByProp),
        limit(limitNumber)
      )

      if (filter) {
        dataQuery = query(
          dataQuery,
          where('status', '==', filter)
        )
      }

      if (searchValue) {
        dataQuery = query(
          dataQuery,
          where(
            'searchWords',
            'array-contains-any',
            [searchValue.toLowerCase(),
              searchValue.toLowerCase() + '\uf8ff']
          )
        )
      }

      if (direction === 'next' && startAfterDoc) {
        dataQuery = query(dataQuery, startAfter(startAfterDoc))
      } else if (direction === 'prev' && endBeforeDoc) {
        dataQuery = query(
          dataQuery,
          endBefore(endBeforeDoc),
          limitToLast(limitNumber)
        )
      }

      const snapshot = await getDocs(dataQuery)
      const drivers: Car[] = snapshot.docs.map(doc => ({ tid: doc.id, ...doc.data() as Car }))

      // Подсчет количества страниц
      const countQuery = searchValue
        ? query(
          carsRef,
          where(
            'searchWords',
            'array-contains-any',
            [searchValue.toLowerCase(), searchValue.toLowerCase() + '\uf8ff']
          )
        )
        : filter
          ? query(carsRef, where('status', '==', filter))
          : carsRef
      const countSnapshot = await getDocs(countQuery)
      const numPages = Math.ceil(countSnapshot.size / limitNumber)
      thunkApi.dispatch(paginationActions.setTotalPages(numPages))

      if (snapshot.docs.length > 0) {
        thunkApi.dispatch(paginationActions.setLastDoc(snapshot.docs[snapshot.docs.length - 1]))
        thunkApi.dispatch(paginationActions.setFirstDoc(snapshot.docs[0]))
      }

      return drivers
    } catch (e) {
      console.error(e)
      return thunkApi.rejectWithValue('Network error')
    }
  }
)
