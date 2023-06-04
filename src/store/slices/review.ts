import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  pageNumber: number
  totalReviews: number
}

const initialState: CounterState = {
  pageNumber: 1,
  totalReviews: 1
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setTotalReviews: (state, action) => {
      state.totalReviews = action.payload
    },

    increasePage: (state) => {
      state.pageNumber = state.pageNumber + 1
    },

    decreasePage: (state) => {
      state.pageNumber = state.pageNumber - 1
    }
  },
})

export const { setTotalReviews, increasePage, decreasePage } = reviewSlice.actions

export default reviewSlice.reducer