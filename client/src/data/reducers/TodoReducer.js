import { createSlice } from "@reduxjs/toolkit";

//creating todo slice
const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo:{
            title: '',
            body: '',
            dueDate: '',
        },
    },
    
    reducers: {
         //action creators
        changeTitle: (state, action) => {
            state.todo={
                title:action.payload,
                body:state.todo.body,
                dueDate:state.todo.dueDate
            }
        },
        changeBody: (state, action) => {
            state.todo={
                title:state.todo.title,
                body:action.payload,
                dueDate:state.todo.dueDate
            }
        },
        changeDueDate: (state, action) => {
            state.todo={
                title:state.todo.title,
                body:state.todo.body,
                dueDate:action.payload
            }
        },
    }

});


export const { changeTitle,changeBody,changeDueDate } = todoSlice.actions;
export default todoSlice.reducer ;

