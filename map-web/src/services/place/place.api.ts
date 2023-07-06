import { apiSlice } from "../apiSlice";
import { IUser } from "../../interfaces/user.interface";
import { IPlace } from "../../interfaces/place.interface";

export const placeApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		addPlace: build.mutation<IPlace, IUser>({
			query: (credentials) => ({
				url: "api/place",
				method: "POST",
				body: credentials,
			}),
		}),

		removePlace: build.mutation<string, IUser>({
			query: (id) => ({
				url: `api/place/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useAddPlaceMutation, useRemovePlaceMutation } = placeApi;
