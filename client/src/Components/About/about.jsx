import React from 'react'
import whoWeAre from '../../assets/who-we-are.jpg'
import whatoWeAre from '../../assets/what-we-do.jpg'
import whyWeAre from '../../assets/why-choose-us.jpg'

const about = () => {
    const sections = [
        {
          title: "Who We Are?",
          description:
            "ExplorerHub is your ultimate travel companion, designed to help you explore destinations with ease. Our mission is to make travel planning seamless, interactive, and personalized.",
          image:whoWeAre,
        },
        {
          title: "What We Do?",
          description:
            "We provide a smart, community-driven platform where travelers can discover top attractions, share experiences, and plan unforgettable trips with interactive guides and virtual tours.",
          image:whatoWeAre,
        },
        {
          title: "Why Choose Us?",
          description:
            "With AI-powered recommendations, multimedia travel guides, and a vibrant community, ExplorerHub ensures that every trip is tailored to your preferences, making travel more exciting and stress-free.",
          image: whyWeAre,
        },
    ];
      
  return (
    <div id='about' className='py-6 bg-white'>
        <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">About Us</h2>
        </div>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto px-6">
            {sections.map((section, index) => (
            <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >
                <img
                src={section.image}
                alt={section.title}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="text-center md:text-left md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800">{section.title}</h3>
                <p className="text-gray-600 mt-3">{section.description}</p>
                </div>
            </div>
            ))}
        </div>
        
    </div>
  )
}

export default about