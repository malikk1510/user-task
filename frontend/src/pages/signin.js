import React, { useContext, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../contexts/authContext';

//signin component
function SignIn(props) {
    //  const [error, setError] = useState('')
    const { dispatch } = useContext(AuthContext)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

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


    //sending login request
    const login = async () => {
        //axios request
        try {
            const response = await axios.post("http://localhost:4000/signin", user);
            console.log(response);
            dispatch({
                type: "LOGIN",
                payload: response.data
            })
        } catch (err) {
            console.log(err);
            //   setError(err) 
        }
    };


    return (
        <>
            <div className="row signin" >
                <div className=' col s12 m6 ' style={{ margin: "5px 0" }}>
                    <h4 className='center grey darken-3' style={{ padding: '10px 20px', color: 'white' }}>USER TASK </h4>
                </div>

                <div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
                    <input id="email" type="email" class="validate" onChange={inputEvent} name="email" value={user.email} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
                    <input id="password" type="password" className="validate" onChange={inputEvent} name="password" value={user.password} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
                    <button className="btn indigo waves-effect waves-light" name="action" onClick={login}>Log in
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignIn;
