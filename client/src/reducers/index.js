import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import profiles from "./profiles";
import posts from "./posts";

const rootReducer = combineReducers({
  auth,
  alert,
  profiles,
  posts
});

export default rootReducer;
