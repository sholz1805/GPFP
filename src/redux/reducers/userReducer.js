import { LOGOUT } from '../actions/userActions';

const initialState = {
    user: null,
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state,
                user: null, 
            
            };
        
        default:
            return state;
    }
};

export default userReducer;