import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies} from '../features/Movies/moviesSlice'

import {
  MoviesList,
  MovieCard,
  MovieName,
  MovieImage,
  ViewButton,
  LoadingView,
  FailureView,
} from './styled-components'

const PopularMovies = () => {
  const dispatch = useDispatch()
  const {items: search, filters} = useSelector(state => state.users)

  const {status} = filters

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies())
    }
  }, [status, dispatch])

  if (status === 'loading') return <LoadingView>Loading...</LoadingView>
  if (status === 'failed') return <FailureView>Error: {error}</FailureView>

  return (
    <MoviesList>
      {search.map(movie => (
        <MovieCard key={movie.id}>
          <MovieName>{movie.name}</MovieName>
          <MovieImage src={movie.imageUrl} alt={movie.name} />
          <ViewButton type="button" onClick={showMovieDetails}>
            View Details
          </ViewButton>
        </MovieCard>
      ))}
    </MoviesList>
  )
}

export default PopularMovies
