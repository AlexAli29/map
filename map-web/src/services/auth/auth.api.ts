import { apiSlice } from "../apiSlice";
import { IUser } from "../../interfaces/user.interface";

import { IAuth } from "../../interfaces/auth.interface";
import { ILoginUserDto } from "../../interfaces/login-user-dto.interface";
import { IRegisterUserDto } from "../../interfaces/register-user-dto.interface";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation<IAuth, IRegisterUserDto>({
			query: (credentials) => ({
				url: "api/auth/register",
				method: "POST",
				body: credentials,
			}),
		}),

		login: build.mutation<IAuth, ILoginUserDto>({
			query: (credentials) => ({
				url: "api/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),

		getCurrentUser: build.mutation<IUser, void>({
			query: () => ({
				url: "api/auth/user",
				method: "GET",
			}),
		}),

		refresh: build.mutation<IAuth, void>({
			query: () => ({
				url: "api/auth/refresh",
				method: "GET",
			}),
		}),

		logOut: build.mutation<any, void>({
			query: () => ({
				url: "api/auth/logout",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogOutMutation,
	useGetCurrentUserMutation,
	useRefreshMutation,
} = authApi;
