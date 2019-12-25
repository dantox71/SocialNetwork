import React, { Fragment, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profiles";
import { loadUser } from "../../actions/auth";

const Profile = ({
  profile,
  auth: { isAuthenticated, loading, user },
  getProfile
}) => {
  useEffect(() => {
    if (user !== null) {
      getProfile();
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <section id="profiles">
        <div class="container ">
          <div class="profiles">
            <div class="profile">
              {profile === null || loading ? (
                <h1 class="text-black text-center">
                  Dont have profile yet?{" "}
                  <Link class="text-primary" to="/create-profile">
                    Create now!
                  </Link>{" "}
                </h1>
              ) : (
                <Fragment>
                  <div class="profile-top">
                    <img
                      class="profile-img"
                      src={profile.avatar}
                      alt="User's avatar"
                    />
                    <Link class="text-center" to="/edit-profile">
                      Edit Profile
                    </Link>
                  </div>

                  <div class="profile-info">
                    <a href="profile.html">
                      <h2>{profile.user.name}</h2>
                    </a>

                    <ul>
                      <li>
                        <i class="fa fa-map-marker"></i>Location:
                        <span class="text-bold">{profile.location}</span>
                      </li>
                      <li>
                        <i class="fa fa-heart"></i>Status:
                        <span class="text-bold">{profile.status}</span>
                      </li>
                      <li>
                        <i class="fa fa-briefcase"></i>Job:
                        <span class="text-bold">{profile.job}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="profile-social-links fb">
                    <a href={profile.social.facebook}>
                      <i class="fab fa-facebook fb"></i>
                    </a>
                    <a href={profile.social.instagram}>
                      <i class="fab fa-instagram instagram"></i>
                    </a>
                    <a href={profile.social.linkedin}>
                      <i class="fab fa-linkedin linkedin"></i>
                    </a>
                    <a href={profile.social.youtube}>
                      <i class="fab fa-youtube yt"></i>
                    </a>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profiles.profile
});

export default connect(mapStateToProps, { getProfile, loadUser })(Profile);
