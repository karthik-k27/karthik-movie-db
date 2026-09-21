// Generate your key at https://www.themoviedb.org/documentation/api
const API_KEY = 'fd7c28184a6fc89487eb1547df823089'
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const fetchTMDB = async (path, params = {}) => {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    ...params,
  })
  const response = await fetch(`${BASE_URL}${path}?${query}`)
  if (response.ok === false) throw new Error('Request failed')
  return response.json()
}
