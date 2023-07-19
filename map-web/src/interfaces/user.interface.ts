import { IPlace } from "./place.interface";

export interface IUser {
	id: string | null;
	name: string | null;
	email: string | null;
	places: Pick<IPlace, "id">[];
}
