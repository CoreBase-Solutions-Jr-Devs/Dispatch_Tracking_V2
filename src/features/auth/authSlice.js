import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  expiresAt: null,
  user: null,
  userBranches: [],
  bcode: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.token;
      // state.expiresAt = action.payload.expiresAt;
      state.user = action.payload.user;
      state.userBranches = action.payload.user["userBranches"];
    },
    updateCredentials: (state, action) => {
      const { accessToken, expiresAt, user } = action.payload;

      if (accessToken !== undefined) state.accessToken = accessToken;
      // if (expiresAt !== undefined) state.expiresAt = expiresAt;
      if (user !== undefined) {
        state.user = state.user ? { ...state.user, ...user } : user;
      }
    },
    setActiveBcode: (state, action) => {
      state.bcode = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.user = null;
      state.userBranches = [];
      state.bcode = 0;
    },
  },
});

export const { setCredentials, updateCredentials, setActiveBcode, logout } =
  authSlice.actions;
export default authSlice.reducer;
