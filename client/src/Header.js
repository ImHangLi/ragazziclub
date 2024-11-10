import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Header.css" // Ensure the correct path to the CSS file

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // For scroll visibility
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Show/hide header based on scroll direction
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);  //Cleanup the event listener
  }, [prevScrollPos]);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`header ${isVisible ? "visible" : ""}`}>
      <a href="/" className="logo">
        RAGAZZICLUB
      </a>

      {/* Menu */}
      <nav className={isOpen ? "nav open" : "nav"}>
        <Link to="/cars-for-sale" onClick={toggleDropdown}>
          Cars for Sale
        </Link>
        <Link to="/research" onClick={toggleDropdown}>
          Research
        </Link>
        <Link to="/contact" onClick={toggleDropdown}>
          Contact Us
        </Link>
        {/* Up arrow button at the bottom of the menu to close it */}
        <div className="menu-close" onClick={toggleDropdown}>
          <span className="arrow-up">&#8593;</span>
        </div>
      </nav>

      {/* Hamburger button */}
      <button className="dropdown-btn" onClick={toggleDropdown}>
        &#9776;
      </button>
    </header>
  )
}
