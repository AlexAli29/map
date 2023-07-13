import { Button } from "src/ui";
import { MappieIcon } from "src/ui/icons";
import { DrawerWrapper } from "..";
import { useCallback, useState } from "react";
import { IDrawerProps } from "../drawer-wrapper/DrawerWrapper";
import { DrawerType } from "src/enums/drawer-type.enum";
import style from "./sidebar.module.scss";
import { Link } from "react-router-dom";
import { AuthType } from "src/enums/auth-type.enum";

export const SideBar = () => {
	const [drawerStatus, setDrawerStatus] = useState<IDrawerProps>({
		isOpen: false,
		type: DrawerType.Favorites,
	});

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
					<Link to={`auth/${AuthType.Login}`}>
						<Button color="black" icon="login" size="extra-small"></Button>
					</Link>
				</div>
			</div>
		</>
	);
};
