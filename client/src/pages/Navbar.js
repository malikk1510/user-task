import React, {useState } from 'react';
import { NavLink} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {ToastContainer, toast, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {logoutt} from "../data/reducers/todo.reducer"
import {signOutAPI } from '../data/services/todo.service';
import Loader from "../component/Loader"

//Navbar component
function Navbar() {

    const todoList = useSelector(state => state.todoReducer);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    
    // logout 
    const logout = async () => {

        try {
          const response = await signOutAPI();
          setLoader(true);
           if (response.isSuccessful) {
            setLoader(false);
            toast.success('Logout successfull!')
            dispatch(logoutt());
           } else {
            setLoader(false);
            toast.error(response.message)
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
                        {todoList.isAuthenticated ? <span  style={{ fontWeight:'bold' }}>Hii {todoList.user.name}, welcome to the app.</span> : <NavLink to='/api/home'><span className='brand-logo'>User Task</span></NavLink>}
                        <a href className='sidenav-trigger' data-target='mobile-menu'>
                            <i className='material-icons' style={{cursor:'pointer'}}>menu</i>
                        </a>
                        <ul className='right hide-on-med-and-down'>
                            {todoList.isAuthenticated ? <>
                                <li> <button className="btn waves-effect hoverable indigo waves-light" onClick={logout} name="action"> Logout</button></li>

                            </> : <>
                                    <li> <NavLink exact to='/api/home/signin' > SignIn</NavLink></li>
                                    <li>  <NavLink exact to='/api/home/signup' > SignUp</NavLink></li>
                                </>}
                        </ul>

                    </div>
                </nav>
                
                <ul className='sidenav ' id='mobile-menu'>
                    {todoList.isAuthenticated ? <> 
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