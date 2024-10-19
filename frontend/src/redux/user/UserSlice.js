import { createSlice } from "@reduxjs/toolkit";

const storage = sessionStorage.getItem("state");

console.log(storage);
const initialState = storage
  ? JSON.parse(storage).user
  : {
      loggedIn: false,
      user: {
        userId: "some_id",
        fullName: "One",
        username: "userone",
        profileUrl: "default_user_icon.jpg",
      },
      token: "",
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      return {
        ...state,
        loggedIn: true,
        user,
        token: `Bearer ${token}`,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: {},
        token: "",
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;
