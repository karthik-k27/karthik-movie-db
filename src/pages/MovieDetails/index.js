import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {fetchMovieDetails} from '../../store/movieDetailsSlice'
import Poster from '../../components/Poster'

const formatRuntime = minutes =>
  minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : 'Not available'

const MovieDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)

  useEffect(() => {
    dispatch(fetchMovieDetails(id))
    window.scrollTo(0, 0)
  }, [dispatch, id])

  // details.id check avoids flashing the previously opened movie
  if (details.id !== id || details.status === 'loading')
    return <p className="message">Loading details…</p>
  if (details.status === 'failure')
    return (
      <p className="message error">
        Couldnot load this movie. Try again later.
      </p>
    )

  const {movie, cast} = details

  return (
    <>
      <section className="details">
        <Poster
          path={movie.poster_path}
          alt={movie.title}
          className="poster details-poster"
        />
        <div className="details-info">
          <h1>{movie.title}</h1>
          <p className="rating">★ {movie.vote_average.toFixed(1)}</p>
          <dl>
            <dt>Duration</dt>
            <dd>{formatRuntime(movie.runtime)}</dd>
            <dt>Genre</dt>
            <dd>
              {movie.genres.map(genre => genre.name).join(', ') ||
                'Not available'}
            </dd>
            <dt>Release date</dt>
            <dd>{movie.release_date || 'Not available'}</dd>
          </dl>
          <h2>Overview</h2>
          <p>{movie.overview || 'No overview available.'}</p>
        </div>
      </section>

      <section>
        <h2 className="page-title">Cast</h2>
        <ul className="grid">
          {cast.map(member => (
            <li className="card" key={member.credit_id}>
              <Poster path={member.profile_path} alt={member.original_name} />
              <div className="card-body">
                <h3>{member.original_name}</h3>
                <p className="muted">as {member.character || 'Unknown'}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default MovieDetails
