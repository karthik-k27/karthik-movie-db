const API_KEY = 'YOUR_TMDB_API_KEY'

const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const fetchTMDB = async (path, params = {}) => {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params,
  })

  const response = await fetch(`${BASE_URL}${path}?${query.toString()}`)

  if (response.ok === false) {
    throw new Error('Request failed')
  }

  return response.json()
}
