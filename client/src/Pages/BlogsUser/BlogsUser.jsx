import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarBlogs from "../../Components/SidebarBlogs/sidebarBlogs.jsx";
import { FiMenu } from "react-icons/fi";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegComment } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

function BlogsUser() {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user_id = parseInt(localStorage.getItem("user_id"), 10);
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (blogId) => {
    setMenuOpen(menuOpen === blogId ? null : blogId);
  };

  useEffect(() => {
    fetch("https://seba2.pythonanywhere.com/Blogs/Blog/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(
            data
              .filter((blog) => blog.author === user_id) // تصفية المدونات الخاصة بالمستخدم فقط
              .map((blog) => ({
                ...blog,
                liked: blog.user_liked || false,
                likesCount: blog.likes || 0,
                commentsCount: blog.comments_count || 0,
              }))
          );
        } else {
          setBlogs([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      });
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarBlogs sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 p-3 lg:ml-64 m-9 lg:m-0 text-black flex justify-center items-center">
        <button
          className="lg:hidden absolute top-4 left-4"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu size={20} />
        </button>
        <div className="bg-white p-6 shadow-lg rounded-lg h-[84vh] lg:h-[90vh] overflow-y-auto flex-1 mx-4 lg:mx-32 custom-scrollbar">
          <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
          <div className="space-y-6">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="border p-5 rounded-lg shadow-lg bg-gray-50">
                  <div className="relative flex justify-end">
                    <button onClick={() => toggleMenu(blog.id)}>
                      <BsThreeDotsVertical size={20} className="text-black" />
                    </button>
                    {menuOpen === blog.id && (
                      <div className="absolute right-0 mt-5 bg-white border rounded shadow-md w-24 text-sm z-10">
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                        <Link to={`/blogs/edit-blog/${blog.id}`} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                          Edit
                        </Link>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{blog.name}</h2>
                  <p className="text-gray-700 mb-3">
                    {blog.description.length > 30 ? `${blog.description.substring(0, 30)}...` : blog.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link to={`/blogs/${blog.id}`} className="text-blue-500 font-semibold hover:underline">
                      Read More
                    </Link>
                    <div className="flex space-x-4 items-center">
                      <button className="flex items-center space-x-1">
                        {blog.liked ? (
                          <MdFavorite size={20} className="text-blue-500" />
                        ) : (
                          <MdOutlineFavoriteBorder size={20} className="text-blue-500" />
                        )}
                      </button>
                      <Link to={`/blogs/${blog.id}`} className="flex items-center space-x-1">
                        <FaRegComment size={20} className="text-blue-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-red-500">No blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogsUser;