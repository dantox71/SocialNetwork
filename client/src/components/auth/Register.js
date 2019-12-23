import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Register = props => {
  return (
    <Fragment>
      <section id="register">
        <form className="form">
          <h1>Register account</h1>
          <h6 className="text-primary">* means required</h6>
          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              name="password2"
              type="password"
              placeholder="Confirm your password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary text-md"
            />
            <p>
              Already have an account? <br />
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Register;
