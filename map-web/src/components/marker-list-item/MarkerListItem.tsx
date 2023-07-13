import { MarkerType } from "src/enums/marker-type.enum";
import cn from "classnames";
import style from "./marker-list-item.module.scss";
import { Marker } from "../marker/Marker";
import { MarkerTypeRussianMap } from "src/const/markers-russian.map";
import { useCallback, useState } from "react";

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
