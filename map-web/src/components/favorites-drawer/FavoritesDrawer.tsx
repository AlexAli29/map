import { Button, Input } from "src/ui";
import style from "./favorites-drawer.module.scss";
import { MarkerListItem } from "../marker-list-item/MarkerListItem";
import { FavoriteListCard } from "..";
import { useUser } from "src/hooks/useUser";
import { Link } from "react-router-dom";
import { AuthType } from "src/enums/auth-type.enum";

export const FavoritesDrawer = () => {
	const user = useUser();
	return (
		<>
			<div className={style.container}>
				{user.email && (
					<>
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
					</>
				)}
				{!user.email && (
					<div className={style["container__unauthorized_wrapper"]}>
						<p>You have to login first</p>
						<Link to={`auth/${AuthType.Login}`}>
							<Button color="black" icon="login" size="extra-small"></Button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};
