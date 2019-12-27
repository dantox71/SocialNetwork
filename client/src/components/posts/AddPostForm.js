import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";
import { connect } from "react-redux";
import { editPost } from "../../actions/posts";

const AddPostForm = ({ addPost, editPost, posts: { current } }) => {
  useEffect(() => {
    if (current) {
      setText(current.text);
    }
  }, [current]);

  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    if (current) {
      //Edit post
      editPost(text, current.id);
    } else {
      addPost(text);
    }

    setText("");

    e.preventDefault();
  };

  return (
    <form class="add-post" onSubmit={onSubmit}>
      <h3 class="text-primary">{current ? "Edit Post" : "Add Post"}</h3>
      <textarea
        name="addpost"
        rows="5"
        name="text"
        value={text}
        onChange={onChange}
      >
        {" "}
      </textarea>

      <input
        type="submit"
        value={current ? "Edit Post" : "Add Post"}
        class="btn  mt-1"
      />
    </form>
  );
};

AddPostForm.propTypes = {
  posts: PropTypes.array.isRequired,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { addPost, editPost })(AddPostForm);
