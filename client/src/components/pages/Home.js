import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <Fragment>
      <section id="home">
        <div className="home-content">
          <h1 className="text-lg">
            Welcome to my social network site{" "}
            <span className="text-primary">!</span>
          </h1>

          <p>
            You can browse posts without registering an account but if you want
            to add posts and comments you have to create an account and then a
            user profile.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
