import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { getCurrentProfile } from "../../actions/profiles";

import PropTypes from "prop-types";

const Navbar = ({
  auth: { isAuthenticated, user },
  logout,
  getCurrentProfile,
  currentProfile
}) => {
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    if (user !== null) {
      getCurrentProfile();
    }
  }, [user]);

  const guestLinks = (
    <Fragment>
      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/" className="nav-link btn ml-2">
          Home
        </Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/register" className="nav-link btn ml-2">
          Sign Up
        </Link>
      </li>
      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/login" className="nav-link btn ml-2">
          Sign In
        </Link>
      </li>

      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/posts" className="nav-link btn ml-2">
          Posts
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="nav-item " onClick={() => setMenuState(false)}>
        {currentProfile ? (
          <Link
            to={`/profile/${currentProfile._id}`}
            className="nav-link btn  "
          >
            <img
              src={currentProfile.avatar}
              alt="User avatar"
              className="mr-1"
            />
            My profile
          </Link>
        ) : (
          <Link to="/create-profile" class="nav-link btn  ">
            Create Profile
          </Link>
        )}
      </li>

      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/profiles" className="nav-link btn  ">
          Profiles
        </Link>
      </li>

      <li className="nav-item" onClick={() => setMenuState(false)}>
        <Link to="/posts" className="nav-link btn  ">
          Posts
        </Link>
      </li>

      <li className="nav-item" onClick={() => setMenuState(false)}>
        <a
          href="#!"
          onClick={() => {
            logout();
          }}
          className="nav-link btn"
        >
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
            <i className="fas fa-user-friends logo"></i>
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
  isAuthenticated: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  currentProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentProfile: state.profiles.currentProfile
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
