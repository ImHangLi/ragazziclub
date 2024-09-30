import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Post from "./Post";
import CarListing from "./CarListing"; // Import the new CarListing component

function App() {
  const [posts, setPosts] = useState([]); // Store posts in the state

  // Function to load posts, can be reused when the route is visited
  const loadPosts = () => {
    setPosts([
      { title: "RIDOX Supra", image: "posts/image1.jpg" },
      { title: "Ferrari F40", image: "posts/image2.jpg" },
      { title: "Lamborghini Diablo", image: "posts/image3.jpg" },
      { title: "Porsche 911 GT2", image: "posts/image4.jpg" },
      { title: "Nissan GT-R R34", image: "posts/image5.jpg" },
      { title: "Mercedes S-Class", image: "posts/image6.jpg" }
    ]);
  };

  useEffect(() => {
    loadPosts(); // Initially load posts when the app first renders
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Route for the main page (showing posts) */}
        <Route
          path="/cars-for-sale"
          element={
            <main>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <Post key={index} title={post.title} image={post.image} />
                ))
              ) : (
                <p>Loading...</p> // Display a loading message if posts haven't loaded
              )}
            </main>
          }
        />

        {/* Default route (redirect to cars-for-sale) */}
        <Route path="/" element={<Navigate to="/cars-for-sale" />} />
        {/* Route for the car listing page */}
        <Route path="/listing" element={<CarListing />} />
      </Routes>
    </Router>
  );
}

export default App;