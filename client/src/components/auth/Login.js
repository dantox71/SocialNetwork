import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, auth: { isAuthenticated, errors, loading } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password === "" || email === "") {
      console.log("Fill in all required fields");
    } else {
      login(email, password);
    }

    e.preventDefault();
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <section id="login">
        <form className="form" onSubmit={onSubmit}>
          <h1>Login to your account</h1>
          <h6 className="text-primary">* means required</h6>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              value={email}
              onChange={onChange}
              name="email"
              type="text"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              value={password}
              onChange={onChange}
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

const propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
