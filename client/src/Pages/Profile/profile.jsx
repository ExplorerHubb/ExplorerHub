import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../../assets/logo.png';
import { IoIosLogOut } from "react-icons/io";
import { MdSecurityUpdateGood } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import profilepic from "../../assets/profile.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  return (
    <div
      className={`bg-white text-black w-64 p-5 fixed h-full transition-transform 
        ${sidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} lg:translate-x-0 lg:z-auto`}
    >
      <button className="lg:hidden mb-4 text-black" onClick={() => setSidebarOpen(false)}>
        <FiX size={20} />
      </button>
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      <ul className="mt-6 space-y-4">
        <li>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-11 w-30 sm:h-14 cursor-pointer" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2 p-2 text-black">
            <MdOutlineFavoriteBorder size={20} /> Favourites
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2 p-2 text-black">
            <MdSecurityUpdateGood size={20} /> Update Profile
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center gap-2 p-2 text-black">
            <IoIosLogOut size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const ProfileContent = ({ user, profilePicture, handleProfilePictureChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={user?.image_url || profilePicture || profilepic}
            alt="Profile"
            className="w-44 h-52 rounded-lg object-cover"
          />
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleProfilePictureChange}
          />
        </div>
        <h3 className="text-xl font-semibold mt-2">{user?.first_name} {user?.last_name}</h3>
      </div>
      <div className="px-4 flex justify-center mb-4">
        <div className="grid grid-cols-2 gap-4 gap-x-28 ">
          {[
            { label: "Username", value: user?.username },
            { label: "Email", value: user?.email },
            { label: "Name", value: `${user?.first_name} ${user?.last_name}` },
            { label: "Gender", value: user?.gender },
            { label: "Country", value: user?.country },
            { label: "Phone Number", value: user?.phone_no }
          ].map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-semibold text-black">{item.label}</span>
              <span className="text-gray-500">{item.value || "Not available"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
  
        if (!token || !userId) return navigate("/login");
  
        const response = await axios.get(`https://seba2.pythonanywhere.com/user/${userId}`, {
          headers: { Authorization: `Token ${token}` },
        });
  
        console.log("User data:", response.data); // Debugging
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
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
        { headers: { Authorization: `Token ${token}` } }
      );
      setUser(response.data); 
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
    <div className="flex-1 p-6 lg:ml-64 text-black">
      <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <FiMenu size={20} />
      </button>
      <ProfileContent user={user} profilePicture={profilePicture} handleProfilePictureChange={handleProfilePictureChange} />
    </div>
  </div>
  );
};

export default profile;
