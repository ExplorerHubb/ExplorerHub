import React from 'react'
import logo from '../../assets/logo.png'
import { Link as Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

const navbar = ({isAuthenticated , onLogout}) => {
  return (
    <div className='py-2 bg-cover bg-center bg-no-repeat'>
        <div className='container flex justify-between items-center'>
        {/* logo */}
            <div>
                <img src={logo} alt='logo' className='h-16 w-full sm:h-16 sm:w-full' />   
            </div>

            {/* nav links */}
            <div className='flex space-x-4'>
                <ul className='md:flex hidden items-center gap-3 lg:gap-5 text-[0.8rem] lg:text-[1rem]'>
                    <li className=''>
                        <Link to='/' className='inline-block px-4 text-white hover:text-secondary duration-200'>
                        Home</Link>                            
                    </li>
                    <li>
                        <ScrollLink to="about" smooth={true} duration={500}
                         className='inline-block px-4 text-white hover:text-secondary duration-200 cursor-pointer'>
                            About</ScrollLink>
                    </li>
                    <li>
                        <Link to='' className='inline-block px-4 text-white hover:text-secondary duration-200'>
                        Contact</Link>
                    </li>
                </ul>
            </div>

            {/* auth buttons */}
            <div className='flex items-center space-x-4'>
                {/* search Bar */}
                <div className='relative group hidden sm:block'>
                    <input type="text" placeholder='Search'
                    className='w-[100px] text-sm sm:w-[100px] group-hover:w-[200px] 
                    transition-all duration-300 rounded-xl border border-grey-300
                    px-2 py-1 focus:outline-none focus:border-2 focus:border-secondary ' />
                    <IoIosSearch className='text-gray-500 group-hover:text-secondary absolute top-1/2
                    -translate-y-1/2 right-3' />
                </div>

                {/* Favourite icon */}
                <Link to=''>
                    <MdFavoriteBorder className='w-[20px] h-[20px] text-white
                     transition transform hover:scale-110 ease-out duration-300 ' />
                </Link>

                {/* Profile icon */}
                {isAuthenticated ? (
                    <>
                    <Link to='/profile'>
                        <CgProfile className='w-[20px] h-[20px] text-white transition
                         transform hover:scale-110 ease-out duration-300' />
                    </Link>
                    <button onClick={onLogout} className="px-4 py-2 bg-white text-green-800 rounded">Logout</button>
                    </>
                ) : (
                    <div className="flex gap-3">
                        <Link to='/login'>
                        <CgProfile className='w-[20px] h-[20px] text-white transition
                         transform hover:scale-110 ease-out duration-300' />
                         </Link>
                        {/* <Link to='/register' className="px-4 py-2 bg-green-500 text-white rounded">Register</Link> */}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default navbar