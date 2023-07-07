import { ReactNode } from "react";
import cn from "classnames";
import style from "./button.module.scss";
import { SearchIcon } from "../icons/search.icon";
import { LocationIcon } from "../icons/location.icon";
import { LoginIcon } from "../icons/login.icon";
import { LocationPlaneIcon } from "../icons/location-plane.icon";
import { BookMarkIcon } from "../icons/bookmark.icon";

export const Button = ({
	children,
	size = "default",
	icon = "none",
	filled = true,
	outlined = false,
}: {
	children?: ReactNode;
	size?: "extra-small" | "small" | "default" | "wide" | "wider";
	icon?:
		| "none"
		| "search"
		| "location"
		| "login"
		| "location_plane"
		| "book_mark";
	filled?: boolean;
	outlined?: boolean;
}) => {
	return (
		<button
			className={cn(style[`${size}`], style.button, outlined && style.outline)}>
			{
				{
					none: null,
					search: <SearchIcon filled={filled} />,
					location: <LocationIcon filled={filled} />,
					login: <LoginIcon filled={filled} />,
					location_plane: <LocationPlaneIcon filled={filled} />,
					book_mark: <BookMarkIcon filled={filled} />,
				}[icon]
			}
			{children}
		</button>
	);
};
