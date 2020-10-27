import React, { useState } from 'react';
// import { NavLink } from "react-router-dom"
import axios from 'axios'

//signup component
function SignUp() {
    const [user, setUser] = useState({
        name: '',
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

    //sending signup request
    const signup = async () => {
        //axios request
      try {
        const response =await axios.post("http://localhost:4000/signup",user);
        console.log(response.data);
      } catch (error) {
          console.log(error);
      }
    };

    return (
        <>
            <div className="row signup" >
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
                    <button className="btn indigo waves-effect waves-light" name="action" onClick={signup}>SignUp
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUp;
