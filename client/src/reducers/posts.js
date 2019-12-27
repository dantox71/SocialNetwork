import {
  GET_POSTS,
  POST_ERROR,
  CLEAR_ERRORS,
  ADD_POST,
  REMOVE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  EDIT_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  EDIT_COMMENT,
  REMOVE_COMMENT
} from "../actions/types";

const initialState = {
  posts: [],
  current: null,
  loading: true,
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };

    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id ? payload.newPost : post
        )
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
      };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id ? payload.newPost : post
        )
      };

    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id ? payload.newPost : post
        )
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      };

    case POST_ERROR:
      return {
        ...state,
        errors: payload
      };

    default:
      return state;
  }
}
