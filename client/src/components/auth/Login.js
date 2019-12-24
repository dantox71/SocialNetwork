import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, clearErrors } from "../../actions/auth";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";

const Login = ({
  setAlert,
  clearErrors,
  login,
  auth: { isAuthenticated, errors, loading }
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (errors) {
      errors.map(error => setAlert(error.msg, "danger"));
      clearErrors();
    }
  }, [errors]);

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
      setAlert("Fill in all fields", "danger");
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
  clearErrors: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, setAlert, clearErrors })(
  Login
);
