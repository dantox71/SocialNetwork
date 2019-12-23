import React, { useState } from "react";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const Navbar = props => {
  const [menuState, setMenuState] = useState(false);

  return (
    <nav className="main-nav">
      <div className="brand">
        <Link to="/">
          <h1>
            Post<span className="text-primary">Man</span>
          </h1>
        </Link>
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link btn">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/posts" className="nav-link btn">
            Posts
          </Link>
        </li>
      </ul>
      <div
        className={menuState ? "opened mobile-toggler" : "mobile-toggler"}
        onClick={() => setMenuState(!menuState)}
      >
        <span className="mobile-line"></span>
      </div>

      <ul className={menuState ? "opened mobile-nav-list" : "mobile-nav-list"}>
        <li className="nav-item">
          <Link to="/" className="nav-link btn ml-2">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/posts" className="nav-link btn ml-2">
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
