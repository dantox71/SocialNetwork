import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  ADD_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from "./types";

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: "Profile error"
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
};
