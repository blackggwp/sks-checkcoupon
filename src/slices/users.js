import { createSlice } from "@reduxjs/toolkit";
import config from "../config";
import { callAPI } from "../helpers";

export const initialState = {
  loading: false,
  hasErrors: false,
  userData: {},
  isLoggedIn: false,
  loginText: '',
  regisText: ''
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    postingData: (state) => {
      state.loading = true;
    },
    postRegisSuccess: (state, {payload}) => {
      state.loading = false;
      state.hasErrors = false;
      state.regisText = payload.status
      state.isLoggedIn = true
      state.userData = payload.username
      const userInfo = {
        username: payload.username,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('user_token', JSON.stringify(payload.user_token))
    },
    postRegisFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.regisText = 'Username has already!'
    },
    register: (state, { payload }) => {
      state.userItems.push(payload);
    },
    addItemToUser: (state, { payload }) => {
      state.userItems.push(payload);
    },
    loggingIn: (state) => {
      state.loading = true;
    },
    fetchLoginSuccess: (state, { payload }) => {
      state.loading = false
      state.hasErrors = false
      state.isLoggedIn = true
      state.userData = payload
      const userInfo = {
        username: payload.username,
      }
      console.log(JSON.stringify(userInfo))
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('user_token', JSON.stringify(payload.user_token))
    },
    fetchLoginFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    userPassMismatch: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.loginText = 'Username or Password mismatch!!.'
    },
    logout: (state) => {
      state.loading = false
      state.hasErrors = false
      state.isLoggedIn = false
      state.userData = {}
      state.loginText = ''
      state.regisText = ''
      localStorage.clear()
    },
  },
});

export const {
  postingData,
  postRegisSuccess,
  postRegisFailure,
  addItemToUser,
  loggingIn,
  fetchLoginSuccess,
  fetchLoginFailure,
  userPassMismatch,
  logout,
} = usersSlice.actions;
export const usersSelector = (state) => state.users;
export default usersSlice.reducer;

export function saveRegisterData(userData) {
  return async (dispatch) => {
    dispatch(postingData());

    const postData = JSON.stringify(userData);
    try {
      const response = await callAPI(`${config.apiUrl}posx/register`, postData);
      // if (response.rowCount !== undefined && response.rowCount === 1)
      console.log(response)
      response?
        dispatch(postRegisSuccess(response)):
        dispatch(postRegisFailure())
    } catch (error) {
      console.log("postRegister Error ", error);
      dispatch(postRegisFailure());
    }
  };
}

export function fetchLogin(userData) {
  return async (dispatch) => {
    dispatch(loggingIn());

    userData.systemdate = new Date(Date.now()).toISOString();
    const userinfo = JSON.stringify(userData);
    try {
      const response = await callAPI(`${config.apiUrl}posx/login`, userinfo)
      response ? 
      dispatch(fetchLoginSuccess(response)) :
      dispatch(userPassMismatch());
    } catch (error) {
      console.log("fetchLogin Error ", error);
      dispatch(fetchLoginFailure());
    }
  };
}