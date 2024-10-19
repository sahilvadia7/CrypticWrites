import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest'); // Default sorting option

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/post');
      const data = await response.json();

      const truncateDescription = (description, lineCount = 1) => {

        if (!description) return '';
        const lines = description.split('\n');
        return lines.length > lineCount ? lines.slice(0, lineCount).join('\n') + '...' : description;
      };

      const formattedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        description: truncateDescription(post.description),
        author: `Author ${post.author}`,
        date: new Date(post.postDate), // Convert to Date object for sorting
        category: `Topic ${post.category}`,
        image: `http://localhost:8080/api/post/${post.id}/image`
      }));
      setPosts(formattedPosts);
    };

    fetchData();
  }, []);

  // Function to handle sorting
  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);

    const sortedPosts = [...posts].sort((a, b) => {
      if (selectedOrder === 'newest') {
        return b.date - a.date; // Sort by newest date first
      } else if (selectedOrder === 'oldest') {
        return a.date - b.date; // Sort by oldest date first
      }else if (selectedOrder === 'a-z') {
        return a.title.localeCompare(b.title); // Sort alphabetically A-Z
      } else if (selectedOrder === 'z-a') {
        return b.title.localeCompare(a.title); // Sort alphabetically Z-A
      }
      return 0; // Default case
    });

    setPosts(sortedPosts);
  };

  return (
    <div className="home-container">
      {/* Conditionally render sort dropdown only if posts exist */}
      {/* {posts.length > 0 && (
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Title A-Z</option>
            <option value="z-a">Title Z-A</option>
          </select>
        </div>
      )} */}

      {/* Check if posts are empty */}
      {posts.length === 0 ? (
        <div className="no-posts">
          <img
            src="src\images\noPost.jpg"
            alt="No posts available"
            className="no-posts-img"
          />
          {/* <p>No posts available at the moment. Please check back later.</p> */}
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
                <span>{post.date.toLocaleDateString()}</span> {/* Format date for display */}
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
