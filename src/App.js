import {useMemo} from 'react'
import {Provider} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import createStore from './store/index'

import Navbar from './components/Navbar'
import MovieList from './components/MovieList'
import MovieDetails from './pages/MovieDetails'
import SearchedMovies from './pages/SearchedMovies'

const App = () => {
  const store = useMemo(() => createStore(), [])

  return (
    <Provider store={store}>
      <Navbar />
      <main className="page">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MovieList
                key="popular"
                path="/movie/popular"
                title="What everyone's watching"
              />
            )}
          />
          <Route
            exact
            path="/top-rated"
            render={() => (
              <MovieList
                key="top"
                path="/movie/top_rated"
                title="Critics' favourites"
              />
            )}
          />
          <Route
            exact
            path="/upcoming"
            render={() => (
              <MovieList
                key="upcoming"
                path="/movie/upcoming"
                title="Coming soon"
              />
            )}
          />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/search" component={SearchedMovies} />
          <Route render={() => <p className="message">Page not found.</p>} />
        </Switch>
      </main>
    </Provider>
  )
}

export default App
