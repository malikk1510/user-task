import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../contexts/authContext'

//Navbar component
function Navbar() {
    const { state, dispatch } = useContext(AuthContext)
    
    // logout 
    const logout = async () => {

        try {
            const response = await Axios.get("http://localhost:4000/signout");
            console.log(response.data);
            dispatch({
                type: "LOGOUT"
            })
        } 
        catch (err) {
            console.log(err);
        }

    };

    return (
        <>
            <header>
                <nav className='nav-wrapper indigo'>
                    <div className='container'>
                        {state.isAuthenticated ? <span className='brand-logo' style={{ textTransform: 'uppercase' }}>{state.user.name}</span> : <Link className='brand-logo'>User Task</Link>}
                        <Link className='sidenav-trigger' data-target='mobile-menu'>
                            <i className='material-icons'>menu</i>
                        </Link>
                        <ul className='right hide-on-med-and-down'>
                            {state.isAuthenticated ? <>
                                {/* <li><span className="btn  " style={{marginRight:'5px'}}>{state.user.name}</span></li> */}
                                <li> <button className="btn waves-effect hoverable indigo waves-light" onClick={logout} name="action"> Logout</button></li>

                            </> : <>
                                    <li> <NavLink exact to='/signin'> SignIn</NavLink></li>
                                    <li>  <NavLink exact to='/signup'> SignUp</NavLink></li>
                                </>}
                        </ul>

                    </div>
                </nav>
                <ul className='sidenav ' id='mobile-menu'>
                    {state.isAuthenticated ? <>
                        <li> <button class="btn waves-effect waves-light" onClick={logout} name="action"> Logout</button></li>
                    </> : <>
                            <li> <NavLink to='/signin'> SignIn</NavLink></li>
                            <li>  <NavLink to='/signup'> SignUp</NavLink></li>
                        </>}
                </ul>
            </header>
        </>
    );
};

export default Navbar