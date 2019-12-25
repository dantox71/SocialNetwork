import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  return (
    <div class="profile">
      <Fragment>
        <div class="profile-top">
          <img class="profile-img" src={profile.avatar} alt="User's avatar" />
          <Link class="text-center" to={`/profile/${profile._id}`}>
            Visit profile
          </Link>
        </div>

        <div class="profile-info">
          <a href="profile.html">
            <Link to={`/profile/${profile._id}`}>
              {" "}
              <h2>{profile.user.name}</h2>
            </Link>
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
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
