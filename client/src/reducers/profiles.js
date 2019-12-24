import {
  GET_PROFILE,
  GET_PROFILES,
  ADD_PROFILE,
  PROFILE_ERROR
} from "../actions/types";

const initialState = {
  profiles: null,
  profile: null,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload
      };

    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload
      };

    default:
      return state;
  }
}
