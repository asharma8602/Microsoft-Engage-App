import axios from 'axios'
import { DocumentData } from 'firebase/firestore'
import { Head } from 'next/document'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Thumbnail from '../components/Thumbnail'
import { Movie } from '../typings'

interface Props {
  movies: Movie[] | DocumentData[]
}

function search_page() {
  const showModal = useRecoilValue(modalState)
  const rowRef = useRef<HTMLDivElement>(null)
  const [result, setResult] = useState<Movie[]>([])
  const router = useRouter()
  //getting query from search bar
  const searchQuery =
    router && router.query && router.query && router.query.searchQuery
      ? router.query.searchQuery
      : ''
  //fetching search results
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US&query=${searchQuery}`
      )
      .then((res) => setResult(res.data.results))
  }, [setResult,searchQuery])

  return (
    <div className="no-scrollbar relative h-screen justify-between bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header/>
      <main className="lg:mb-25 relative pl-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16">
        <Banner movies={result.slice(0, 5)} />
        <div className="h-40 space-y-0.5 md:space-y-2">
          <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
            Search Results
          </h2>
          <section>
            <div
              className="no-scrollbar flex flex-wrap items-center gap-5"
              ref={rowRef}
            >
              {result.map((movie) => (
                <div>
                  <Thumbnail key={movie.id} movie={movie} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default search_page
