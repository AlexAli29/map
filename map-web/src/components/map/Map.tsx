import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import styles from "./map.module.scss";
import { useState, useEffect, useCallback } from "react";
import { useUserCoordinates } from "src/hooks/useUserCoordinates";
import { MapControls } from "../map-controlls/MapControlls";
import MapCanvas from "../map-canvas/MapCanvas";
import MapMarkers from "../map-markers/map-markers";

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

	useEffect(() => {
		const requestCoordinates = async () => {
			const coordinates = await getCoordinates();

			setUserCoordinates(() => coordinates);
		};
		requestCoordinates();
	}, []);

	const addMarkers = (map: google.maps.Map) => {
		const marker = new google.maps.Marker({ position: userCoordinates });
		return marker;
	};

	const onLoad = useCallback((map: google.maps.Map) => addMarkers(map), []);

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
				googleMapsAPIKey={import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY}
				mapContainer={mapContainer}
				mapOptions={mapOptions}
				onLoadMap={onLoad}>
				<MapCanvas ref={mapRef} />
				<MapMarkers userCoordinates={userCoordinates} />
				<MapControls userCoordinates={userCoordinates} />
			</GoogleMapsProvider>
		</>
	);
};
