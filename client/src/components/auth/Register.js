import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register, clearErrors } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({
  auth: { isAuthenticated, loading, errors },
  setAlert,
  clearErrors,
  register
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: ""
  });

  useEffect(() => {
    if (errors) {
      errors.map(error => setAlert(error.msg, "danger"));
      clearErrors();
    }
  }, errors);

  const { name, email, password1, password2 } = formData;

  const clearFormData = () => {
    setFormData({
      ...formData,
      name: "",
      email: "",
      password1: "",
      password2: ""
    });
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    if (name == "" || email == "" || password1 == "" || password2 == "") {
      setAlert("Fill in all fields", "danger");
    } else if (password1 !== password2) {
      setAlert("Passwords dont match", "danger");
    } else {
      register(name, email, password1);

      //Clear inputs
      clearFormData();
    }

    e.preventDefault();
  };

  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <section id="register">
        <form className="form" onSubmit={onSubmit}>
          <h1>Register account</h1>
          <h6 className="text-primary">* means required</h6>
          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              value={name}
              name="name"
              onChange={onChange}
              type="text"
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

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
              value={password1}
              onChange={onChange}
              name="password1"
              type="password"
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
              onChange={onChange}
              value={password2}
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

const propTypes = {
  clearErrors: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register, setAlert, clearErrors })(
  Register
);
