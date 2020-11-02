import React, { useContext,useState } from 'react';
import { NavLink} from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../contexts/authContext'
import {ToastContainer, toast, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//Navbar component
function Navbar() {
    const { state, dispatch } = useContext(AuthContext)
    const [loader, setLoader] = useState(false);
    
    // logout 
    const logout = async () => {

        try {
            const response = await Axios.get("http://localhost:4000/api/auth/signout");
            setLoader(true);
            toast.success('Logout successfull!')
            dispatch({
                type: "LOGOUT"
            })
        } 
        catch (err) {
            setLoader(true);
            toast.error(`${err.response.data.message}`)
            
        }

    };

    return (
        <>
            <header>
            <ToastContainer position='top-center'  color="white" autoClose={1700} hideProgressBar pauseOnHover={false} transition={Slide} newestOnTop pauseOnFocusLoss={false} />
                <nav className='nav-wrapper indigo'>
                    <div className='container'>
                        {state.isAuthenticated ? <span  style={{ fontWeight:'bold' }}>Hii {state.user.name}, welcome to the app.</span> : <NavLink to='/api/home'><span className='brand-logo'>User Task</span></NavLink>}
                        <a href className='sidenav-trigger' data-target='mobile-menu'>
                            <i className='material-icons' style={{cursor:'pointer'}}>menu</i>
                        </a>
                        <ul className='right hide-on-med-and-down'>
                            {state.isAuthenticated ? <>
                                <li> <button className="btn waves-effect hoverable indigo waves-light" onClick={logout} name="action"> Logout</button></li>

                            </> : <>
                                    <li> <NavLink exact to='/api/home/signin' > SignIn</NavLink></li>
                                    <li>  <NavLink exact to='/api/home/signup' > SignUp</NavLink></li>
                                </>}
                        </ul>

                    </div>
                </nav>
                
                <ul className='sidenav ' id='mobile-menu'>
                    {state.isAuthenticated ? <> 
                        <li> <button className="btn waves-effect waves-light sidenav-close" style={{margin:'21px'}} onClick={logout} name="action"> Logout</button></li>
                    </> : <>
                           
                            <li> <NavLink to='/api/home/signin'><button className="btn waves-effect waves-light sidenav-close" style={{margin:'21px 0 0 0 '}}  name="action"> SignIn</button></NavLink></li>
                            <li>  <NavLink to='/api/home/signup'> <button className="btn waves-effect waves-light sidenav-close" style={{margin:'21px 0 0 0 '}}  name="action"> SignUp</button></NavLink></li>
                        </>}
                </ul>
            </header>
        </>
    );
};

export default Navbar