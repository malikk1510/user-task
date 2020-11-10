import React, {useState } from 'react';
import { NavLink} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {ToastContainer, toast, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {logoutt} from "../data/reducers/AuthReducer"
import {signOutAPI } from '../data/services/AuthServices';
import Loader from "../component/Loader"
import {errorToast,successToast} from "../data/toast/Toasts";

//Navbar component
function Navbar() {

    const auth = useSelector(state => state.authReducer).auth;
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    
    // logout 
    const logout = async () => {
        localStorage.clear();
        try {
          const response = await signOutAPI();
          setLoader(true);
           if (response.isSuccessful) {
            setLoader(false);
            successToast('Logout successfull!')
            dispatch(logoutt());
           } else {
            setLoader(false);
            errorToast(response.message)
           }
        } 
        catch (err) {}
    };

    return (
        <>
            <header>
            {loader?<Loader/>:""}
            <ToastContainer position='top-center'  color="white" autoClose={1700} hideProgressBar pauseOnHover={false} transition={Slide} newestOnTop pauseOnFocusLoss={false} />
                <nav className='nav-wrapper indigo'>
                    <div className='container'>
                        {auth.isAuthenticated ? <span  style={{ fontWeight:'bold' }}>Hii {auth.user.name}, welcome to the app.</span> : <NavLink to='/api/home'><span className='brand-logo'>User Task</span></NavLink>}
                        <a href="true" className='sidenav-trigger' data-target='mobile-menu'>
                            <i className='material-icons' style={{cursor:'pointer'}}>menu</i>
                        </a>
                        <ul className='right hide-on-med-and-down'>
                            {auth.isAuthenticated ? <>
                                <li> <button className="btn waves-effect hoverable indigo waves-light" onClick={()=>{logout()}} name="action"> Logout</button></li>

                            </> : <>
                                    <li> <NavLink exact to='/api/home/signin' > SignIn</NavLink></li>
                                    <li>  <NavLink exact to='/api/home/signup' > SignUp</NavLink></li>
                                </>}
                        </ul>

                    </div>
                </nav>
                
                <ul className='sidenav ' id='mobile-menu'>
                    {auth.isAuthenticated ? <> 
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