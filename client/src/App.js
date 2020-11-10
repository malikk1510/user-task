import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from "./pages/home"
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Auth from './pages/AuthHome';
import Navbar from './pages/Navbar';
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux"
import { constants } from "./config"
import { refresh } from './data/reducers/AuthReducer';
import { checkToken } from "./data/reducers/AuthReducer"

//Appsell
function AppShell() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer).auth;
  const history = useHistory();

  useEffect(() => {
    dispatch(checkToken(localStorage.getItem(constants.KEY_AUTH_TOKEN),))
      .then((res) => {
        if (res.payload.loggedIn) {
          dispatch(refresh());
          history.push('/api/auth');
        } else {
          history.push('/api/home')
        }
      });
  }, [])

  return (
    <>
      <Navbar />
      <Switch>
        {auth.isAuthenticated ? history.push('/api/auth') : history.push('/api/home')}
        <Route exact path='/api/home'><Home /></Route>
        <Route exact path='/api/auth'><Auth /></Route>
        <Route exact path='/api/home/signup'><SignUp /></Route>
        <Route exact path='/api/home/signin'><SignIn /></Route>
        <Redirect to="/" />
      </Switch>
    </>
  )
}

//App component
function App() {
  useEffect(() => {

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, {});
    });
  }, [])

  return (
    <>
      <AppShell />
    </>
  )
};


export default App;
