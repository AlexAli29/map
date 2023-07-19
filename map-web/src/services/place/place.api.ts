import { apiSlice } from "../apiSlice";
import { IPlace } from "src/interfaces/place.interface";

export const placeApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		togglePlace: build.mutation<void, Pick<IPlace, "id">>({
			query: (credentials) => ({
				url: "api/place",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useTogglePlaceMutation } = placeApi;
