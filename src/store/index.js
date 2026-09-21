import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'
import movieDetailsReducer from './movieDetailsSlice'

export default configureStore({
  reducer: {
    movies: moviesReducer,
    details: movieDetailsReducer,
  },
})
