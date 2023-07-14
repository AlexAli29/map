import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IAuth } from "src/interfaces/auth.interface";
import { logOut, setToken } from "src/store/slices/auth.slice";
import { removeUser } from "src/store/slices/user.slice";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_PUBLIC_API_BASE_URL,
	credentials: "include",
	prepareHeaders: (Headers, { getState }: { getState: () => any }) => {
		const token = getState().auth.access_token;

		if (token) {
			Headers.set("authorization", `Bearer ${token}`);
		}

		return Headers;
	},
});

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status == 401) {
		const refreshResult = await baseQuery(
			"api/auth/refresh",
			api,
			extraOptions
		);

		if (refreshResult.data) {
			result = await baseQuery(args, api, extraOptions);
			api.dispatch(setToken(result.data as IAuth));
		} else {
			api.dispatch(logOut());
			api.dispatch(removeUser());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
