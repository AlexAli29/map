export const useUserCoordinates = () => async () => {
	const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
	return {
		lat: pos.coords.latitude,
		lng: pos.coords.longitude,
	};
};
