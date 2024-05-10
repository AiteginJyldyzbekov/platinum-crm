import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Driver } from '../../types/driverSchema'
import { usersRef } from 'shared/config/firebase/firebase'
import {
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limitToLast,
  type DocumentSnapshot,
  endBefore,
  limit
} from 'firebase/firestore'

import { paginationActions } from 'entities/Pagination/model/slice/PaginationSlice'

interface getDriversProps {
  startAfterDoc?: DocumentSnapshot
  endBeforeDoc?: DocumentSnapshot
  limitNumber: number
  direction?: 'next' | 'prev' | undefined
  orderByProp: string
  searchValue?: string
  filter?: string
}

export const getDrivers = createAsyncThunk<Driver[], getDriversProps, { rejectValue: string }>(
  'get/drivers',
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
        usersRef,
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
      const drivers: Driver[] = snapshot.docs.map(doc => ({ tid: doc.id, ...doc.data() as Driver }))

      // Подсчет количества страниц
      const countQuery = searchValue
        ? query(
          usersRef,
          where(
            'searchWords',
            'array-contains-any',
            [searchValue.toLowerCase(),
              searchValue.toLowerCase() + '\uf8ff']
          )
        )
        : filter
          ? query(usersRef, where('status', '==', filter))
          : usersRef
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
