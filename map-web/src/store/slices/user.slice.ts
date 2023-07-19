import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPlace } from "src/interfaces/place.interface";
import { IUser } from "src/interfaces/user.interface";
import { RootState } from "src/store/store";

const initialState: IUser = {
	id: null,
	name: null,
	email: null,
	places: [],
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
		removeUser() {
			return initialState;
		},

		toggleUserPlace(state, action: PayloadAction<Pick<IPlace, "id">>) {
			const placeIndex = state.places.findIndex(
				(place) => place.id === action.payload.id
			);
			console.log(placeIndex);
			if (placeIndex === -1) {
				state.places = [...state.places, action.payload];
			} else {
				state.places.splice(placeIndex, 1);
			}
		},
	},
});

export const { actions } = userSlice;
export const { removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserPlaces = (state: RootState) => state.user.places;

export default userSlice.reducer;
