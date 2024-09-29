import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <a href="/" className="logo">RAGAZZICLUB</a>
      <nav>
        <Link to="/cars-for-sale">Cars for Sale</Link>
        <Link to="/listing">Example Car Listing</Link> {/* New link */}
        <Link to="/research">Research</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}