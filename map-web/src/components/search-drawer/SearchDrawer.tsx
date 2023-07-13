import { MarkerListItem } from "../marker-list-item/MarkerListItem";
import style from "./search-drawer.module.scss";
import { Input } from "src/ui";
import { MarkerType } from "../../enums/marker-type.enum";
import { Button } from "../../ui/button/button";

export const SearchDrawer = () => {
	return (
		<>
			<div className={style.container}>
				<div className={style["container__input_wrapper"]}>
					<Input leftIcon="search" placeholder="Место, адрес.." />
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
							<Input className={style.input} />
							<span>км</span>
						</div>
					</div>

					<Button icon="search" iconFilled={false} size="wider"></Button>
				</div>
			</div>
		</>
	);
};
