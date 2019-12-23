import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <Fragment>
      <section id="login">
        <form className="form">
          <h1>Login to your account</h1>
          <h6 className="text-primary">* means required</h6>

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
            <input
              type="submit"
              value="Login"
              className="btn btn-primary text-md"
            />
            <p>
              Don't have account ? <br />
              <Link to="/register" className="text-primary">
                Regsiter now
              </Link>
            </p>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;
