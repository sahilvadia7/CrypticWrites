import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/post'); // Simulating posts with authors and dates
      const data = await response.json();



      const truncateDescription = (description, lineCount = 1) => {
        const lines = description.split('\n'); // Split the description by new lines
        return lines.length > lineCount ? lines.slice(0, lineCount).join('\n') + '...' : description; // Truncate if needed
    };
      // Assume each post object includes author and date information (simulated)
      // .slice(0, 6).
      const formattedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        description: truncateDescription(post.description),
        author: `Author ${post.author}`,  // Simulating author name
        postDate: post.postDate,  // Simulating date
        category: ` ${post.category}`,
        image: `http://localhost:8080/api/post/${post.id}/image`
      }));
      setPosts(formattedPosts);
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      {posts.length === 0 ? ( // Check if there are no posts
        <div className="no-posts-message">
          <img src="src\images\noPost.jpg" alt="No posts available at the moment." />
        </div>
      ) : (
        posts.map(post => (
        <div key={post.id} className="post-card">
          <img src={post.image} alt={post.title} />
          <div className="post-content">
            <div className="post-info">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <div className="post-meta">
              <span>{post.author}</span>
              <span>{post.category}</span>
              <span>{post.postDate}</span>
            </div>
          </div>
          <Link to={`/post/${post.id}`} className="read-more">
            Read More
          </Link>
        </div>
      ))
    )}
    </div>
  );
};

export default HomePage;
