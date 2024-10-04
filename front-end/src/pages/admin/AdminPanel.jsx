import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Panel</h1>
            </div>

            <div className="admin-boxes">
                <div className="admin-box">
                    <h3>Manage Creators</h3>
                    <a href="/admin/manage-creators">Go to Manage Creators</a>
                </div>
                <div className="admin-box">
                    <h3>Report Posts</h3>
                    <a href="/admin/report-post-status">Go to Report Posts</a>
                </div>
                <div className="admin-box">
                    <h3>View All Posts</h3>
                    <a href="/admin/view-all-posts">Go to All Posts</a>
                </div>
            </div>

          
        </div>
    );
};

export default AdminPanel;


