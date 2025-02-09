import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../../assets/logo.png';
import { IoIosLogOut } from "react-icons/io";
import { MdSecurityUpdateGood } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import profilepic from "../../assets/profile.png";

const profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const response = await axios.get("https://seba2.pythonanywhere.com/user/2", {
          headers: { Authorization: `Token  ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfilePictureChange = (event) => { // Define handleProfilePictureChange
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const response = await axios.put(
        `https://seba2.pythonanywhere.com/update_user/${user.id}`,
        { profilePicture },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white text-black w-64 p-5 fixed h-full transition-transform 
        ${sidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} lg:translate-x-0 lg:z-auto`}>

        <button className="lg:hidden mb-4 text-black" onClick={() => setSidebarOpen(false)}>
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <ul className="mt-6 space-y-4">
          <li>
            <Link to="/" >        
              <img 
              src={logo}
              alt="Logo" 
              className="h-11 w-30 sm:h-14 cursor-pointer" 
              onClick={() => navigate('/')} 
              />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-2 p-2 text-black">
            <MdOutlineFavoriteBorder size={20} />
              Favourites
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-2 p-2 text-black">
              <MdSecurityUpdateGood size={20} />
              Update Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center gap-2 p-2 text-black">
              <IoIosLogOut size={20} />Logout</button>
          </li>
        </ul>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 lg:ml-64 text-black">
        {/* Top bar */}
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <FiMenu size={20} />
        </button>
        
        {/* Main content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src={profilePicture || profilepic} 
                alt="Profile" 
                className="w-24 h-24 rounded-full"
              />
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleProfilePictureChange}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user?.username}</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input 
                type="text" 
                value={user?.first_name || ''} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type="text" 
                value={user?.last_name || ''} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="text" 
                value={user?.phone || ''} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input 
                type="text" 
                value={user?.country || ''} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readOnly
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default profile;
