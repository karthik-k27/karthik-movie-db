import {useHistory} from 'react-router-dom'
import Poster from '../Poster'

const MovieCard = ({movie}) => {
  const history = useHistory()

  return (
    <li className="card">
      <Poster path={movie.poster_path} alt={movie.title} />
      <div className="card-body">
        <h3>{movie.title}</h3>
        <p className="rating">
          <span aria-hidden="true">★</span> <span>{movie.vote_average}</span>
        </p>
        <button
          type="button"
          onClick={() => history.push(`/movie/${movie.id}`)}
        >
          View Details
        </button>
      </div>
    </li>
  )
}

export default MovieCard
