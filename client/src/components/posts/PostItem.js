import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import Comments from "../comments/Comments";
import {
  likePost,
  unlikePost,
  removePost,
  setCurrent,
  clearCurrent
} from "../../actions/posts";
import { setAlert } from "../../actions/alert";

const PostItem = ({
  post,
  auth: { user, isAuthenticated },
  likePost,
  unlikePost,
  removePost,
  setCurrent,
  clearCurrent,
  setAlert
}) => {
  return (
    <Fragment>
      <div class="post">
        <div class="post-top">
          <div class="d-flex-column">
            <img src={post.avatar} alt="Post's user's avatar" />

            {user !== null && user._id === post.user && (
              <div class="post-menu mt-1">
                <a href="#">
                  <i
                    class="fa fa-edit mr-1"
                    onClick={() =>
                      setCurrent({
                        text: post.text,
                        id: post._id
                      })
                    }
                  ></i>
                </a>
                <a
                  href="#delete-post"
                  onClick={() => {
                    removePost(post._id);
                    clearCurrent();
                  }}
                >
                  <i class="fa fa-times text-danger"></i>
                </a>
              </div>
            )}
          </div>

          <div class="post-info">
            <a href="profile.html" class="author text-primary">
              Posted by <span class="text-bold"> {post.name}</span>
            </a>
            <p class="date text-gray text-sm">
              on{" "}
              <span class="text-bold">
                <Moment date={post.date} />
              </span>
            </p>
          </div>
        </div>
        <div class="post-bottom">
          <p class="post-text">{post.text}</p>
          <p class="text-sm mt-2 text-primary">
            This post have <span class="text-bold">{post.likes.length}</span>{" "}
            likes and <span class="text-bold">{post.comments.length} </span>{" "}
            comments
          </p>
          <div class="post-options">
            <a href="#!">
              {user !== null &&
              post.likes.filter(like => like.user == user._id).length > 0 ? (
                <i
                  className="fa fa-thumbs-up"
                  onClick={() =>
                    !isAuthenticated
                      ? setAlert("Log in first!", "danger")
                      : unlikePost(post._id)
                  }
                  style={{ color: "blue" }}
                ></i>
              ) : (
                <i
                  className="fa fa-thumbs-up"
                  onClick={() =>
                    !isAuthenticated
                      ? setAlert("Login first!", "danger")
                      : likePost(post._id)
                  }
                  style={{ color: "red" }}
                ></i>
              )}
            </a>
            <a href="#COMMENT">
              {" "}
              <i class="fa fa-comment"></i>Comment{" "}
            </a>
          </div>
        </div>

        <Comments comments={post.comments} post_id={post._id} />
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  removePost,
  setCurrent,
  clearCurrent,
  setAlert
})(PostItem);
