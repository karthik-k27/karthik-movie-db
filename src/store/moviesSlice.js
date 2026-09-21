/* eslint-disable no-param-reassign */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchTMDB} from './api'

const EMPTY_LIST = {page: 1, status: 'loading', results: [], totalPages: 1}

// Every list (popular, top rated, upcoming, each search) is stored under its own key
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({path, query, page}) => {
    const data = await fetchTMDB(path, query ? {query, page} : {page})
    return {results: data.results, totalPages: data.total_pages}
  },
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {lists: {}},
  reducers: {
    setPage: (state, {payload: {key, page}}) => {
      state.lists[key] = {...(state.lists[key] || EMPTY_LIST), page}
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state, {meta}) => {
        const {key, page} = meta.arg
        state.lists[key] = {
          ...(state.lists[key] || EMPTY_LIST),
          page,
          status: 'loading',
        }
      })
      .addCase(fetchMovies.fulfilled, (state, {meta, payload}) => {
        const list = state.lists[meta.arg.key]
        // Ignore responses for a page the user has already moved away from
        if (list.page === meta.arg.page)
          Object.assign(list, payload, {status: 'success'})
      })
      .addCase(fetchMovies.rejected, (state, {meta}) => {
        const list = state.lists[meta.arg.key]
        if (list.page === meta.arg.page) list.status = 'failure'
      })
  },
})

export const {setPage} = moviesSlice.actions
export const selectList = key => state => state.movies.lists[key] || EMPTY_LIST
export default moviesSlice.reducer
