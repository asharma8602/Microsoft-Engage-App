import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { Movie } from '../typings'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import useList from '../hooks/useList'
import { requests } from '../utils/requests'
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useFavourites from '../hooks/useFavourites'
import { orderBy } from 'lodash'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  movie: Movie
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { user, loading } = useAuth()
  const [movie, setMovie] = useRecoilState(movieState)
  const showModal = useRecoilValue(modalState)
  const list = useList(user?.uid)
  const favourites = useFavourites(user?.uid)
  const [genres, setGenres] = useState([])
  const [recommends, setRecommends] = useState<DocumentData[] | Movie[]>([])
  const [similarMovies, setSimilarMovies] = useState<DocumentData[] | Movie[]>(
    []
  )
  if (loading) return null

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myGenres'),
        (snapshot) => {
          const tempGenre = snapshot.docs[0]._document.data.value.mapValue.fields.Genres.arrayValue.values
          setGenres([tempGenre[1].stringValue, tempGenre[2].stringValue, tempGenre[3].stringValue])
        }
      )
    }
  }, [db])

  useEffect(() => {
    if (favourites.length <= 3) {
      {
        genres.map((genre) => {
          axios
            .get(
              `https://api.themoviedb.org/3/discover/movie?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`
            )
            .then((res) => (res.data.results.map((movie: Movie) => recommends.push(movie))))
        })
        console.log(recommends)
      }
    } else {
        {
          favourites.map((recommend) =>
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${recommend.id}/recommendations?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US&page=1`
              )
              .then((res) => (res.data.results.map((movie: Movie) => recommends.push(movie))))
          )
        }
        {
          favourites.map((recommend) =>
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${recommend.id}/similar?api_key=a80f4351a37f1534cfc62363fbbe8382&language=en-US&page=1`
              )
              .then((res) => (res.data.results.map((movie: Movie) => similarMovies.push(movie))))
          )
        }
      }
}, [favourites, recommends, similarMovies])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Engage App</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner movies={netflixOriginals} />
        <section className="space-y-24">
          <Row title="Recommendations for You" movies={recommends} />
          {similarMovies.length>0?
            <Row
            title="Movies Similar to Your Favourites"
            movies={similarMovies}/>:
          <></>
          }
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
