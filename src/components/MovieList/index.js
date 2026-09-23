import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {fetchMovies, selectList, setPage} from '../../store/moviesSlice'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const MovieList = ({path, title, query}) => {
  const dispatch = useDispatch()

  const key = `${path}|${query || ''}`

  const {page, status, results, totalPages} = useSelector(selectList(key))

  useEffect(() => {
    dispatch(
      fetchMovies({
        key,
        path,
        query,
        page,
      }),
    )
  }, [dispatch, key, path, query, page])

  const handlePageChange = newPage => {
    dispatch(
      setPage({
        key,
        page: newPage,
      }),
    )

    window.scrollTo(0, 0)
  }

  return (
    <section>
      <h1 className="page-title">{title}</h1>

      {status === 'loading' && <p className="message">Loading movies…</p>}

      {status === 'failure' && (
        <p className="message error">
          Could not load movies. Check your API key and try again.
        </p>
      )}

      {status === 'success' && results.length === 0 && (
        <p className="message">No movies found. Try a different search.</p>
      )}

      {status === 'success' && results.length > 0 && (
        <ul className="grid">
          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}

      {/* Always render pagination */}
      <Pagination
        page={page}
        totalPages={totalPages || 1}
        onChange={handlePageChange}
      />
    </section>
  )
}

export default MovieList
