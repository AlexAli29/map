import { MarkerListItem } from "../marker-list-item/MarkerListItem";
import style from "./search-drawer.module.scss";
import { Input } from "src/ui";
import { MarkerType } from "../../constants/marker-type.enum";
import { Button } from "../../ui/button/button";
import { useSelector } from "react-redux";
import { selectSearch } from "src/store/slices/search.slice";
import { useActions } from "src/hooks/useActions";
import { ChangeEvent } from "react";

export const SearchDrawer = () => {
	const search = useSelector(selectSearch);
	const { setRadius, setSearchString } = useActions();
	const onRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value !== "") {
			setRadius(Number.parseInt(e.target.value));
		} else {
			setRadius(0);
		}
	};
	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
	};

	return (
		<>
			<div className={style.container}>
				<div className={style["container__input_wrapper"]}>
					<Input
						value={search.searchString}
						onChange={onSearchChange}
						leftIcon="search"
						placeholder="Место, адрес.."
					/>
				</div>
				<div className={style["container__markers_wrapper"]}>
					<p> Искать:</p>

					<div className={style["container__markers_list"]}>
						<ul className={style["container__markers_list__content"]}>
							{Object.values(MarkerType).map((markerType) => (
								<MarkerListItem key={markerType} markerType={markerType} />
							))}
						</ul>
					</div>
				</div>
				<div className={style["container__bottom_section"]}>
					<div className={style["container__bottom_section__radius_container"]}>
						<p>В радиусе</p>
						<div className={style["input_container"]}>
							<Input
								onChange={onRadiusChange}
								value={search.radius}
								className={style.input}
							/>
							<span>км</span>
						</div>
					</div>

					<Button icon="search" iconFilled={false} size="wider"></Button>
				</div>
			</div>
		</>
	);
};
