import React from 'react'
import { useState, useEffect } from 'react';
import cairoImage from '../../assets/cities/cairo.jpg';
import aswanImage from '../../assets/cities/aswan2.jpg';
import alexImage from '../../assets/cities/alex.jpg';
import assiutImage from '../../assets/cities/assiut.jpg';

const cityImages = {
    Cairo: cairoImage,
    Aswan: aswanImage,
    Alexandria: alexImage,
    Assiut: assiutImage,
};

const cities = () => {

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("All");
    
    useEffect(() => {
        fetch("https://seba2.pythonanywhere.com/home/city/")
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error("Error fetching cities:", error));
    }, []);

    return (
        <div className='py-6 bg-white' id='explore-cities'>
            <div className='max-w-6xl mx-auto text-center'>
                <h1 className='text-4xl font-bold text-gray-900 mb-6'>Explore Cities</h1>
                <p className='text-gray-600 mb-3'>Discover amazing destinations, their culture, and experiences waiting for you.</p>
            </div>
            
            <div className='relative w-full overflow-hidden'>
                <div className='flex overflow-x-auto scrollbar-hide space-x-6 px-6 pb-2 snap-x snap-mandatory whitespace-nowrap'>
                    {cities.map((city, index) => (
                        <div 
                            key={index} 
                            onClick={() => setSelectedCity(prev => prev === city.name ? "All" : city.name)}
                            className='w-48 h-64 flex flex-col items-center justify-center cursor-pointer p-2
                            transition duration-300 snap-center flex-shrink-0 bg-white'>
                            
                            <div className="w-32 h-32 flex items-center justify-center">
                                <img 
                                    src={cityImages[city.name] || cityImages["Cairo"]} 
                                    alt={city.name} 
                                    className={`w-32 h-32 rounded-full object-cover transition duration-300 hover:scale-105 
                                    ${selectedCity === city.name ? 'border-2     border-yellow-500 p-1' : 'hover:border-2 hover:border-yellow-500'}`} 
                                />
                            </div>
                            
                            <p className='mt-3 text-lg font-semibold text-black'>{city.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default cities