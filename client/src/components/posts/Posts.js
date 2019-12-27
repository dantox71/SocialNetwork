import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import { setAlert } from "../../actions/alert";
import { clearErrors } from "../../actions/posts";
import AddPostForm from "./AddPostForm";

const Posts = ({
  getPosts,
  auth: { isAuthenticated },
  profile: { currentProfile },
  posts: { posts, loading, errors },
  clearErrors,
  setAlert
}) => {
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach(error => setAlert(error.msg, "danger"));
      clearErrors();
    }

    getPosts();
  }, [errors]);

  return (
    <Fragment>
      {isAuthenticated && currentProfile ? (
        <AddPostForm />
      ) : (
        <div className="card">
          <h1>
            {isAuthenticated ? (
              <Link to="/create-profile">
                Create Profile <i className="fa fa-user-plus"></i>
              </Link>
            ) : (
              <Fragment>
                <Link to="/register">
                  Create Account <i className="fa fa-sign-in-alt"></i>
                </Link>{" "}
              </Fragment>
            )}
          </h1>
        </div>
      )}

      <div className="container">
        {loading ? (
          <h1 class="text-black">Loading...</h1>
        ) : (
          posts && posts.map(post => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  profile: state.profiles
});

export default connect(mapStateToProps, { setAlert, getPosts, clearErrors })(
  Posts
);
