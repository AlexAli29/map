import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../interfaces/auth.interface";
import { RootState } from "../store";

const initialState: IAuth = {
	access_token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<IAuth>) {
			state.access_token = action.payload.access_token;
		},
		logOut: () => initialState,
	},
});

export const { setToken, logOut } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.access_token;

export default authSlice.reducer;
