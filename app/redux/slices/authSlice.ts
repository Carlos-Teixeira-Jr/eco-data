import { IUser } from "@/app/interfaces/auth/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  message: string;
  isAuthenticated: boolean;
}

const authSliceInitialState: AuthState = {
  user: null,
  message: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authSliceInitialState,
  reducers: {
    signupSuccess: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.message = "";
      state.isAuthenticated = false;
    }
  },
});


export const { signupSuccess, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;