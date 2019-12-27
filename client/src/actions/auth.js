import axios from "axios";
import {
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  CLEAR_CURRENT_PROFILE,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utilis/setAuthToken";
import { setAlert } from "./alert";
import { store } from "../store";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL
    });
  }
};

export const register = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data //Token
    });

    dispatch(setAlert("Account created", "success"));

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.errors
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data //Token
    });

    dispatch(setAlert("Logged", "success"));

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.errors
    });
  }
};

export const logout = () => dispatch => {
  dispatch(setAlert("Logged out", "success"));

  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
