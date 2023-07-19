import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlace } from "src/interfaces/place.interface";

import { RootState } from "src/store/store";

const initialState: IPlace[] = [];

export const searchSlice = createSlice({
	name: "favorite-places",
	initialState,
	reducers: {
		setFavoritePlaces(state, action: PayloadAction<IPlace[]>) {
			state = action.payload;
		},

		addFavoritePlace(state, action: PayloadAction<IPlace>) {
			state.push(action.payload);
		},

		toggleFavoritePlace(state, action: PayloadAction<IPlace>) {
			const placeIndex = state.findIndex(
				(place) => place.id === action.payload.id
			);
			if (placeIndex === -1) {
				state = [...state, action.payload];
			} else {
				state.splice(placeIndex, 1);
			}
		},

		clearFavoritePlaces: () => initialState,
	},
});

export const { actions } = searchSlice;

export const selectFavoritePlaces = (state: RootState) => state.favoritePlaces;

export default searchSlice.reducer;
