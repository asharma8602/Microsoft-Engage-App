import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Thumbnail from '../components/Thumbnail'
import { Movie } from '../typings'

function kids() {
  const showModal = useRecoilValue(modalState)
  const rowRef = useRef<HTMLDivElement>(null)
  const [kid, setKid] = useState<Movie[]>([])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=10751&with_watch_monetization_types=flatrate`
      )
      .then((res) => setKid(res.data.results))
  }, [setKid])

  return (
    <div className="no-scrollbar relative h-screen justify-between bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header />
      <main className="lg:mb-25 relative pl-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16">
        <Banner movies={kid.slice(0, 5)} />
        <div className="h-40 space-y-0.5 md:space-y-2">
          <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
            Search Results
          </h2>
          <section>
            <div
              className="no-scrollbar flex flex-wrap items-center gap-5"
              ref={rowRef}
            >
              {kid.map((movie) => (
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

export default kids

// export const getServerSideProps = async () => {
//   const [Kids] = await Promise.all([
//     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}a80f4351a37f1534cfc62363fbbe8382&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751&with_watch_monetization_types=flatrate`
//     ).then((res) => res.json()),
//   ])

//   return {
//     props: {
//       Kids: Kids.results,
//     },
//   }
// }
