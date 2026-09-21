import {useLocation} from 'react-router-dom'
import MovieList from '../../components/MovieList'

const SearchedMovies = () => {
  const {search} = useLocation()
  const query = new URLSearchParams(search).get('query') || ''

  return (
    <MovieList
      key={query}
      path="/search/movie"
      query={query}
      title={`Results for "${query}"`}
    />
  )
}

export default SearchedMovies
