import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions as userActions } from "src/store/slices/user.slice";
import { actions as authActions } from "src/store/slices/auth.slice";

export const useActions = () => {
	const dispatch = useDispatch();
	const rootAction = {
		...userActions,
		...authActions,
	};

	return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
