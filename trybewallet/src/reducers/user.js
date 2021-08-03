import { SET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_USER:
    return {
      email: action.payload.email,
      password: action.payload.password,
    };
  default:
    return state;
  }
}

export default userReducer;
