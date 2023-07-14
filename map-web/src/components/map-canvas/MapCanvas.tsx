import { forwardRef } from "react";

import styles from "./map-canvas.module.scss";

const MapCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
	(_, ref) => <div ref={ref} className={styles.map} />
);

export default MapCanvas;
