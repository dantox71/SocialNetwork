import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { editProfile, getCurrentProfile } from "../../actions/profiles";
import { setAlert } from "../../actions/alert";

const EditProfile = ({
  getCurrentProfile,
  currentProfile,
  editProfile,
  setAlert,
  auth: { isAuthenticated, user }
}) => {
  useEffect(() => {
    if (currentProfile) {
      if (!currentProfile.social) {
        currentProfile.social = {};
      }

      setFormData({
        avatar: currentProfile.avatar || "",
        location: currentProfile.location || "",
        job: currentProfile.job || "",
        status: currentProfile.status || "",
        facebook: currentProfile.social.facebook || "",
        instagram: currentProfile.social.instagram || "",
        linkedin: currentProfile.social.linkedin || "",
        youtube: currentProfile.social.youtube || ""
      });
    }
  }, [user, currentProfile]);

  const [formData, setFormData] = useState({
    avatar: "",
    location: "",
    job: "",
    status: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  });

  const [socialLinks, toggleSocialLinks] = useState(false);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (currentProfile === null) {
    return <Redirect to="/" />;
  }

  const {
    avatar,
    location,
    job,
    status,
    facebook,
    instagram,
    linkedin,
    youtube
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    editProfile(formData);

    setAlert("Profile Edited", "success");

    e.preventDefault();
  };

  return (
    <Fragment>
      <section id="create-profile">
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="avatar"
                className="form-input"
                placeholder="Avatar URL"
                value={avatar}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <span className="text-danger">*</span>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="Location"
                value={location}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <span className="text-danger">*</span>
              <input
                type="text"
                name="job"
                className="form-input"
                placeholder="Job"
                value={job}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <span className="text-danger">*</span>
              <input
                type="text"
                name="status"
                className="form-input"
                placeholder="Status"
                value={status}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <p className="text-sm">You have to specify full url</p>
            </div>

            <a
              href="#"
              onClick={() => toggleSocialLinks(!socialLinks)}
              className="btn text-primary"
            >
              Show Social Links
            </a>
            {socialLinks && (
              <Fragment>
                <div className="social-links">
                  <div className="form-group">
                    <i className="text-primary fab fa-facebook fb fa-2x"></i>
                    <input
                      type="text"
                      name="facebook"
                      className="form-input"
                      value={facebook}
                      onChange={onChange}
                      placeholder="Facebook URL"
                    />
                  </div>

                  <div className="form-group">
                    <i className="text-primary fab fa-instagram  instagram fa-2x"></i>
                    <input
                      type="text"
                      name="instagram"
                      className="form-input"
                      value={instagram}
                      onChange={onChange}
                      placeholder="Instagram URL"
                    />
                  </div>

                  <div className="form-group">
                    <i className="text-primary fab fa-linkedin linkedin fa-2x"></i>
                    <input
                      type="text"
                      name="linkedin"
                      value={linkedin}
                      onChange={onChange}
                      className="form-input"
                      placeholder="Linkedin URL"
                    />
                  </div>

                  <div className="form-group">
                    <i className="text-primary fab fa-youtube yt fa-2x"></i>
                    <input
                      type="text"
                      name="youtube"
                      value={youtube}
                      onChange={onChange}
                      className="form-input"
                      placeholder="Youtube URL"
                    />
                  </div>
                </div>
              </Fragment>
            )}

            <div className="form-group">
              <input type="submit" className="btn mt-2" value="Edit Profile" />
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

EditProfile.propTypes = {
  currentProfile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentProfile: state.profiles.currentProfile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  editProfile,
  setAlert,
  getCurrentProfile
})(EditProfile);
