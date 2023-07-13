import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

export const Map = () => {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_API_KEY,
	});

	return (
		<>
			{isLoaded ? (
				<GoogleMap
					zoom={15}
					mapContainerStyle={{ width: "100%", height: "100%" }}></GoogleMap>
			) : (
				loadError
			)}
		</>
	);
};
