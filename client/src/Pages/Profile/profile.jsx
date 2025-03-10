import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import profilepic from "../../assets/profile.png";

const ProfileContent = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl border w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={user?.image_url || profilepic}
            alt="Profile"
            className="w-44 h-52 rounded-lg object-cover"
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
  
        // console.log("User data:", response.data); // Debugging
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

  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
    <div className="flex-1 p-6 lg:ml-64 text-black">
      <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <FiMenu size={20} />
      </button>
      <ProfileContent user={user} />
    </div>
  </div>
  );
};

export default profile;
