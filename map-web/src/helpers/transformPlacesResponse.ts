import { ILocation } from "src/interfaces/location.interface";
import { IPlace } from "src/interfaces/place.interface";

export const transformPlacesResponse = (
	places: google.maps.places.PlaceResult[]
): IPlace[] => {
	return places.map((place) => ({
		id: place.place_id ?? "",
		rating: place.rating ?? 0,
		photo:
			place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : "",
		types: place.types && place.types.length > 0 ? place.types : [],
		location: transformGeometryToILocation(
			place.geometry as google.maps.places.PlaceGeometry
		), // функция преобразования должна быть определена
		address: place.vicinity ?? "",
		name: place.name ?? "",
	}));
};

const transformGeometryToILocation = (
	geometry: google.maps.places.PlaceGeometry
): ILocation => {
	return {
		lat: geometry.location?.lat() ?? 0,
		lng: geometry.location?.lng() ?? 0,
	};
};
