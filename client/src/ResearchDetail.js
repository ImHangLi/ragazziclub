import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./ResearchDetail.css"

const ResearchDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error("Error fetching post:", error))
  }, [id])

  if (!post) return <div>Loading...</div>

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % post.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + post.images.length) % post.images.length
    )
  }

  return (
    <div className="research-detail">
      <div className="image-carousel">
        <img src={post.images[currentImageIndex]} alt={post.title} />
        <button onClick={prevImage} className="carousel-button prev">
          &#10094;
        </button>
        <button onClick={nextImage} className="carousel-button next">
          &#10095;
        </button>
      </div>
      <h1>{post.title}</h1>
      <p className="post-meta">
        {post.author} · {post.date} · {post.readTime} read
      </p>
      <div className="post-content">{post.content}</div>
    </div>
  )
}

export default ResearchDetail
