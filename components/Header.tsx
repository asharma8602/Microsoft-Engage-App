import Link from "next/link";
import { useEffect, useState } from 'react';
import { BiSearch,BiBell } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

function Header() {

  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth

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
                    className="cursor-pointer object-contain h-10 w-10"
                />
                
                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">TV Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 md:space-x-10 headerLink">
                <BiSearch className="hidden h-6 w-6 sm:inline" />
                <p className="hidden lg:inline">Kids</p>
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                        onClick={logout}
                    />
                </Link>
                <BiBell className="h-6 w-6"/>
            </div>
        </header>
  )
}

export default Header