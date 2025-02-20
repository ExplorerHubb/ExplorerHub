import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shopping from '../../assets/shopping.jpg';
import catering from '../../assets/catering.jpg';
import accommodation from '../../assets/accommodation.jpg';
import entertainment from '../../assets/entertainment.jpg';

const categories = [
  { name: "Shopping", image: shopping },
  { name: "Catering", image: catering },   
  { name: "Accommodation", image: accommodation },
  { name: "Entertainment", image: entertainment }
];

const InfoCity = () => {
    const { cityName } = useParams(); // Get City Name from URL
    const [city, setCity] = useState(null);

    useEffect(() => {
          fetch(`https://seba2.pythonanywhere.com/home/city/${cityName}`)
              .then(response => response.json())
              .then(data => setCity(data))
              .catch(error => console.error("Error fetching city details:", error));
    }, [cityName]);

    if (!city) return <div className="text-center text-lg mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold text-gray-900 text-center">{city.name}</h1>
            <p className="text-lg text-gray-600 text-center mt-2">{city.funfact}</p>

            {/* Famous Food Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800">Famous Foods</h2>
                <ul className="mt-3 list-disc pl-5">
                    {city.famous_food.map((food) => (
                        <li key={food.id}>
                            <span className="font-semibold">{food.name}:</span> {food.description}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden text-center">
                        <img src={category.image} alt={category.name} className="w-full h-80" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{category.name}</h3>
                            <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg
                             hover:bg-blue-700 transition">
                              View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default InfoCity;