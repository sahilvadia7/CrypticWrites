import React from 'react';
import './CreatorPanel.css';
import { Link } from 'react-router-dom';


const CreatorPanel = ({ creatorName }) => {
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Creator Panel</h1>
                {/* {creatorName && <h3 className="creator-name">Welcome, {creatorName}!</h3>} */}
            </div>

            <div className="admin-boxes">
                <div className="admin-box">
                    <h3>Recent Posts</h3>
                    <a href="/admin/manage-creators">View and manage posts.</a>
                </div>
                <div className="admin-box">
                    <h3>Reported Posts</h3>
                    <a href="/admin/report-post-status">Check posts that have been reported by users.</a>
                </div>
                <div className="admin-box">
                    <h3>Add New Posts</h3>
                    <a href="/creator/CreatePost">Create a New Post</a>
                </div>
            </div>
        </div>
    );
};

export default CreatorPanel;
