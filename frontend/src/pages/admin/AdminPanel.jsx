import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import Logout from "../../components/Logout";

const AdminPanel = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("userData"); // Use the correct key ('userData')

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setAdminName(userData.email); // Assuming `name` is part of the stored user object
      // console.log(userData);
    }
  }, []);
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        {adminName && (
          <h3 className="creator-name">
            Welcome, {adminName} <Logout />
          </h3>
        )}
      </div>

      <div className="admin-boxes">
        <div className="admin-box">
          <h3>Manage Creators</h3>
          <a href="/admin/manage-creators">Go to Manage Creators</a>
        </div>
        <div className="admin-box">
          <h3>Manage Applications</h3>
          <a href="/admin/ManageApplication">Go to Manage Application</a>
        </div>
        {/* <div className="admin-box">
                    <h3>Report Posts</h3>
                    <a href="/admin/report-post-status">Go to Report Posts</a>
                </div> */}
        <div className="admin-box">
          <h3>View All Posts</h3>
          <a href="/admin/view-all-posts">Go to All Posts</a>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
