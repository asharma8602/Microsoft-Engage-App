import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { BiCheck, BiVolumeFull, BiVolumeMute, BiX } from 'react-icons/bi'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Genre, Movie } from '../typings'
import { FiPlay, FiPlus } from 'react-icons/fi'
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'
import { db } from '../firebase'

function Modal() {
  // states for different variables
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [addedToList, setAddedToList] = useState(false)
  const [addedToFavourites, setAddedToFavourites] = useState(false)
  const [muted, setMuted] = useState(true)
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])
  const [favourites, setFavourites] = useState<DocumentData[] | Movie[]>([])
  const { user } = useAuth()
  //styling used for toast notification
  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

  //fetches the movie details from the API
  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err))
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])
  //function to close the modal
  const handleClose = () => {
    setShowModal(false)
    setMovie(null)
    toast.dismiss()
  }
  //function to add the movie to the list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])
  //function to add the movie to the favourites
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myFavourites'),
        (snapshot) => setFavourites(snapshot.docs)
      )
    }
  }, [db, movie?.id])
  //function to add the movie to the list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  )
  //function to add the movie to the favourites
  useEffect(
    () =>
      setAddedToFavourites(
        favourites.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [favourites]
  )
  //function to manage changes in list
  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        {
          ...movie,
        }
      )

      toast(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    }
  }
  //function to manage changes in favourites
  const handleFavourites = async () => {
    if (addedToFavourites) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myFavourites', movie?.id.toString()!)
      )

      toast(
        `${
          movie?.title || movie?.original_name
        } has been removed from My Favourites`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myFavourites', movie?.id.toString()!),
        {
          ...movie,
        }
      )

      toast(
        `${
          movie?.title || movie?.original_name
        } has been added to My Favourites.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    }
  }
  console.log(addedToList)
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="no-scrollbar fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md"
    >
      <>
        <Toaster position="bottom-center" />
        {/* Close Button */}
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <BiX className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          {/* Video Player */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FiPlay className="h-6 w-6 text-black" />
                Play
              </button>
              {/* Add to List Button */}
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <BiCheck className="h-7 w-7" />
                ) : (
                  <FiPlus className="h-7 w-7" />
                )}
              </button>
              {/* Add to Favourites Button */}
              <button className="modalButton" onClick={handleFavourites}>
                {addedToFavourites ? (
                  <BsFillHandThumbsUpFill className="h-7 w-7" />
                ) : (
                  <BsHandThumbsUp className="h-7 w-7" />
                )}
              </button>
            </div>
            {/* Mute Unmute Button */}
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <BiVolumeMute className="h-6 w-6" />
              ) : (
                <BiVolumeFull className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
