import { Movie } from '../typings'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { baseUrl } from '../constants/movie'
import { FiPlay } from 'react-icons/fi'
import { BiInfoCircle} from 'react-icons/bi'
import { modalState, movieState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'

//Props for passing into the component
interface Props {
  movies: Movie[]
}

function Banner({ movies }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  //obataining random movies
  useEffect(() => {
    setMovie(
      movies[Math.floor(Math.random() * movies.length)]
    )
  }, [movies])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:flex-row md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md truncate text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      {/* Play Button */}
      <div className="flex space-x-2">
        <button className="bannerButton bg-white text-black">
          <FiPlay />
          Play
        </button>
        {/* More Info Button to triger Modal */}
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
          <BiInfoCircle className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
