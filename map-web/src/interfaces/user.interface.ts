import { IPlace } from "./place.interface";

export interface IUser {
	id: null;
	name: string | null;
	email: string | null;
	places: IPlace[] | null;
}
