import { Button } from "src/ui";
import { useCallback } from "react";
import styles from "./map-controls.module.scss";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
export const MapControls = ({
	userCoordinates,
}: {
	userCoordinates: { lat: number; lng: number };
}) => {
	const map = useGoogleMap();
	const centerMap = useCallback(() => {
		map?.panTo(userCoordinates);
	}, [map]);

	return (
		<div className={styles.container}>
			<Button
				onClick={centerMap}
				size="extra-small"
				icon="location_plane"
				className={styles["container__location_button"]}></Button>
		</div>
	);
};
