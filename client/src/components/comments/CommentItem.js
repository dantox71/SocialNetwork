import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeComment, setCurrentComment } from "../../actions/posts";

const CommentItem = ({
  comment,
  auth: { user },
  post_id,
  removeComment,
  setCurrentComment
}) => {
  return (
    <Fragment>
      <div class="comment">
        <div class="comment-top">
          <div class="d-flex-column">
            <img src={comment.avatar} alt="Avatar of user" />

            {user !== null && user._id === comment.user && (
              <Fragment>
                <div class="comment-menu mt-1">
                  <a href="#edit-comment-form">
                    <i
                      class="fa fa-edit mr-1"
                      onClick={() =>
                        setCurrentComment(comment.text, comment._id)
                      }
                    ></i>
                  </a>
                  <a href="#delete-comment">
                    <i
                      class="fa fa-times text-danger"
                      onClick={() => removeComment(post_id, comment._id)}
                    ></i>
                  </a>
                </div>
              </Fragment>
            )}
          </div>

          <div class="comment-info">
            <a href="profile.html" class="author text-primary">
              Commented by <span class="text-bold">{comment.name}</span>
            </a>
            <p class="date text-gray text-sm">
              on{" "}
              <span class="text-bold">
                <Moment date={comment.date} />
              </span>
            </p>
          </div>
        </div>

        <div class="comment-bottom">
          <p class="comment-text">{comment.text}</p>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  setCurrentComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment, setCurrentComment })(
  CommentItem
);
