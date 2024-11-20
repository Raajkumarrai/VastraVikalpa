import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    uId: "",
    uName: "user",
    isAdmin: false,
  },
};
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        value: {
          uId: "1",
          uName: action.payload,
          isAdmin: false,
        },
      };
    },
    logout: () => initialState,
  },
});
export const { login, logout } = auth.actions;
export default auth.reducer;
