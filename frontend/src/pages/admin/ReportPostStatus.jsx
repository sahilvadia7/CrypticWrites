import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const ReportPostStatus = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(() => setError('Failed to fetch posts'));
    }, []);

    const updateStatus = (id, status) => {
        fetch(`/api/posts/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
            .then(() => setPosts(posts.map(post => post.id === id ? { ...post, status } : post)))
            .catch(() => setError('Failed to update status'));
    };

    return (
        <div className="admin-container">
            <h1 className="admin-header">Report Post Status

            <div className="nav">
                    <a href="/admin/manage-creators">Manage Creators</a>
                    <a href="/admin/ManageApplication">Manage Application</a>
                    {/* <a href="/admin/report-post-status">Report Posts</a> */}
                    <a href="/admin/view-all-posts">View All Posts</a>
                </div>
            </h1>
            {error && <p className="error">{error}</p>}

            <div className="post-list">
                {posts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>Status: {post.status}</p>
                        <button onClick={() => updateStatus(post.id, 'approved')}>Approve</button>
                        <button onClick={() => updateStatus(post.id, 'rejected')}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportPostStatus;
