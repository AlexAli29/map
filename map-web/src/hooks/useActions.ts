import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions as userActions } from "src/store/slices/user.slice";
import { actions as authActions } from "src/store/slices/auth.slice";
import { actions as searchActions } from "src/store/slices/search.slice";
import { actions as placesActions } from "src/store/slices/places.slice";
import { actions as favoritePlacesActions } from "src/store/slices/favorite-places.slice";

export const useActions = () => {
	const dispatch = useDispatch();
	const rootAction = {
		...userActions,
		...authActions,
		...searchActions,
		...placesActions,
		...favoritePlacesActions,
	};

	return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
