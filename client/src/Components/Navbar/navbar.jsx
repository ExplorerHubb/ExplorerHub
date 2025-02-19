import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link as Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: 'about', isScroll: true },
  { name: 'Cities', path: 'explore-cities' , isScroll: true },
  { name: 'Categories', path: 'categories' , isScroll: true },
];

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='py-2 bg-cover bg-center bg-no-repeat'>
      <div className='container flex justify-between items-center'>
        {/* Logo */}
        <div>
          <img src={logo} alt='logo' className='h-16 w-full sm:h-16 sm:w-full' />
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center'>
            {!menuOpen && (
                <button onClick={() => setMenuOpen(true)} className='text-white text-2xl'>
                <AiOutlineMenu />
                </button>
            )}
        </div>

        {/* Nav Links (Desktop) */}
        <div className='hidden lg:flex items-center space-x-4 text-white'>
          <ul className='flex items-center gap-3 lg:gap-5 text-[0.8rem] lg:text-[1rem]'>
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.isScroll ? (
                  <ScrollLink to={link.path} smooth={true} duration={500} className='px-4 hover:text-primary
                   duration-200 cursor-pointer'>
                    {link.name}
                  </ScrollLink>
                ) : (
                  <Link to={link.path} className='px-4 hover:text-primary duration-200'>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className='hidden lg:flex items-center space-x-4'>
          <div className='relative group hidden sm:block'>
            <input type="text" placeholder='Search' className='w-[100px] text-sm sm:w-[100px] 
            group-hover:w-[200px] transition-all duration-300 rounded-xl border border-grey-300 
            px-2 py-1 focus:outline-none focus:border-2 focus:border-primary ' />
            <IoIosSearch className='text-gray-500 group-hover:text-secondary absolute top-1/2 
            -translate-y-1/2 right-3' />
          </div>
          <Link to=''><MdFavoriteBorder className='w-[20px] h-[20px] text-white transition transform
           hover:scale-110 ease-out duration-300 ' /></Link>
          {isAuthenticated ? (
            <>
              <Link to='/profile'><CgProfile className='w-[20px] h-[20px] text-white transition 
              transform hover:scale-110 ease-out duration-300' /></Link>
              <button onClick={onLogout} className='px-3 py-1 bg-primary text-white rounded-xl'>
                Logout</button>
            </>
          ) : (
            <Link to='/login'><CgProfile className='w-[20px] h-[20px] text-white transition
             transform hover:scale-110 ease-out duration-300' /></Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (Slide-In from Right) */}
      <div className={`fixed top-0 right-0 h-full bg-black/80 text-white z-50 transform 
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out 
        w-1/2 sm:w-1/3 lg:hidden max-w-sm p-6 flex flex-col justify-between`}>
        <button onClick={() => setMenuOpen(false)} className='absolute top-4 left-4 text-2xl'>
          <AiOutlineClose />
        </button>
        <div className='flex flex-col items-center space-y-3 text-lg mt-10'>
          {navLinks.map((link, index) => (
            <React.Fragment key={index}>
              {link.isScroll ? (
                <ScrollLink to={link.path} smooth={true} duration={500} className='hover:text-primary 
                duration-200 cursor-pointer' onClick={() => setMenuOpen(false)}>
                  {link.name}
                </ScrollLink>
              ) : (
                <Link to={link.path} className='hover:text-primary duration-200' onClick={() => 
                setMenuOpen(false)}>
                  {link.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className='w-full flex flex-col items-center pb-10'>
            <Link to='' className='flex items-center space-x-2 mb-2 text-white transition 
              transform hover:scale-110 ease-out duration-300'>
            <MdFavoriteBorder className='w-[20px] h-[20px] '/><span>Favourite</span></Link>
          {isAuthenticated ? (
            <>
              <Link to='/profile' className='flex items-center space-x-2  text-white transition 
              transform hover:scale-110 ease-out duration-300'>
                <CgProfile className='text-2xl w-[20px] h-[20px]' /><span>Profile</span>
              </Link>
              <button onClick={onLogout} className='mt-4 px-3 py-1 bg-primary text-white rounded-xl'>
                Logout</button>
            </>
          ) : (
            <Link to='/login' className='flex items-center space-x-2  text-white transition 
              transform hover:scale-110 ease-out duration-300 '>
              <CgProfile className='text-2xl w-[20px] h-[20px]' /><span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
