import {
  GET_PROFILE,
  GET_PROFILES,
  ADD_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profiles: null,
  profile: null,
  currentProfile: null,
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

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload
      };

    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: payload
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: null
      };

    case ADD_PROFILE:
      return {
        ...state,

        currentProfile: payload
      };

    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        profile: null
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
