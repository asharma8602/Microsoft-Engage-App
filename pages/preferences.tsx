import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import { Genre } from '../typings'
import Image from 'next/image'
import coverPhoto from '../public/cover.png'
import { useRouter } from 'next/router'

interface Props {
  Genres: Genre[]
}

function preferences({ Genres }: Props) {
  const { user } = useAuth()
  const router = useRouter()
  const [genre, setGenre] = useState([''])
  const submitHandler = (e: any) => {
    e.preventDefault()
    router.push('/')
  }
  console.log(genre)

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={coverPhoto}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <div className="space-y-4">
        {/* Preference form with 3 select tags */}
        <form
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={submitHandler}
        >
          <h1 className="text-4xl font-semibold">Preferred Genres</h1>
          <label className="inline-block w-full">
            <select
              className="input overflow-y-auto transition ease-in-out"
              onChange={(e) => genre.push(e.target.value)}
              required
            >
              <option selected>Preferred Genre 1</option>
              {Genres.map((genre) => (
                <option value={genre.id} className="input">
                  {genre.name}
                </option>
              ))}
            </select>
          </label>

          <label className="inline-block w-full">
            <select
              className="input overflow-y-auto transition ease-in-out"
              onChange={(e) => genre.push(e.target.value)}
              required
            >
              <option selected>Preferred Genre 2</option>
              {Genres.map((genre) => (
                <option value={genre.id} className="input">
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
          <label className="inline-block w-full">
            <select
              className="input overflow-y-auto transition ease-in-out"
              onChange={(e) => genre.push(e.target.value)}
              required
            >
              <option selected>Preferred Genre 3</option>
              {Genres.map((genre) => (
                <option value={genre.id} className="input">
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
          {/* Button sends data to database and creates a document */}
          <button
            type="submit"
            className="w-full rounded bg-[#12b57f] py-3 font-semibold"
            onClick={() => {
              if (user) {
                const dbInstance = collection(
                  db,
                  'customers',
                  user.uid,
                  'myGenres'
                )
                addDoc(dbInstance, {
                  Genres: genre,
                })
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default preferences
//Server Side Rendering for Genres
export const getServerSideProps = async () => {
  const [Genres] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US`
    ).then((res) => res.json()),
  ])

  return {
    props: {
      Genres: JSON.parse(JSON.stringify(Genres.genres)),
    },
  }
}
