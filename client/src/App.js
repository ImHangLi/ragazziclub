import React from "react"
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Post from "./Post"
import CarListing from "./CarListing"
import Contact from "./Contact"
import Research from "./Research"
import ResearchDetail from "./ResearchDetail"
import CarForSale from "./CarForSale" // Import the new CarForSale component

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

        {/* New route for Cars for Sale page */}
        <Route path="/cars-for-sale" element={<CarForSale />} />

        {/* Route for individual car listings */}
        <Route path="/listing/:id" element={<CarListingDetails />} />
      </Routes>
    </Router>
  )
}

// Wrap CarListing in a component to access route parameters
const CarListingDetails = () => {
  const { id } = useParams();
  return <CarListing carId={id} />;
};

export default App
