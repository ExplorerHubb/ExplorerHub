import React from 'react'
import Navbar from '../../Components/Navbar/navbar.jsx'
import Header from '../../Components/Header/header.jsx'
import Background from '../../assets/nat.jpeg'
import Footer from '../../Components/Footer/footer.jsx'

const home = ({isAuthenticated, onLogout }) => {

  return (
    <div>
      <div className='bg-cover bg-center'style={{ backgroundImage: `url(${Background})` }} >
        <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <Header />
      </div>
      <Footer />
    </div>
  )
}

export default home