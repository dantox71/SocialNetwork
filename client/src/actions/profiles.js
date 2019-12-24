import axios from "axios";
import { GET_PROFILE, GET_PROFILES, ADD_PROFILE, PROFILE_ERROR } from "./types";

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/me");

    console.log(res.data);

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
