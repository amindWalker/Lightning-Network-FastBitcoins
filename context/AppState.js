import React, {useReducer} from 'react';

// Local imports
import DataContext from './dataContext';
import appReducer from './reducers/appReducer';
import {
  SET_EMAIL,
  SET_IS_AUTHENTICATED,
  SET_IS_LOADING,
  SET_KEY_SESSION,
  SET_TOAST_MESSAGE,
  SET_LOGOUT
} from './actions/appActions';

const AppState = ({children}) => {
  // Home initial state
  const initialState = {
    email: '',
    isAuthenticated: false,
    isLoading: false,
    keySession: '',
    toastMessage: ''
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Home actions
  const setEmail = email => {
    dispatch({
      type: SET_EMAIL,
      payload: email
    });
  };

  const setIsAuthenticated = isAuthenticated => {
    dispatch({
      type: SET_IS_AUTHENTICATED,
      payload: isAuthenticated
    });
  };

  const setIsLoading = isLoading => {
    dispatch({
      type: SET_IS_LOADING,
      payload: isLoading
    });
  };

  const setKeySession = keySession => {
    dispatch({
      type: SET_KEY_SESSION,
      payload: keySession
    });
  };

  const setToastMessage = toastMessage => {
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: toastMessage
    });
  };

  // Dashboard actions
  const logout = session => {
    dispatch({
      type: SET_LOGOUT,
      payload: session
    });
  };

  return (
    <DataContext.Provider
      value={{
        email: state.email,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        keySession: state.keySession,
        toastMessage: state.toastMessage,
        setEmail,
        setIsAuthenticated,
        setIsLoading,
        setKeySession,
        setToastMessage,
        logout
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default AppState;
