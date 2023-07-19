import { ILocation } from "./location.interface";

export interface IPlace {
	id: string;
	rating: number;
	photo: string;
	types: string[];
	location: ILocation;
	address: string;
	name: string;
}
