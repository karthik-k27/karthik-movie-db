/* eslint-disable no-param-reassign */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchTMDB} from './api'

export const fetchMovieDetails = createAsyncThunk(
  'details/fetchMovieDetails',
  async id => {
    const [movie, credits] = await Promise.all([
      fetchTMDB(`/movie/${id}`),
      fetchTMDB(`/movie/${id}/credits`),
    ])
    return {movie, cast: credits.cast}
  },
)

const movieDetailsSlice = createSlice({
  name: 'details',
  initialState: {id: null, status: 'loading', movie: null, cast: []},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetails.pending, (state, {meta}) => ({
        id: meta.arg,
        status: 'loading',
        movie: null,
        cast: [],
      }))
      .addCase(fetchMovieDetails.fulfilled, (state, {meta, payload}) => {
        if (state.id === meta.arg)
          Object.assign(state, payload, {status: 'success'})
      })
      .addCase(fetchMovieDetails.rejected, (state, {meta}) => {
        if (state.id === meta.arg) state.status = 'failure'
      })
  },
})

export default movieDetailsSlice.reducer
