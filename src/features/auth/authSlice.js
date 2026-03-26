import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        accessToken: null,
        expiresAt: null,
        user: null,
        userBranches: [],
        bcode: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading auth state from localStorage:", err);
    return {
      accessToken: null,
      expiresAt: null,
      user: null,
      userBranches: [],
      bcode: 0,
    };
  }
};

const initialState = loadStateFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.token;
      // state.expiresAt = action.payload.expiresAt;
      state.user = action.payload.user;
      state.userBranches = action.payload.user["userBranches"];
      
      // Persist to localStorage
      try {
        localStorage.setItem("authState", JSON.stringify(state));
      } catch (err) {
        console.error("Error saving auth state to localStorage:", err);
      }
    },
    updateCredentials: (state, action) => {
      const { accessToken, expiresAt, user } = action.payload;

      if (accessToken !== undefined) state.accessToken = accessToken;
      // if (expiresAt !== undefined) state.expiresAt = expiresAt;
      if (user !== undefined) {
        state.user = state.user ? { ...state.user, ...user } : user;
      }
      
      // Persist to localStorage
      try {
        localStorage.setItem("authState", JSON.stringify(state));
      } catch (err) {
        console.error("Error saving auth state to localStorage:", err);
      }
    },
    setActiveBcode: (state, action) => {
      state.bcode = action.payload;
      
      // Persist to localStorage
      try {
        localStorage.setItem("authState", JSON.stringify(state));
      } catch (err) {
        console.error("Error saving auth state to localStorage:", err);
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.user = null;
      state.userBranches = [];
      state.bcode = 0;
      
      // Clear from localStorage
      try {
        localStorage.removeItem("authState");
      } catch (err) {
        console.error("Error removing auth state from localStorage:", err);
      }
    },
  },
});

export const { setCredentials, updateCredentials, setActiveBcode, logout } =
  authSlice.actions;
export default authSlice.reducer;