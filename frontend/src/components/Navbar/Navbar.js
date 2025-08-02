import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

import './Navbar.css';

function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h1 className="logo">
          <Link to="/" className="logo-link">Shopinity</Link>
        </h1>

        <div className="navbar-search">
        <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
      />
      </div>

        <div className="navbar-links">
          <Link to="/cart" className="nav-link">
            <FaShoppingCart className="icon" />
            <span>Cart</span>
          </Link>

          <Link to="/login" className="nav-link">
            <CgProfile className="icon" />
            <span>Login</span>
          </Link>

          <Link to="/seller-register" className="nav-link">
            <CgProfile className="icon" />
            <span>Want to sell?</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
