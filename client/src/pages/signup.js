import React, { useState } from 'react';
import { signUpAPI} from '../data/services/AuthServices';
import { loginn } from "../data/reducers/AuthReducer";
import { useDispatch } from "react-redux"
import {errorToast,successToast} from "../data/toast/Toasts";
import { constants } from "../config"
import Loader from '../component/Loader';

//signup component
function SignUp() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loader, setLoader] = useState(false);

    //inputs onchange event
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    };

    //sending signup request
    const signup = async () => {
        setLoader(true);
        //axios request
        try {
            const response = await signUpAPI(user);
            if (response.isSuccessful) {   
                //local storage
				localStorage.setItem(constants.KEY_USER, JSON.stringify(response.data.user));
                localStorage.setItem(constants.KEY_AUTH_TOKEN, JSON.stringify(response.data.token));

                dispatch(loginn(response.data));
                setLoader(false);           
                successToast('Signup successfull!');
               
            } else {
                setLoader(false);
                errorToast(response.message)
            }
        }
        catch (error) {}
    };

    return (
        <>
            <div className="row signup" >
            {loader ? <Loader /> : ""}
                <div className=' col s12 m6 ' style={{ margin: "5px 0" }}>
                    <h4 className='center grey darken-3' style={{ padding: '10px 20px', color: 'white' }}>USER TASK </h4>
                </div>
                {/* input  start */}
                <div className='input-field col s12 m6 ' style={{ margin: "5px 0" }}>
                    <input id="first_name" type="text" className="validate" onChange={inputEvent} name="name" value={user.name} />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
                    <input id="email" type="email" className="validate" onChange={inputEvent} name="email" value={user.email} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
                    <input id="password" type="password" className="validate" onChange={inputEvent} name="password" value={user.password} />
                    <label htmlFor="password">Password</label>
                </div>
                {/* input  end */}
                <div className=" col s12 m6" style={{ margin: "5px 0" }}>
                    <button className="btn indigo waves-effect waves-light" name="action" onClick={()=>{signup()}}>SignUp
                    </button>
                </div>
            </div>

        </>
    )
}

export default SignUp;
