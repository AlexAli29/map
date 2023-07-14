import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IPlace } from "src/interfaces/place.interface";
import { IUser } from "src/interfaces/user.interface";
import { RootState } from "src/store/store";

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
			toast.success(`Welcome ${action.payload.name}`, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 1500,
				toastId: action.payload.id ?? "",
				theme: "colored",
			});

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

export const { actions } = userSlice;
export const { removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectPlaces = (state: RootState) => state.user.places;

export default userSlice.reducer;
