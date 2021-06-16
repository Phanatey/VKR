import {
    AUTHENTICATED, SIGNOUT_SUCCESS,
} from '../constants/Auth';

const initState = {
    isAuthenticated: false,
};

const auth = (state = initState, action) =>  {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
            };
        case SIGNOUT_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
            }
        }
    }
    return state;
};
export default auth;