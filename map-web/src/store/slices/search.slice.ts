import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearch } from "src/interfaces/search.interface";

import { RootState } from "src/store/store";

const initialState: ISearch = {
	searchString: "",
	placeFilter: [],
	radius: 500,
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearchString(state, action: PayloadAction<string>) {
			state.searchString = action.payload;
		},
		setPlaceFilter(state, action: PayloadAction<string>) {
			state.placeFilter.push(action.payload);
		},
		setRadius(state, action: PayloadAction<number>) {
			state.radius = action.payload;
		},
	},
});

export const { actions } = searchSlice;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
