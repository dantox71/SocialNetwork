import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const [menuState, setMenuState] = useState(false);

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/" className="nav-link btn ml-2">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link btn ml-2">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link btn ml-2">
          Sign In
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/posts" className="nav-link btn ml-2">
          Posts
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="nav-item ">
        <Link to="/profile" className="nav-link btn  ">
          <img
            src="https://avatars1.githubusercontent.com/u/53446414?s=460&v=4"
            alt="User avatar"
            className="mr-1"
          />
          My profile
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/profiles" className="nav-link btn  ">
          Profiles
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/posts" className="nav-link btn  ">
          Posts
        </Link>
      </li>

      <li className="nav-item">
        <a href="#!" onClick={() => logout()} className="nav-link btn">
          Logout <i className="ml-1 fa fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  );

  return (
    <nav className="main-nav">
      <div className="brand">
        <Link to="/">
          <h1>
            Post<span className="text-primary">Man</span>
          </h1>
        </Link>
      </div>

      <ul className="nav-list">{isAuthenticated ? authLinks : guestLinks}</ul>
      <div
        className={menuState ? "opened mobile-toggler" : "mobile-toggler"}
        onClick={() => setMenuState(!menuState)}
      >
        <span className="mobile-line"></span>
      </div>

      <ul className={menuState ? "opened mobile-nav-list" : "mobile-nav-list"}>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

const propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
