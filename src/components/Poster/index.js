import {IMAGE_URL} from '../../store/api'

const Poster = ({path, alt, className = 'poster'}) =>
  path ? (
    <img
      className={className}
      src={`${IMAGE_URL}${path}`}
      alt={alt}
      loading="lazy"
    />
  ) : (
    <div className={`${className} no-image`}>No image</div>
  )

export default Poster
