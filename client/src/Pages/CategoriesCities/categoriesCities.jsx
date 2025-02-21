import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoriesCities = () => {
    const { cityName, categoryName } = useParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://seba2.pythonanywhere.com/home/city/${cityName}/${categoryName}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);
                const categoryKey = `${categoryName}_place`;
                setPlaces(data[categoryKey] || []); 
            })
            .catch((error) => {
                console.error("Error fetching category details:", error);
                setPlaces([]); 
            })
            .finally(() => setLoading(false)); 
    }, [cityName, categoryName]);

    if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;
    if (places.length === 0) return <div className="text-center text-lg mt-10">No places found in {cityName} for {categoryName}</div>;

    return (
        <div className="max-w-6xl mx-6 md:mx-auto py-10 px-4">
            <h1 className="text-xl md:text-2xl font-bold text-black text-center">Discover amazing {categoryName} in {cityName}</h1>

            <div className="mt-10 mx-7 md:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {places.map((place, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden
                     hover:scale-105 cursor-pointer transition transform duration-300 ease-out">
                        {place.image_url && <img src={place.image_url} alt={place.name} className="w-full h-60 object-cover" />}
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{place.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{place.formatted}</p>
                            {place.phone && <p className="text-gray-600 mt-1">📞 {place.phone}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesCities;
