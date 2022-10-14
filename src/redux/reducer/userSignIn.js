const SIGN_IN = "SIGN_IN";
const SIGN_IN_ERROR = "SIGN_IN_ERROR";

const initailstate = JSON.parse(localStorage.getItem("user")) || null;

export const signInReducer = (state = initailstate, action) => {
    switch(action.type){
        case SIGN_IN : return{
            isSignedIn : action.payload.status,
            user : action.payload.userDetail,
            error : null
        }

        case SIGN_IN_ERROR : return{
            isSignedIn : action.payload.status,
            user : null,
            error : action.payload.err
        }

        default : return state
    }
}

export function signInSuccess(signIn, data){
    return {
        type : SIGN_IN,
        payload : {status : signIn, userDetail : data}
    }
}

export function signInFailure(signIn, error){
    return {
        type : SIGN_IN_ERROR,
        payload : {status : signIn, err : error}
    }
}