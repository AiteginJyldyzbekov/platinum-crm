import { createSlice } from '@reduxjs/toolkit'
import { type PaginationSchema } from '../types/PaginationSchema'

const initialState: PaginationSchema = {
  offset: 0,
  limit: 5,
  page: 1,
  totalPages: null,
  lastDoc: null,
  firstDoc: null
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.offset = (state.page * state.limit)
      state.page += 1
    },
    prevPage: (state) => {
      state.page -= 1
      if (state.page < 1) {
        state.page = 1
      }
      state.offset = ((state.page - 1) * state.limit)
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLastDoc: (state, action) => {
      state.lastDoc = action.payload
    },
    setFirstDoc: (state, action) => {
      state.firstDoc = action.payload
    }
  }
})

export const { actions: paginationActions } = paginationSlice
export const { reducer: paginationReducer } = paginationSlice
