import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetailPage.css'; // Import the CSS file for styling

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:8080/api/post/${id}`);
      const data = await response.json();
      
      const formattedPost = {
        id: data.id,
        title: data.title,
        description: data.description,
        author: `Author: ${data.author}`,  // Simulating author name
        postDate: ` ${data.postDate}`,
        category: ` ${data.category}`,
        image: `http://localhost:8080/api/post/${id}/image`
      };
      setPost(formattedPost);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-detail-content">
        <div className="post-info">
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
        <div className="post-meta">
          <span>{post.author}</span>
          <span>{post.category}</span>
          <span>{post.postDate}</span>

        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
