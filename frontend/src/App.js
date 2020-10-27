import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from "./pages/home"
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Auth from './pages/AuthHome';
import Navbar from './pages/Navbar';
import { AuthContext } from "./contexts/authContext"

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
      history.push('/auth');
    } else {
      history.push('/')
    }
  }, [])
 
  return (
    <>
      <Navbar />
      <Switch>
        {state.isAuthenticated ? history.push('/auth'):history.push('/')}
        <Route exact path='/'><Home /></Route>
        <Route exact path='/auth'><Auth /></Route>
        <Route path='/signup'><SignUp /></Route>
        <Route path='/signin'><SignIn /></Route>
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
  // const changeLogin =(newcontext)=>{
  //   console.log('newcontext: ', newcontext);
  //   setAuth({...auth,newcontext})
  // }

  // const [auth,setAuth] = useState({
  //   loggedIn:false,
  //   token:undefined,
  //   changeLogin
  // })
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
