import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const SidebarBlogs = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
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
      <ul className="mt-6 space-y-4">
        <li>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-11 w-30 sm:h-14 mb-6 cursor-pointer" />
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="flex items-center px-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
             Blogs
          </Link>
        </li>
        <li>
          <Link to="/blogs/create" className="flex items-center  px-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
             Create Blog
          </Link>
        </li>
        <li>
          <Link 
          to="/blogs-user"
          onClick={handleLogout} className="flex items-center px-2 text-black transition 
          transform hover:scale-110 ease-out duration-300">
            My Blogs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarBlogs;