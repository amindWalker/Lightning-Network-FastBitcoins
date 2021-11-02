import * as KeyChain from 'react-native-keychain';

// Local imports
import {
  SET_EMAIL,
  SET_IS_AUTHENTICATED,
  SET_IS_LOADING,
  SET_KEY_SESSION,
  SET_TOAST_MESSAGE,
  SET_LOGOUT
} from '../actions/appActions';

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_KEY_SESSION:
      return {
        ...state,
        keySession: action.payload
      };
    case SET_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: action.payload
      };
    case SET_LOGOUT:
      KeyChain.resetGenericPassword();
      return {
        ...state,
        keySession: '',
        keyChainSession: false,
        isAuthenticated: false,
        isLoading: false,
        toastMessage: 'Logged out successfully',
        email: ''
      };
    default:
      return state;
  }
};

export default appReducer;
