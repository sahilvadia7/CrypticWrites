// src/pages/CreatorPanel.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CreatorPanel.css";
import Logout from "../../components/Logout";

const CreatorPanel = () => {
  const [creatorName, setCreatorName] = useState("");

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("userData"); // Use the correct key ('userData')

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCreatorName(userData.email); // Assuming `name` is part of the stored user object
      // console.log(userData);
    }
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Creator Panel</h1>
        {creatorName && (
          <h3 className="creator-name">
            Welcome, {creatorName} <Logout />
          </h3>
        )}

        {/* {console.log(creatorName)} */}
      </div>

      <div className="admin-boxes">
        <div className="admin-box">
          <h3>Recent Posts</h3>
          <Link to="/creator/ManagePost">View and manage posts.</Link>
        </div>
        {/* <div className="admin-box">
                    <h3>Reported Posts</h3>
                    <Link to="/admin/report-post-status">Check posts that have been reported by users.</Link>
                </div> */}
        <div className="admin-box">
          <h3>Add New Posts</h3>
          <Link to="/creator/CreatePost">Create a New Post</Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorPanel;
