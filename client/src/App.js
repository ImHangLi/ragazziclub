import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Post from "./Post"
import CarListing from "./CarListing" // Import the new CarListing component
import Contact from "./Contact" // Import the updated Contact component
import Research from "./Research" // Import the new Research component
import ResearchDetail from "./ResearchDetail" // Import the new ResearchDetail component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Route for the main page (showing posts) */}
        <Route
          path="/"
          element={
            <main>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </main>
          }
        />

        {/* Route for the luxury car listing page */}
        <Route path="/listing" element={<CarListing />} />

        {/* Route for the contact page */}
        <Route path="/contact" element={<Contact />} />

        {/* Route for the research page */}
        <Route path="/research" element={<Research />} />

        {/* Route for individual research posts */}
        <Route path="/research/:id" element={<ResearchDetail />} />
      </Routes>
    </Router>
  )
}

export default App
