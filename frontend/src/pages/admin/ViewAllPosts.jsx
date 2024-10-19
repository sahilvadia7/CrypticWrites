import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from API
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:8080/api/post'); 
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const notifyCreator = (postId) => {
        // Logic to notify creator (could be an API call)
        alert(`Notified creator for post ID: ${postId}`);
    };

    const deletePost = async (postId) => {
        const response = await fetch(`http://localhost:8080/api/deletePost/${postId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setPosts(posts.filter((post) => post.id !== postId));
        } else {
            alert('Failed to delete the post');
        }
    };

    return (
        <div className="all-posts-container">
            <div className="all-posts-header">
                <h1 className="admin-header">All Posts

                <div className="nav">
                    <a href="/admin/manage-creators">Manage Creators</a>
                    <a href="/admin/ManageApplication">Manage Application</a>
                    <a href="/admin/report-post-status">Report Posts</a>
                    {/* <a href="/admin/view-all-posts">View All Posts</a> */}
                </div>
                </h1>
            </div>
            {posts.map((post) => (
                <div className="post-box" key={post.id}>
                    <p>{post.author}</p>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <button
                        className="notification-button"
                        onClick={() => notifyCreator(post.id)}
                    >
                        Notify Creator
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => deletePost(post.id)}
                    >
                        Delete Post
                    </button>
                </div>
            ))}
            
        </div>
    );
};

export default AllPosts;
