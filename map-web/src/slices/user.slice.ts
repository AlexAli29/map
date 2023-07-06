import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";
import { RootState } from "../store";
import { IPlace } from "../interfaces/place.interface";

const initialState: IUser = {
	id: null,
	name: null,
	email: null,
	places: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.places = action.payload.places;
		},
		removeUser: () => initialState,

		removePlace(state, action: PayloadAction<string>) {
			const placeIndex = state?.places?.findIndex(
				(place) => place.id === action.payload
			);
			if (placeIndex && placeIndex !== -1) {
				state?.places?.splice(placeIndex, 1);
			}
		},
		addPlace(state, action: PayloadAction<IPlace>) {
			state.places?.push(action.payload);
		},
	},
});

export const { setUser, removeUser, removePlace } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectPlaces = (state: RootState) => state.user.places;

export default userSlice.reducer;
