import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { constants } from "../../config"
import { checkTokenAPI } from "../services/AuthServices";

export const checkToken = createAsyncThunk(
    'check/token',
    async (payload, thunkAPI) => {
      const response =await checkTokenAPI(payload);
      return response
    }
  )

//creating authentication slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth:{
            isAuthenticated: false,
            user: null,
            token: null  
        }         
    },
    
    reducers: {
        //action creators
        loginn: (state, action) => {
            state.auth={
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
           
        },
        logoutt: (state, action) => {
            state.auth={
                isAuthenticated: false,
                user: null,
                token: null
            }
        },
        refresh:(state,action)=>{
            state.auth={
                isAuthenticated: true,
                user: JSON.parse(localStorage.getItem(constants.KEY_USER)),
                token: JSON.parse(localStorage.getItem(constants.KEY_AUTH_TOKEN))
            }
        },
        
    },
    extraReducers:{
        [checkToken.fulfilled]:(state,action)=>{
            console.log('action: ', action);    
        }
    }
});


export const { loginn, logoutt, refresh } = authSlice.actions;
export default authSlice.reducer;

