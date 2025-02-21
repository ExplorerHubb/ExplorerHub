import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarBlogs from "../../Components/SidebarBlogs/sidebarBlogs.jsx";
import { FiMenu } from "react-icons/fi";    

function CreateBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in. Please log in first.");
        return;
    }

    if (!name || !description || !city) {
        alert("Name, description, and city are required!");
        return;
    }

    const response = await fetch("https://seba2.pythonanywhere.com/Blogs/Blog/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, city }),
    });

    if (response.ok) {
        navigate("/blogs"); 
    } else {
        const errorData = await response.json();
        console.error("Error creating blog");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
        <SidebarBlogs sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 p-3 text-black flex justify-center items-center">
            <button
            className="lg:hidden absolute top-4 left-4"
            onClick={() => setSidebarOpen(true)}
            >
            <FiMenu size={20} />
            </button>
            <div className="max-w-2xl w-full mx-auto lg:ml-80 xl:ml-auto xl:mr-60 mt-5 p-8
             bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block font-semibold">Blog Title:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-xl"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block font-semibold">Description:</label>
                    <textarea
                        className="w-full p-2 border rounded-xl"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    </div>
                    <div className="mb-4">
                    <label className="block font-semibold">City:</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-xl"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-xl transition 
                    transform hover:scale-110 ease-out duration-300">
                    Create Blog
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default CreateBlog;
