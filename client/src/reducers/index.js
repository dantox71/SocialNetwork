import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import profiles from "./profiles";

const rootReducer = combineReducers({
  auth,
  alert,
  profiles
});

export default rootReducer;
