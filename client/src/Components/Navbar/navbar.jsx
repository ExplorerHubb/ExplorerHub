import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

const navbar = () => {
  return (
    <div className='py-2 bg-cover bg-center bg-no-repeat'>
        <div className='container flex justify-between items-center'>
        {/* logo */}
            <div>
                <img src={logo} alt='logo' className='h-11 w-30 sm:h-14 sm:w-full' />   
            </div>

            {/* nav links */}
            <div className='flex space-x-4'>
                <ul className='md:flex hidden items-center gap-3 lg:gap-5 text-[0.8rem] lg:text-[1rem]'>
                    <li className=''>
                        <Link to='/' className='inline-block px-4 hover:text-secondary duration-200'>Home</Link>                            
                    </li>
                    <li>
                        <Link to='' className='inline-block px-4 hover:text-secondary duration-200'>About</Link>
                    </li>
                    <li>
                        <Link to='' className='inline-block px-4 hover:text-secondary duration-200'>Contact</Link>
                    </li>
                </ul>
            </div>

            {/* auth buttons */}
            <div className='flex items-center space-x-4'>
                {/* search Bar */}
                <div className='relative group hidden sm:block'>
                    <input type="text" placeholder='Search'
                    className='w-[100px] sm:w-[100px] group-hover:w-[200px] 
                    transition-all duration-300 rounded-full border border-grey-300
                    px-2 py-1 focus:outline-none focus:border-2 focus:border-secondary ' />
                    <IoIosSearch className='text-gray-500 group-hover:text-secondary absolute top-1/2
                    -translate-y-1/2 right-3' />
                </div>

                {/* Favourite icon */}
                <Link to=''>
                    <MdFavoriteBorder className='w-[30px] h-[30px] text-white hover:text-black
                     transition transform hover:scale-110 ease-out duration-300 ' />
                </Link>

                {/* Profile icon */}
                <Link to=''>
                    <CgProfile className='w-[30px] h-[30px] text-white hover:text-black
                    transition transform hover:scale-110 ease-out duration-300' />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default navbar