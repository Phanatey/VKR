import {
    SIGNIN,
    AUTHENTICATED,
    SIGNOUT,
    SIGNUP, SIGNOUT_SUCCESS, USER_DATA_LOADED,
} from '../constants/Auth';

export const signIn = (user) => {
    return {
        type: SIGNIN,
        payload: user
    }
};
export const signOut = (user) => {
    return {
        type: SIGNIN,
        payload: user
    }
};

export const authenticated = (isAuthenticated) => {
    return {
        type: AUTHENTICATED,
        isAuthenticated
    }
};