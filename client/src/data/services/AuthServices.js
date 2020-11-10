import { constants } from "../../config";
import { api, getAuthHeaders, get, post, update, del } from "./CommonServices";

//checkTokenAPI
export const checkTokenAPI =  (token)=>{
    let tokenValid = token
    if(tokenValid===undefined || tokenValid===null){
     return{
         loggedIn:false
     }
    }
    else{
        return{
            loggedIn:true,
            user : JSON.parse(localStorage.getItem(constants.KEY_USER))
        }
    }
};

//signin
export const signInAPI = async (userData) => {
  let url = `${api}/api/home/signin`;
  return await post(url, userData)
};

//signup
export const signUpAPI = async (userData) => {
  let url = `${api}/api/home/signup`;
  return await post(url, userData)
};

//signout
export const signOutAPI = async () => {
    let url = `${api}/api/auth/signout`;
    let authHeader = getAuthHeaders();
    return await get(url, authHeader)
  };