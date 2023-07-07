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
	color = "white",
	icon = "none",
	iconFilled = true,
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
	color?:
		| "blue"
		| "red"
		| "gray"
		| "login"
		| "gray-lighter"
		| "dark-blue-primary"
		| "dark-blue-secondary"
		| "black "
		| "white";
	iconFilled?: boolean;
	outlined?: boolean;
}) => {
	return (
		<button
			className={cn(
				style[`${size}`],
				style.button,
				outlined && style.outline,
				style[`${color}`]
			)}>
			{
				{
					none: null,
					search: <SearchIcon filled={iconFilled} />,
					location: <LocationIcon filled={iconFilled} />,
					login: <LoginIcon filled={iconFilled} />,
					location_plane: <LocationPlaneIcon filled={iconFilled} />,
					book_mark: <BookMarkIcon filled={iconFilled} />,
				}[icon]
			}
			{children}
		</button>
	);
};
