import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const Register = ({ auth: { isAuthenticated, loading, errors }, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: ""
  });

  const { name, email, password1, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    if (name == "" || email == "" || password1 == "" || password2 == "") {
      console.log("Fill in all required fields");
    } else if (password1 !== password2) {
      console.log("Passwords doesnt match");
    } else {
      register(formData);
    }

    e.preventDefault();
  };

  return (
    <Fragment>
      <section id="register">
        <form className="form" onSubmit={onSubmit}>
          <h1>Register account</h1>
          <h6 className="text-primary">* means required</h6>
          <div className="form-group">
            <span className="text-primary">*</span>
            <input
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
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <span className="text-primary">*</span>
            <input
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register })(Register);
