import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import searchReducer from "./slices/search.slice";
import placesReducer from "./slices/places.slice";
import favoritePlacesReducer from "./slices/favorite-places.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	search: searchReducer,
	places: placesReducer,
	favoritePlaces: favoritePlacesReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
