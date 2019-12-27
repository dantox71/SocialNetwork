import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  CLEAR_ERRORS
} from "./types";
import { setAlert } from "./alert";

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR
    });
  }
};

export const likePost = post_id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);

    dispatch({
      type: LIKE_POST,
      payload: {
        post_id,
        newPost: res.data
      }
    });
  } catch (err) {
    let errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

export const unlikePost = post_id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);

    dispatch({
      type: UNLIKE_POST,
      payload: {
        post_id,
        newPost: res.data
      }
    });
  } catch (err) {
    let errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

export const addPost = text => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.post("/api/posts", body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

export const removePost = post_id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/api/posts/${post_id}`);

      dispatch({
        type: REMOVE_POST,
        payload: post_id
      });
    }
    // setAlert("Post Deleted", "success");
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

export const editPost = (text, post_id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.put(`/api/posts/${post_id}`, body, config);

    dispatch({
      type: EDIT_POST,
      payload: {
        newPost: res.data,
        post_id
      }
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: POST_ERROR,
      payload: errors
    });
  }
};

export const setCurrent = postData => dispatch => {
  dispatch({
    type: SET_CURRENT,
    payload: postData
  });
};

export const clearCurrent = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT
  });
};
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
