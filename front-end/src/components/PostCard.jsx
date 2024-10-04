import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`); // Navigate to the post detail page
  };

  return (
    <div className="post-card" onClick={handleClick}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className="post-info">
        <span>Author: {post.author}</span> 
        <span>Date: {post.postDate}</span>
        <span>Cetegory: {post.category}</span>

      </div>
    </div>
  );
};

export default PostCard;
