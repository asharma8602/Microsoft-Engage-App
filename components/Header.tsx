import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()
  const [searchInput, setSearchInput] = useState('')
  const [isActive, setIsActive] = useState(false)
  const searchRef = useRef()
  const router = useRouter()

  useEffect(() => {
    const onOutsideClick = (e: any) =>
      // @ts-ignore
      (searchRef.current && searchRef.current.contains(e.target)) ||
      setIsActive(false)

    document.addEventListener('click', onOutsideClick)

    return () => document.removeEventListener('click', onOutsideClick)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://www.freepnglogos.com/uploads/now-united-png/emblem-of-the-now-united-logo-4.png"
          className="h-10 w-10 cursor-pointer object-contain"
          onClick={() => router.push('/')}
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 md:space-x-10">
        <div className={`relative` || `mr-3` || `${isActive ? 'active' : ''}`}>
          <div
            className="absolute top-3 left-3 items-center"
            onClick={() => setIsActive(!isActive)}
          >
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                router.push({
                  pathname: '/search_page',
                  query: {
                    searchQuery: searchInput,
                  },
                })
              }}
              onKeyPress={() => {
                router.push({
                  pathname: '/search_page',
                  query: {
                    searchQuery: searchInput,
                  },
                })
              }}
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="w-70 block rounded-lg border bg-transparent p-2 pl-10 text-white"
            placeholder="Search Here..."
            value={searchInput}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                router.push({
                  pathname: '/search_page',
                  query: {
                    searchQuery: searchInput,
                  },
                })
              }
            }}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
          />
        </div>
        <p
          className="headerLink hidden lg:inline"
          onClick={() => router.push('/kids')}
        >
          Kids
        </p>
        <p className="headerLink hidden lg:inline" onClick={logout}>
          Logout
        </p>
      </div>
    </header>
  )
}

export default Header
