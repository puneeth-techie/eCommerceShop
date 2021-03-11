import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  userInfo: null,
};

const userAuthSlice = createSlice({
  name: "authDetail",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    userLoginRequestSuccess: (state, action) => {
      return {
        loading: false,
        userInfo: action.payload,
      };
    },
    userLoginRequestFailure: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    userRegisterRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    userRegisterRequestSuccess: (state, action) => {
      return {
        loading: false,
        userInfo: action.payload,
      };
    },
    userRegisterRequestFailure: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    userLogout: (state, action) => {
      return {};
    },
  },
});

const { actions } = userAuthSlice;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actions.userLoginRequest.toString(),
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: actions.userLoginRequestSuccess.toString(),
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: actions.userLoginRequestFailure.toString(),
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: actions.userLogout.toString(),
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actions.userRegisterRequest.toString(),
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: actions.userRegisterRequestSuccess.toString(),
      payload: data,
    });

    dispatch({
      type: actions.userLoginRequestSuccess.toString(),
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: actions.userRegisterRequestFailure.toString(),
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};
export default userAuthSlice.reducer;
