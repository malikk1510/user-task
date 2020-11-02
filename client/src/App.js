import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from "./pages/home"
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Auth from './pages/AuthHome';
import Navbar from './pages/Navbar';
import { AuthContext } from "./contexts/authContext"
import  "materialize-css/dist/css/materialize.min.css"
import M  from "materialize-css/dist/js/materialize.min.js"
import "react-toastify/dist/ReactToastify.css";

//Appsell
function AppShell() {
  const { state,dispatch } = useContext(AuthContext)
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({
        type: "REFRESH"
      })
      history.push('/api/auth');
    } else {
      history.push('/api/home')
    }
  }, [dispatch,history])
 
  return (
    <>
      <Navbar />
      <Switch>
        {state.isAuthenticated ? history.push('/api/auth'):history.push('/api/home')}
        <Route exact path='/api/home'><Home /></Route>
        <Route exact path='/api/auth'> <Auth /> </Route>
        <Route path='/api/home/signup'><SignUp /></Route>
        <Route path='/api/home/signin'><SignIn /></Route>
        <Redirect to="/" />
      </Switch>
    </>
  )
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    case "REFRESH":
      return {
        ...state,
        isAuthenticated: true,
        user:  JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token')),
      };
    default:
      return state;
  }
};

function App() {
  useEffect(()=>{
   document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});

      });
    
    
},[])
 
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <AuthContext.Provider value={{
        state,
        dispatch
      }}>
      
        <AppShell />
        
      </AuthContext.Provider>

    </>
  )
};



export default App;
