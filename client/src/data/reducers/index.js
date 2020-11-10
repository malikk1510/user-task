import { combineReducers } from "redux"
import todoReducer from "./TodoReducer";
import authReducer from "./AuthReducer"

const rootReducer = combineReducers({
    todoReducer,
    authReducer
})

export default rootReducer;
