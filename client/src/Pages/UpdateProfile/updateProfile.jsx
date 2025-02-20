import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import UpdatePic from "../../assets/update.gif";
import { FiMenu } from "react-icons/fi";

const UpdateProfile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        if (!token || !userId) return navigate("/login");

        const response = await axios.get(
          `https://seba2.pythonanywhere.com/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return navigate("/login");
  
      const response = await axios.post("https://seba2.pythonanywhere.com/auth/token/refresh/", { refresh });
      const newAccessToken = response.data.access;
      
      localStorage.setItem("token", newAccessToken); // Update the access token
      
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      navigate("/login");
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      if (!token) return navigate("/login");
  
      const response = await axios.patch(
        `https://seba2.pythonanywhere.com/update_user/${userData.id}/`,
        { ...formData, image_url: userData.image_url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Profile updated successfully:", response.data);
      setUserData(response.data);
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expired, refreshing...");
        const newToken = await refreshToken();
        
        if (newToken) {
          localStorage.setItem("token", newToken);  // تأكد من تحديث التوكن في التخزين المحلي
          
          const retryResponse = await axios.patch(
            `https://seba2.pythonanywhere.com/update_user/${userData.id}/`,
            { ...formData, image_url: userData.image_url },
            { headers: { Authorization: `Bearer ${newToken}` } }
          );
  
          setUserData(retryResponse.data);
          navigate("/profile");
        }
      } else {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">  
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 p-3 lg:ml-64 m-9 lg:m-0 text-black flex justify-center items-center">
        {/* Sidebar toggle button */}
        <button className="lg:hidden absolute top-4 left-4" onClick={() => setSidebarOpen(true)}>
          <FiMenu size={20} />
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl flex flex-row-reverse
         items-center gap-5">
          {/* Illustration */}
          <div className="hidden md:block w-1/2">
            <img src={UpdatePic} alt="Update Illustration" className="w-full h-auto" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-600 mb-3 text-center">Update Profile</h2>
            {["username", "email", "first_name", "last_name", "phone_no", "country"].map((field) => (
              <div key={field} className="mb-2">
                <label className="text-sm font-semibold text-black">{field.replace("_", " ")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-primary outline-none w-full"
                />
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-xl transition transform hover:scale-95 
                ease-in duration-300">
                UPDATE
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-xl transition transform hover:scale-95
                 ease-in duration-300"
                onClick={() => { console.log("Cancel");
                                  navigate("/profile"); }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
