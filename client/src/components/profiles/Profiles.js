import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profiles";
import ProfileItem from "./ProfileItem";
import { Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";

const Profiles = ({
  profiles,
  getProfiles,
  auth: { user, loading, isAuthenticated }
}) => {
  useEffect(() => {
    if (user !== null) {
      getProfiles();
    }
  }, [getProfiles, user]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <section id="profiles">
        <div className="container ">
          <div className="profiles">
            {profiles === null || loading ? (
              <Spinner />
            ) : (
              <Fragment>
                <h1 className="text-center text-lg text-white mb-2">
                  All profiles
                </h1>
                {profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles.profiles,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
