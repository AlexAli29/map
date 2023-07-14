import { FunctionComponent, useState, useEffect } from "react";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";

interface MarkerData {
	name: string;
	position: google.maps.LatLngLiteral;
}

/**
 * Component to render all map markers
 */
const MapMarkers = ({
	userCoordinates,
}: {
	userCoordinates: { lat: number; lng: number };
}) => {
	// Get the global map instance with the useGoogleMap hook
	const map = useGoogleMap();

	const [, setMarkers] = useState<Array<google.maps.Marker>>([]);

	const museums: MarkerData[] = [
		{
			name: "me",
			position: userCoordinates,
		},
	];

	// Add markers to the map
	useEffect(() => {
		if (!map) {
			return () => {};
		}

		const initialBounds = new google.maps.LatLngBounds();

		const museumMarkers: Array<google.maps.Marker> = museums.map((museum) => {
			const { position, name } = museum;

			const markerOptions: google.maps.MarkerOptions = {
				map,
				position,
				title: name,
				clickable: true,
				icon: "gs://long-nomad-388814.appspot.com/current-location.png",
			};

			initialBounds.extend(position);

			return new google.maps.Marker(markerOptions);
		});

		setMarkers(museumMarkers);

		// Clean up markers
		return () => {
			museumMarkers.forEach((marker) => marker.setMap(null));
		};
	}, [map]);

	return null;
};

export default MapMarkers;
