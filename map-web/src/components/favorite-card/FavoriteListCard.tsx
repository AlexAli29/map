import style from "./favorite-list-card.module.scss";
import { BookMarkIcon } from "src/ui/icons";
import { CafeMarker, ShoppingMarker } from "src/ui/icons/markers";
import { useUser } from "src/hooks/useUser";

export const FavoriteListCard = ({ name }: { name: string }) => {
	const user = useUser();
	return (
		<div className={style.container}>
			<div className={style["container__header"]}>
				<div className={style["container__header_badge"]}>
					<div className={style["container__header_markers"]}>
						<CafeMarker />
						<ShoppingMarker />
					</div>
				</div>
				<div className={style["container__header_title"]}>{name}</div>
			</div>
			<div className={style["container__description"]}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolor
				delectus, minus incidunt ea, in consectetur a magni tempore, adipisci
				odit? Vel, optio autem. Provident ut assumenda voluptatum quo neque.
			</div>
			<div className={style["container__buttons"]}>
				<BookMarkIcon filled={true} />
			</div>
		</div>
	);
};
