import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { constants } from "../config"
import { loginn } from "../data/reducers/AuthReducer"
import { signInAPI } from '../data/services/AuthServices';
import Loader from "../component/Loader"
import {errorToast,successToast} from "../data/toast/Toasts";

//signin component
function SignIn(props) {

	const dispatch = useDispatch();
	const [user, setUser] = useState({
		email: '',
		password: ''
	})
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


	//sending login request
	const Login = async () => {
		setLoader(true);
		//axios request
		try {
			const response = await signInAPI(user);
			
			if (response.isSuccessful) {			
				//local storage
				localStorage.setItem(constants.KEY_USER, JSON.stringify(response.data.user));
				localStorage.setItem(constants.KEY_AUTH_TOKEN, JSON.stringify(response.data.token));

      	dispatch(loginn(response.data));
				setLoader(false);
				successToast('Signed in successfull !')
			}
			else {
				setLoader(false)
				errorToast(response.message)
			}
		}
		catch (err) { }
	};


	return (
		<>

			<>
				<div className="row signin" >
					{loader ? <Loader /> : ""}
					<div className=' col s12 m6 ' style={{ margin: "5px 0" }}>
						<h4 className='center grey darken-3' style={{ padding: '10px 20px', color: 'white' }}>USER TASK </h4>
					</div>
					<div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
						<input id="email" type="email" className="validate" onChange={ inputEvent} name="email" value={user.email} />
						<label htmlFor="email">Email</label>
					</div>
					<div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
						<input id="password" type="password" className="validate" onChange={ inputEvent} name="password" value={user.password} />
						<label htmlFor="password">Password</label>
					</div>
					<div className="input-field col s12 m6" style={{ margin: "5px 0" }}>
						<button className="btn indigo waves-effect waves-light" name="action" onClick={()=>{Login()}}>Log in
                    </button>
					</div>
				</div>
			</>

		</>
	)
}

export default SignIn;
