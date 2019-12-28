import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import "./App.css";
import setAuthToken from "./utilis/setAuthToken";
import { loadUser } from "./actions/auth";
import Alerts from "./components/layout/Alerts";
//Layout
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profiles/Profile";
import Profiles from "./components/profiles/Profiles";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Posts from "./components/posts/Posts";

if (localStorage.token) {
  setAuthToken();
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/profile/:id" component={Profile}></Route>
            <Route exact path="/profiles" component={Profiles}></Route>
            <Route exact path="/posts" component={Posts}></Route>
            <Route
              exact
              path="/create-profile"
              component={CreateProfile}
            ></Route>
            <Route exact path="/edit-profile" component={EditProfile}></Route>
          </Switch>
        </Fragment>
        <Alerts />
      </Router>
    </Provider>
  );
};

export default App;
