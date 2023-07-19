import { MarkerType } from "src/constants/marker-type.enum";
import cn from "classnames";
import style from "./marker-list-item.module.scss";
import { Marker } from "../marker/Marker";

import { useCallback, useState } from "react";
import { MarkerTypeRussianMap } from "src/constants/markers-russian.map";

export const MarkerListItem = ({ markerType }: { markerType: MarkerType }) => {
	const [isSelected, setIsSelected] = useState(false);
	const toggleSelected = useCallback(() => {
		setIsSelected((prev) => !prev);
	}, [isSelected]);
	return (
		<li
			onClick={toggleSelected}
			className={cn(style["marker-list-item"], isSelected && style.selected)}>
			<Marker markerType={markerType} />
			<span>{MarkerTypeRussianMap[markerType]}</span>
		</li>
	);
};
