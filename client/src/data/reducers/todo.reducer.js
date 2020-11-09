import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../../config"

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
        taskForm:{
            title: '',
            body: '',
            dueDate: '',
        },
    },
    
    reducers: {

        loginn: (state, action) => {
            localStorage.setItem(constants.KEY_USER, JSON.stringify(action.payload.user));
            localStorage.setItem(constants.KEY_AUTH_TOKEN, JSON.stringify(action.payload.token));

            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token

        },
        logoutt: (state, action) => {
            localStorage.clear();
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        refresh:(state,action)=>{
            state.isAuthenticated = true;
            state.user = JSON.parse(localStorage.getItem(constants.KEY_USER));
            state.token = JSON.parse(localStorage.getItem(constants.KEY_AUTH_TOKEN));
        },
        changeTitle: (state, action) => {
            // console.log(action);
            state.taskForm={
                title:action.payload,
                body:state.taskForm.body,
                dueDate:state.taskForm.dueDate
            }
        },
        changeBody: (state, action) => {
            // console.log(action);
            state.taskForm={
                title:state.taskForm.title,
                body:action.payload,
                dueDate:state.taskForm.dueDate
            }
        },
        changeDueDate: (state, action) => {
            // console.log(action);
            state.taskForm={
                title:state.taskForm.title,
                body:state.taskForm.body,
                dueDate:action.payload
            }
        },
    }

});


export const { loginn, logoutt, refresh,changeTitle,changeBody,changeDueDate } = todoSlice.actions;
export default todoSlice.reducer ;

