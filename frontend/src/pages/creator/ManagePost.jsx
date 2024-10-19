import React, { useEffect, useState } from 'react';
import '../admin/AdminPanel.css';

const ManagePost = () => {
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        // Fetch email from localStorage and fetch posts
        const storedEmail = localStorage.getItem('email');
        console.log('Stored Email:', storedEmail); // Log to check the stored email
        
        if (storedEmail) {
            setEmail(storedEmail);
            fetchPosts(storedEmail); // Call fetchPosts directly here
        } else {
            console.warn('Email not found in localStorage');
        }
    }, []); // Only run on component mount

    const fetchPosts = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/api/creator/${email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Fetched Posts: ', data);
            setPosts(data); // Set posts state
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/deletePost/${postId}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                // Filter out the deleted post
                setPosts(posts.filter((post) => post.id !== postId));
            } else {
                alert('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="all-posts-container">
            <div className="all-posts-header">
                <h1>All Posts</h1>
                <div className="nav">
                    <a href="/admin/manage-creators">Manage Creators</a>
                    <a href="/admin/report-post-status">Report Posts</a>
                    <a href="/admin/view-all-posts">View All Posts</a>
                </div>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="post-box" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <button
                            className="delete-button"
                            onClick={() => deletePost(post.id)}
                        >
                            Delete Post
                        </button>
                    </div>
                ))
            ) : (
                <p>No posts available for the creator.</p>
            )}
        </div>
    );
};

export default ManagePost;
