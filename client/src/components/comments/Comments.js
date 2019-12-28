import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";
import { connect } from "react-redux";

const Comments = ({
  comments,
  post_id,
  auth: { isAuthenticated },
  profile: { currentProfile }
}) => {
  console.log(comments.length);
  return (
    <Fragment>
      <div class="comments">
        {isAuthenticated && currentProfile && (
          <AddCommentForm post_id={post_id} />
        )}

        {comments.length > 0 &&
          comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              post_id={post_id}
            />
          ))}
      </div>
    </Fragment>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profiles
});

export default connect(mapStateToProps, {})(Comments);
