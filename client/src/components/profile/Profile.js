import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Profile = ({ auth: { isAuthenticated, loading } }) => {
  if (!loading && !isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <Fragment>
      <section id="profiles">
        <div class="container ">
          <div class="profiles">
            <div class="profile">
              <img
                class="profile-img "
                src="https://avatars1.githubusercontent.com/u/53446414?s=460&v=4"
                alt="User's avatar"
              />
              <div class="profile-info">
                <a href="profile.html">
                  <h2>Daniel Łagowski</h2>
                </a>

                <ul>
                  <li>
                    <i class="fa fa-map-marker"></i>Location:
                    <span class="text-bold">Żurawce</span>
                  </li>
                  <li>
                    <i class="fa fa-heart"></i>Status:
                    <span class="text-bold">Single</span>
                  </li>
                  <li>
                    <i class="fa fa-briefcase"></i>Job:
                    <span class="text-bold">Nigdzie</span>
                  </li>
                </ul>
              </div>
              <div class="profile-social-links fb">
                <a href="#">
                  <i class="fab fa-facebook fb"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin linkedin"></i>
                </a>
                <a href="#">
                  <i class="fab fa-youtube yt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Profile);
