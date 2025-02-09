import React from 'react'

const header = () => {
  return (
    <div className='relative min-h-[572px] xl:min-h-[578px] bg-cover bg-center bg-no-repeat'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white'>
            Welcome to ExplorerHub
            </h1>
            <p className='text-lg sm:text-lg lg:text-xl text-gray-200 mt-4 '>
            Explore the world with us
            </p>
        </div>
        <button className='absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2
         bg-white text-black px-6 py-2 rounded-xl hover:bg-white hover:text-black
         transition transform hover:scale-110 duration-300 ease-out'>
            Explore
        </button>        
    </div>
  )
}

export default header