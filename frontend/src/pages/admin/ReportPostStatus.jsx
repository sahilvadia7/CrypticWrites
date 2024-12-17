import React, { useState, useEffect } from "react";
import "./Reportpost.css";

const ReportPostStatus = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Fetch reported posts when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/report/getreport")
      .then((response) => response.json())
      .then((data) => {
        // Ensure the response data is in the correct format
        setPosts(
          data.map((post) => ({
            ...post,
            reportCount: post.reportCount || 0, // Default value if reportCount is missing
          })),
        );
      })
      .catch(() => setError("Failed to fetch posts"));
  }, []);

  // Function to delete a post
  const deletePost = (id) => {
    fetch(`http://localhost:8080/api/post/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch(() => setError("Failed to delete post"));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-header">Reported Posts</h1>
      <div className="nav">
        <a href="/admin/manage-creators">Manage Creators</a>
        <a href="/admin/manage-application">Manage Application</a>
        <a href="/admin/view-all-posts">View All Posts</a>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
              <p className="post-status">Status: {post.status}</p>
              <p className="post-reports">Reported Count: {post.reportCount}</p>
              <div className="post-actions">
                <button
                  className="delete-button"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reported posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ReportPostStatus;
