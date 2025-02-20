import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { IoIosLogOut } from "react-icons/io";
import { MdSecurityUpdateGood, MdOutlineFavoriteBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  return (
    <div
      className={`bg-white text-black w-64 p-5 fixed h-full transition-transform 
        ${sidebarOpen ? "translate-x-0 z-50" : "-translate-x-64"} lg:translate-x-0 lg:z-auto
         transition-transform duration-500 ease-in-out`}
    >
      <button className="lg:hidden mb-4 text-black" onClick={() => setSidebarOpen(false)}>
        <FiX size={20} />
      </button>
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      <ul className="mt-6 space-y-3">
        <li>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-11 w-30 sm:h-14 mb-6 cursor-pointer" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2 p-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
            <CgProfile size={20} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2 p-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
            <MdOutlineFavoriteBorder size={20} /> Favourites
          </Link>
        </li>
        <li>
          <Link to="/update-profile" className="flex items-center gap-2 p-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
            <MdSecurityUpdateGood size={20} /> Update Profile
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center gap-2 p-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
            <IoIosLogOut size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;