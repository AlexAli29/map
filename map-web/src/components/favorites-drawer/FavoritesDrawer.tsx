import { Button, Input } from "src/ui";
import style from "./favorites-drawer.module.scss";
import { MarkerListItem } from "../marker-list-item/MarkerListItem";
import { FavoriteListCard } from "..";

export const FavoritesDrawer = () => {
	return (
		<>
			<div className={style.container}>
				<div className={style["container__input_wrapper"]}>
					<Input leftIcon="search" placeholder="Место, адрес.." />
				</div>
				<div className={style["container__favorites_wrapper"]}>
					<p> Избранное:</p>
					<div className={style["container__favorites-list"]}>
						<FavoriteListCard />
						<FavoriteListCard />
						<FavoriteListCard />
						<FavoriteListCard />
						<FavoriteListCard />
					</div>
				</div>
			</div>
		</>
	);
};
