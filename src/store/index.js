import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'

const createStore = () =>
  configureStore({
    reducer: {
      movies: moviesReducer,
    },
  })

export default createStore
