const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchKidsMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10751`,
}

export const TMDB = {
  TVShows: {
    sections: [
      {
        title: 'Popular on Now-United',
        endpoint: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
      },
      {
        title: 'Trending Now',
        endpoint: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&page=_pageNumber`,
      },
      {
        title: 'War Politics',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10768&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Now-United Original',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: 'large',
      },
      {
        title: 'Sci-Fi & Fantasy',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Documentary',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Comedy',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Animation',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Drama',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Family',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Mystery',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Action-Adventure',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Crime',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Reality',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10764&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Talk',
        endpoint: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10767&with_watch_providers=8&watch_region=AU`,
      },
    ],
  },
  movies: {
    sections: [
      {
        title: 'Popular on Now-United',
        endpoint: `${BASE_URL}/movie/popular?api_key=${API_KEY}&region=AU`,
      },
      {
        title: 'Trending Now',
        endpoint: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
      },
      {
        title: 'Upcoming',
        endpoint: `/${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=AU`,
      },
      {
        title: 'Now-United Original',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: 'large',
      },
      {
        title: 'Sci-Fi',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Drama',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Fantasy',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Crime',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Mystery',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Action',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Comedy',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Animation',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Adventure',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Family',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'TV',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10770&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Documentary',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'War',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10752&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'History',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=36&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Western',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=37&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: 'Thriller',
        endpoint: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53&with_watch_providers=8&watch_region=AU`,
      },
    ],
  },
}
