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
import Profile from "./components/profile/Profile";

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
            <Route exact path="/profile" component={Profile}></Route>
          </Switch>
        </Fragment>
        <Alerts />
      </Router>
    </Provider>
  );
};

export default App;
