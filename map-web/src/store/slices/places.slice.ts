import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlace } from "src/interfaces/place.interface";

import { RootState } from "src/store/store";

const initialState: IPlace[] = [];

export const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {
		setPlaces(state, action: PayloadAction<IPlace[]>) {
			return action.payload;
		},

		addPlace(state, action: PayloadAction<IPlace>) {
			state.push(action.payload);
		},
	},
});

export const { actions } = placesSlice;

export const selectPlaces = (state: RootState) => state.places;

export default placesSlice.reducer;
