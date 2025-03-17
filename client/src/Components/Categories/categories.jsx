import React from 'react';
import { useNavigate } from 'react-router-dom';
import historical from '../../assets/historical.jpg';
import modern from '../../assets/modern.jpg';
import religion from '../../assets/religion.jpg';
import desert from '../../assets/desert.jpg';   
import beach from '../../assets/beach.jpg';
import natural from '../../assets/natural.jpg';

const categoriesData = [
    { name: "Historical", image: historical },
    { name: "Modern", image: modern },
    { name: "Religion", image: religion },
    { name: "Desert", image: desert },
    { name: "Beach", image: beach },
    { name: "Natural", image: natural }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleExplore = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div id='categories' className="relative max-w-6xl mx-auto py-14 px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-black">Explore Our Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-lg group 
                cursor-pointer">
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        loading="eager"
                        className="w-full h-72 object-cover transform group-hover:scale-110
                        transition duration-300" 
                    />
                    {/* Black Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70
                    group-hover:opacity-90 transition-opacity duration-200"></div>
                    
                    {/* Category Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <h3 className="text-xl md:text-2xl font-bold">{category.name}</h3>
                        <button 
                            onClick={() => handleExplore(category.name)} 
                            className="mt-2 md:mt-3 px-3 py-1 md:px-4 md:py-2 bg-primary text-white rounded-xl
                             transition transform hover:scale-110 duration-300 ease-out"
                        >
                            Explore it
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Categories;