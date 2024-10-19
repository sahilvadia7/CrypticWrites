import React, { useEffect, useState } from "react";
import "./CreatePost.css"; // Import the CSS for styling
import SimpleDropdown from "../../components/SimpleDropdown";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    author: "", // Will be automatically set from localStorage (email)
    postDate: "",
    category: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setPost((prevPost) => ({
        ...prevPost,
        author: storedEmail, // Automatically set the author to logged-in user's email
      }));
    }
  }, []);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPost({
      ...post,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleCategoryChange = (category) => {
    setPost((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!post.title || !post.description || !post.author) {
      setError("All fields are required!");
      return;
    }
  
    // Ensure image is selected
    if (!post.image) {
      setError("Please select an image!");
      return;
    }
  
    // Create a FormData object to send the post data
    const formData = new FormData();
    formData.append(
      "post",
      new Blob(
        [JSON.stringify({
          title: post.title,
          description: post.description,
          creator: { email: post.author },  // Set creator's email here
          postDate: post.postDate,
          category: post.category,
        })],
        { type: "application/json" }
      )
    );
    formData.append("image", post.image);
    // Ensure image is attached
    console.log(post); // Check if `author` field is correctly populated

    try {
      const response = await fetch("http://localhost:8080/api/addPost", {
        method: "POST",
        body: formData,
      });
      console.log("Submitting Post: ", formData); // Inspect what is being sent to the backend

      if (response.ok) {
        const result = await response.json();
        console.log("Post created:", result);
        setSuccess("Post created successfully!");
        setError("");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create post");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred while creating the post. Please try again.");
      setSuccess("");
    }
  
    // Reset the form
    setPost({
      title: "",
      description: "",
      author: post.author, // Reset author to logged-in user's email
      postDate: "",
      category: "",
      image: null,
    });
  };
  

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author (Email):</label>
          <input
            type="text"
            name="author"
            value={post.author} // Pre-fill author field with logged-in user's email
            readOnly // Make the field read-only
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="postDate"
            value={post.postDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <SimpleDropdown onChange={handleCategoryChange} />{" "}
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
