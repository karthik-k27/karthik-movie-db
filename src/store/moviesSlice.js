/* eslint-disable no-param-reassign */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {fetchTMDB} from './api'

const EMPTY_LIST = {
  page: 1,
  status: 'loading',
  results: [],
  totalPages: 1,
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({path, query, page}) => {
    const data = await fetchTMDB(path, query ? {query, page} : {page})

    return {
      results: data.results || [],
      totalPages: Number(data.total_pages) || 1,
    }
  },
)

const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    lists: {},
  },

  reducers: {
    setPage: (state, {payload: {key, page}}) => {
      state.lists[key] = {
        ...(state.lists[key] || EMPTY_LIST),
        page,
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state, {meta}) => {
        const {key, page} = meta.arg

        const existing = state.lists[key] || EMPTY_LIST

        state.lists[key] = {
          ...existing,
          page,
          status: existing.status === 'success' ? 'success' : 'loading',
        }
      })

      .addCase(fetchMovies.fulfilled, (state, {meta, payload}) => {
        const list = state.lists[meta.arg.key]

        if (list && list.page === meta.arg.page) {
          list.results = payload.results
          list.totalPages = payload.totalPages
          list.status = 'success'
        }
      })

      .addCase(fetchMovies.rejected, (state, {meta}) => {
        const list = state.lists[meta.arg.key]

        if (list && list.page === meta.arg.page) {
          list.status = 'failure'
        }
      })
  },
})

export const {setPage} = moviesSlice.actions

export const selectList = key => state => state.movies.lists[key] || EMPTY_LIST

export default moviesSlice.reducer
