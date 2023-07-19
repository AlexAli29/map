import { Button } from "src/ui";
import { MappieIcon, UserIcon } from "src/ui/icons";
import { DrawerWrapper } from "..";
import { useCallback, useState } from "react";
import { IDrawerProps } from "../drawer-wrapper/DrawerWrapper";
import { DrawerType } from "src/constants/drawer-type.enum";
import style from "./sidebar.module.scss";
import { Link } from "react-router-dom";
import { AuthType } from "src/constants/auth-type.enum";
import { useUser } from "src/hooks/useUser";
import cn from "classnames";
import { useActions } from "src/hooks/useActions";

export const SideBar = () => {
	const [drawerStatus, setDrawerStatus] = useState<IDrawerProps>({
		isOpen: false,
		type: DrawerType.Favorites,
	});
	const { removeUser, logOut, clearFavoritePlaces } = useActions();
	const [userPopUpActive, setUserPopUpActive] = useState(false);
	const user = useUser();
	const toggleDrawer = useCallback(
		(type: DrawerType) => () => {
			setDrawerStatus((prev) => {
				if (prev.isOpen && prev.type === type) {
					return { isOpen: false, type: type };
				} else {
					return { isOpen: true, type: type };
				}
			});
		},
		[]
	);

	const exit = () => {
		removeUser();
		logOut();
		clearFavoritePlaces();
		setUserPopUpActive(false);
	};

	return (
		<>
			<DrawerWrapper isOpen={drawerStatus.isOpen} type={drawerStatus.type} />
			<div className={style.container}>
				<div className={style["container__main_section"]}>
					<Link to={"/"} className={style["container__icon_wrapper"]}>
						<MappieIcon />
					</Link>
					<div className={style["container__buttons_wrapper"]}>
						<Button
							isSelected={
								drawerStatus.isOpen && drawerStatus.type == DrawerType.Search
							}
							onClick={toggleDrawer(DrawerType.Search)}
							iconFilled={false}
							size="small"
							icon="search"></Button>
						<Button
							isSelected={
								drawerStatus.isOpen && drawerStatus.type == DrawerType.Favorites
							}
							onClick={toggleDrawer(DrawerType.Favorites)}
							size="small"
							color="red"
							iconFilled={false}
							icon="book_mark"></Button>
					</div>
				</div>
				<div className={style["container__bottom_section"]}>
					{user.email && (
						<div className={cn(style["container__bottom_section__user_icon"])}>
							<ul className={cn(!userPopUpActive && style["hidden"])}>
								<li>{user.name}</li>
								<li onClick={exit}>Log out</li>
							</ul>
							<div onClick={() => setUserPopUpActive((prev) => !prev)}>
								<UserIcon width={55} height={55} />
							</div>
						</div>
					)}
					{!user.email && (
						<Link to={`auth/${AuthType.Login}`}>
							<Button color="black" icon="login" size="extra-small"></Button>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};
