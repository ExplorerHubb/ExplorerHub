import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowForward } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch("https://seba2.pythonanywhere.com/home/city/")
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error("Error fetching cities:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += 170;
                setScrollPosition(scrollRef.current.scrollLeft);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 170;
            setScrollPosition(scrollRef.current.scrollLeft);
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 170;
            setScrollPosition(scrollRef.current.scrollLeft);
        }
    };

    return (
        <div className='relative bg-white' id='explore-cities'>
            <div className='max-w-6xl mx-auto text-center'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>Explore Cities</h1>
                <p className='text-gray-600 mb-3'>Discover amazing destinations, their culture, and experiences waiting for you.</p>
            </div>

            <div className='relative w-full flex items-center justify-center'>
                {scrollPosition > 0 && (
                    <button 
                        onClick={scrollLeft} 
                        className="absolute left-2 z-10 bg-primary text-white p-3 rounded-full shadow-md "
                    >
                        <MdArrowBack />
                    </button>
                )}

                <div ref={scrollRef} className='flex overflow-hidden space-x-6 px-6 pb-2 snap-x
                 snap-mandatory whitespace-nowrap scroll-smooth'>
                    {cities.map((city, index) => (
                        <div 
                            key={index} 
                            onClick={() => navigate(`/city/${city.name}`)} // Navigate to City Info Page
                            className='w-48 h-64 flex flex-col items-center justify-center cursor-pointer
                             p-2 transition duration-300 snap-center flex-shrink-0 bg-white'>
                            
                            <div className="relative w-32 h-32 group rounded-full overflow-hidden">
                                <img 
                                    src={city.image_url} 
                                    alt={city.name} 
                                    className="w-32 h-32 rounded-full object-cover transition duration-300 hover:scale-105" 
                                />
                                {/* Black Overlay on Hover */}
                                <div className="absolute bottom-0 left-0 w-full h-0 bg-black opacity-0 group-hover:h-full 
                                group-hover:opacity-60 transition-all duration-500 ease-in-out rounded-full clip-circle"></div>
                                
                                <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold
                                 opacity-100 group-hover:opacity-100 transition-opacity duration-500">
                                    {city.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {scrollRef.current && scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth && (
                    <button 
                        onClick={scrollRight} 
                        className="absolute right-2 z-10 bg-primary text-white p-3 rounded-full shadow-md hover:bg-gray-700"
                    >
                        <IoMdArrowForward />
                    </button>
                )}
            </div>

            {/* Explore All */}
            <div className="flex justify-center mt-2">
                <button className="bg-primary text-white px-6 py-2 rounded-2xl shadow-md  
                transition transform hover:scale-110 duration-300 ease-out">    
                    Explore All
                </button>
            </div>
        </div>
    );
}

export default Cities;
