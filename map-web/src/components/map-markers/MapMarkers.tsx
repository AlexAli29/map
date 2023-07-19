import { useEffect } from "react";
import {
	useGoogleMap,
	usePlacesService,
} from "@ubilabs/google-maps-react-hooks";
import { useSelector } from "react-redux";
import { selectSearch } from "src/store/slices/search.slice";
import { selectPlaces } from "src/store/slices/places.slice";
import { useActions } from "src/hooks/useActions";
import { transformPlacesResponse } from "src/helpers/transformPlacesResponse";
import { getMatchingIcon } from "src/helpers/getMatchingIcon";
import { useDebounce } from "src/hooks/useDebounce";
import { useUser } from "src/hooks/useUser";
import { useTogglePlaceMutation } from "src/services/place/place.api";

const MapMarkers = ({
	userCoordinates,
}: {
	userCoordinates: { lat: number; lng: number };
}) => {
	const { toggleUserPlace, setPlaces } = useActions();
	const map = useGoogleMap();
	const placeService = usePlacesService();

	const search = useSelector(selectSearch);

	const places = useSelector(selectPlaces);
	const debouncedRadius = useDebounce(search.radius, 500);
	const debouncedSearchString = useDebounce(search.searchString, 500);
	const user = useUser();
	const [togglePlace] = useTogglePlaceMutation();
	useEffect(() => {
		if (!map) {
			return () => {};
		}

		function callback(
			results: google.maps.places.PlaceResult[] | null,
			status: google.maps.places.PlacesServiceStatus
		) {
			if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
				return;
			}
			setPlaces(transformPlacesResponse(results));
			return new google.maps.Marker({
				map,
				position: userCoordinates,
				title: "me",
				icon: "https://firebasestorage.googleapis.com/v0/b/long-nomad-388814.appspot.com/o/markers%2Fcurrent-location.png?alt=media&token=5040024a-84ec-4baf-bc98-8ff2c1ccaf6e",
			});
		}
		placeService?.nearbySearch(
			{
				radius: debouncedRadius as number,
				location: userCoordinates,
				keyword: debouncedSearchString as string,
			},
			callback
		);

		const initialBounds = new google.maps.LatLngBounds();

		const Markers: Array<google.maps.Marker> = places.map((place) => {
			let marker: google.maps.Marker;
			const { location } = place;

			const markerOptions: google.maps.MarkerOptions = {
				map,
				position: location,
				title: place.name,
				clickable: true,
				icon: getMatchingIcon(place.types),
			};

			initialBounds.extend(userCoordinates);
			marker = new google.maps.Marker(markerOptions);
			marker.addListener("click", async () => {
				await togglePlace({ id: place.id });
				toggleUserPlace({ id: place.id });
			});
			return marker;
		});

		return () => {
			Markers.forEach((marker) => marker.setMap(null));
		};
	}, [
		map,
		Boolean(placeService),
		places.length,
		debouncedRadius,
		debouncedSearchString,
	]);

	return null;
};

export default MapMarkers;
