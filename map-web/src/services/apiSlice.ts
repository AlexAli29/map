import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setToken } from "../slices/auth.slice";
import { IAuth } from "../interfaces/auth.interface";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.PUBLIC_API_BASE_URL,
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
			api.dispatch(setToken(refreshResult.data as IAuth));

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
