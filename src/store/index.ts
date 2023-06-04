import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer,  } from 'react-redux-i18n'
import review, { setTotalReviews } from './slices/review'

import data from '../../data.json'

const store = configureStore({
  reducer: {
    review,
    i18n: i18nReducer
  },
})

console.log(Object.keys(data.en).length)

syncTranslationWithStore(store)
store.dispatch(loadTranslations(data))
store.dispatch(setTotalReviews(Object.keys(data.en).length))
store.dispatch(setLocale("ru"))

console.log(store.getState())

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>