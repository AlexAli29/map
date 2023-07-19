import { DrawerType } from "src/constants/drawer-type.enum";
import style from "./drawer.module.scss";
import cn from "classnames";
import { FavoritesDrawer, SearchDrawer } from "..";

export interface IDrawerProps {
	isOpen: boolean;
	type: DrawerType;
}

export const DrawerWrapper = ({ isOpen, type }: IDrawerProps) => {
	return (
		<div>
			<div className={cn(style.sidebar, isOpen && style.open)}>
				{{ favorites: <FavoritesDrawer />, search: <SearchDrawer /> }[type]}
			</div>
		</div>
	);
};
