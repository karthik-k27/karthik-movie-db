import {useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'

const LINKS = [
  {to: '/', label: 'Popular'},
  {to: '/top-rated', label: 'Top Rated'},
  {to: '/upcoming', label: 'Upcoming'},
]

const Navbar = () => {
  const [text, setText] = useState('')
  const history = useHistory()

  const handleSearch = event => {
    event.preventDefault()
    const query = text.trim()
    if (query) history.push(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <nav className="navbar">
      <NavLink to="/" exact className="logo" activeClassName="">
        <h1>movieDB</h1>
      </NavLink>
      <ul className="nav-links">
        {LINKS.map(({to, label}) => (
          <li key={to}>
            <NavLink to={to} exact>
              <h2>{label}</h2>
            </NavLink>
          </li>
        ))}
      </ul>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies"
          aria-label="Search movies"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar
