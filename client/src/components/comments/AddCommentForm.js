import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  commentPost,
  clearCurrentComment,
  editComment
} from "../../actions/posts";
import { setAlert } from "../../actions/alert";

const AddCommentForm = ({
  post_id,
  commentPost,
  editComment,
  setAlert,
  posts: { currentComment },
  clearCurrentComment
}) => {
  useEffect(() => {
    if (currentComment) {
      setText(currentComment.text);
    } else {
      setText("");
    }
  }, [currentComment]);

  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    if (currentComment) {
      //Edit
      editComment(text, post_id, currentComment.comment_id);
      clearCurrentComment();
    } else {
      commentPost(text, post_id);
    }

    setText("");

    e.preventDefault();
  };

  return (
    <Fragment>
      <form class="add-comment" onSubmit={onSubmit} id="add-comment-form">
        <h3 class="text-primary">
          {currentComment ? "Edit Comment" : "Add Comment"}
        </h3>
        <textarea
          name="text"
          rows="5"
          value={text}
          onChange={onChange}
        ></textarea>

        <input
          type="submit"
          value={currentComment ? "Edit comment" : "Add comment"}
          class="btn  mt-1"
        />
      </form>
    </Fragment>
  );
};

AddCommentForm.propTypes = {
  commentPost: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearCurrentComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  commentPost,
  editComment,
  setAlert,
  clearCurrentComment
})(AddCommentForm);
