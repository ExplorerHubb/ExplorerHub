import React from 'react'
import Navbar from '../../Components/Navbar/navbar.jsx'
import Header from '../../Components/Header/header.jsx'
import Footer from '../../Components/Footer/footer.jsx'
import About from '../../Components/About/about.jsx'
import Cities from '../../Components/Cities/cities.jsx'
import videoBG from '../../assets/Egypt.mp4'

const home = ({isAuthenticated, onLogout }) => {

  return (
<div className="relative w-full h-screen">
      
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoBG} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div className="relative z-10">
        <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <Header />
      </div>

      <Cities />
      <About />
      <Footer />
    </div>
  )
}

export default home