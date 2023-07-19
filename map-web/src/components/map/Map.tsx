import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { useState, useCallback, useLayoutEffect } from "react";
import { useUserCoordinates } from "src/hooks/useUserCoordinates";
import { MapControls } from "../map-controlls/MapControlls";
import MapCanvas from "../map-canvas/MapCanvas";
import MapMarkers from "../map-markers/MapMarkers";

export const Map = () => {
	const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

	const mapRef = useCallback(
		(node: React.SetStateAction<HTMLDivElement | null>) => {
			node && setMapContainer(node);
		},
		[]
	);
	const [userCoordinates, setUserCoordinates] = useState({
		lat: 0,
		lng: 0,
	});

	const getCoordinates = useUserCoordinates();

	useLayoutEffect(() => {
		const requestCoordinates = async () => {
			const coordinates = await getCoordinates();

			setUserCoordinates(() => coordinates);
		};
		requestCoordinates();
	}, []);

	const mapOptions: google.maps.MapOptions = {
		zoom: 15,
		center: {
			lat: userCoordinates.lat,
			lng: userCoordinates.lng,
		},
		clickableIcons: true,
		mapId: import.meta.env.VITE_PUBLIC_GOOGLE_MAP_ID,
		disableDefaultUI: true,
	};

	return (
		<>
			<GoogleMapsProvider
				libraries={["places"]}
				googleMapsAPIKey={import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY}
				mapContainer={mapContainer}
				mapOptions={mapOptions}>
				<MapCanvas ref={mapRef} />
				<MapMarkers userCoordinates={userCoordinates} />
				<MapControls userCoordinates={userCoordinates} />
			</GoogleMapsProvider>
		</>
	);
};
