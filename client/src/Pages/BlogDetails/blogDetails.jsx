import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarBlogs from "../../Components/SidebarBlogs/sidebarBlogs.jsx";
import { FiMenu } from "react-icons/fi";
import { BsFillSendFill } from "react-icons/bs";

function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://seba2.pythonanywhere.com/Blogs/Blog/${blogId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Error fetching blog details:", error));
  }, [blogId, token]);
  
  useEffect(() => {
    fetch(`https://seba2.pythonanywhere.com/Blogs/blog_comments/${blogId}/`,{
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch comments: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.blog_comments)) {
          setComments(data.blog_comments); // Extract the array correctly
        } else {
          console.error("Unexpected response format:", data);
          setComments([]); // Prevent errors if the response is not as expected
        }
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [blogId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch("https://seba2.pythonanywhere.com/Blogs/Comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment, blog: blogId }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!blog) return <p>Loading blog details...</p>;

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
            <div className="max-w-sm lg:max-w-xl w-full mx-auto p-6 mt-10 lg:ml-80 xl:ml-auto xl:mr-60
             lg:mt-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>
                <p className="text-gray-600 mb-2">By {blog.author}</p>
                <p className="text-gray-500 mb-2">City: {blog.city}</p>
                <p className="text-gray-500 mb-4">Posted on: {new Date(blog.created_at).toLocaleDateString()}</p>
                <p className="mb-6 text-gray-700 break-words overflow-hidden">
                    {blog.description}
                </p>
                <h2 className="text-2xl font-semibold mb-3">Comments</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto border p-3 rounded-lg bg-gray-100">
                    {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="border p-3 rounded-lg bg-white">
                        <p className="font-semibold">{comment.author}</p>
                        <p className="break-words overflow-hidden">{comment.content}</p>
                        </div>
                    ))
                    ) : (
                    <p className="text-gray-500">No comments yet.</p>
                    )}
                </div>

                <div className="mt-4 flex gap-5 sticky bottom-0 bg-white py-4">
                    <textarea
                    className="w-full p-3 border rounded-lg"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                    className="px-2 py-1 text-white rounded-lg "
                    onClick={handleCommentSubmit}
                    >
                    <BsFillSendFill size={20} className="inline-block mr-2 text-primary transition 
                    transform hover:scale-110 ease-out duration-300 " />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BlogDetails;
