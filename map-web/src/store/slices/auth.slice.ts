import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "src/interfaces/auth.interface";
import { RootState } from "src/store/store";

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

export const { actions } = authSlice;
export const { logOut, setToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.access_token;

export default authSlice.reducer;
