import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomePage from "./home/HomePage";
import MainPageContainer from "./main/MainPageContainer";

const App = ({ loggedIn, location }) => (
  <div>
    {loggedIn && <MainPageContainer path={location.pathname} />}
    {!loggedIn && <HomePage />}
  </div>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser),
});

export default withRouter(connect(mapStateToProps)(App));
