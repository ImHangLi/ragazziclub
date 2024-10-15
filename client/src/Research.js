import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Research.css"

const ResearchPost = ({
  id,
  title,
  description,
  imageUrl,
}) => (
  <Link to={`/research/${id}`} className="research-post">
    <div className="post-image-container">
      <img src={imageUrl} alt={title} className="post-image" />
    </div>
    <div className="post-content">
      <h2>{title}</h2>
      <p className="post-description">{description}</p>
    </div>
  </Link>
)

const Research = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>No posts found.</div>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="research-container">
      <h1>research</h1>
      <div className="featured-post">
        {posts[0] && (
          <ResearchPost
            key={posts[0].id}
            {...posts[0]}
          />
        )}
      </div>
      <div className="post-grid">
        {currentPosts.slice(1).map((post) => (
          <ResearchPost key={post.id} {...post} />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        {currentPage < pageNumbers.length && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
        )}
      </div>
    </div>
  )
}

export default Research
