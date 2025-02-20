import React, { useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home/home.jsx'
import Login from './Pages/Login/login.jsx'
import Register from './Pages/Register/register.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import InfoCity from './Pages/InfoCity/infoCity.jsx'
import Category from './Pages/Category/category.jsx'
import UpdateProfile from './Pages/UpdateProfile/updateProfile.jsx'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = (token) => {
    console.log('Token:', token);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/register" element={<Register onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/city/:cityName" element={<InfoCity />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/update-profile" element={isAuthenticated ? <UpdateProfile /> : <Login onAuthSuccess={handleAuthSuccess}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
