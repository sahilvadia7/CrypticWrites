import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/post");
      const data = await response.json();

      const truncateDescription = (description, lineCount = 1) => {
        if (!description) return "";
        const lines = description.split("\n");
        return lines.length > lineCount
          ? lines.slice(0, lineCount).join("\n") + "..."
          : description;
      };

      const formattedPosts = data.map((post) => ({
        id: post.id,
        title: post.title,
        description: truncateDescription(post.description, 2),
        author: post.author || "Unknown Author",
        date: new Date(post.postDate),
        category: post.category || "Uncategorized",
        image: `http://localhost:8080/api/post/${post.id}/image`,
      }));

      setPosts(formattedPosts);

      // Select 10 random posts for the "Feature of the Day"
      const randomPosts = formattedPosts
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      setFeaturedPosts(randomPosts);
    };

    fetchData();
  }, []);

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);

    const sortedPosts = [...posts].sort((a, b) => {
      if (selectedOrder === "newest") {
        return b.date - a.date;
      } else if (selectedOrder === "oldest") {
        return a.date - b.date;
      } else if (selectedOrder === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (selectedOrder === "z-a") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setPosts(sortedPosts);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="home-container">
      {/* Search and Sort Container */}
      <div className="search-sort-container">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Title A-Z</option>
            <option value="z-a">Title Z-A</option>
          </select>
        </div>
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <img
              src="src/images/noPost.jpg"
              alt="No posts available"
              className="no-posts-img"
            />
          </div>
        ) : (
          filteredPosts.map((post) => (
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
                  <span>{post.date.toLocaleDateString()}</span>
                </div>
              </div>
              <Link to={`/post/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Featured Posts Section */}
      <div className="featured-posts-section">
        <h2>Feature of the Day</h2>
        <div className="featured-posts-container">
          {featuredPosts.length === 0 ? (
            <p>No featured posts available.</p>
          ) : (
            featuredPosts.map((post) => (
              <div key={post.id} className="featured-card">
                <img src={post.image} alt={post.title} />
                <div className="featured-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link to={`/post/${post.id}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
