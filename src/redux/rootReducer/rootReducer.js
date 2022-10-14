import { combineReducers } from "redux";
import { signInReducer } from "../reducer/userSignIn";

export const rootReducer = combineReducers({
    userSignInDetail : signInReducer
})