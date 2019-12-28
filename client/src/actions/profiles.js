import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  ADD_PROFILE,
  EDIT_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_CURRENT_PROFILE
} from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/me");

    dispatch({
      type: GET_CURRENT_PROFILE,
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
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const getProfileById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const createProfile = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/profiles", body, config);
    console.log(res.data);

    dispatch({
      type: ADD_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const editProfile = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/profiles", body, config);
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: PROFILE_ERROR,
      payload: errors
    });
  }
};

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
};
