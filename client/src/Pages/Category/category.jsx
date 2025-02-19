import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const { categoryName } = useParams(); // Get Category Name from URL
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`https://seba2.pythonanywhere.com/api/${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categoryName]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-10">
        {/* Logo */}
        <img 
            src={logo}
            alt="Logo" 
            className="absolute top-4 left-4 h-11 w-30 sm:h-14 cursor-pointer" 
            onClick={() => navigate('/')} 
        />
        <h1 className="text-2xl md:text-4xl mt-10 font-bold text-center mb-6 capitalize">{categoryName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {places.map((place) => (
            <div key={place.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <img src={place.image_url} alt={place.name} className="w-full h-72 object-cover" />
                <div className="p-4">
                <h2 className="text-lg md:text-xl font-bold mb-2">{place.name}</h2>
                <p className="text-gray-600 text-sm">{place.description}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Category;
