import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";
import style from "./button.module.scss";
import { SearchIcon } from "../icons/search.icon";
import { LocationIcon } from "../icons/location.icon";
import { LoginIcon } from "../icons/login.icon";
import { LocationPlaneIcon } from "../icons/location-plane.icon";
import { BookMarkIcon } from "../icons/bookmark.icon";
import { IconType } from "src/types/icon.type";
import { ColorType } from "src/types/color.type";
import { FontColorType } from "src/types/font-color.type";

interface IButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	isSelected?: boolean;
	children?: ReactNode;
	size?: "extra-small" | "small" | "default" | "wide" | "wider";
	icon?: IconType;
	color?: ColorType;
	iconFilled?: boolean;
	outlined?: boolean;
	fontColor?: FontColorType;
}

export const Button = ({
	children,
	isSelected = false,
	size = "default",
	color = "blue",
	icon = "none",
	iconFilled = true,
	outlined = false,
	fontColor = "black",
	onClick,
	type,
	className,
	disabled,
}: IButtonProps) => {
	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={cn(
				style[`${size}`],
				style.button,
				outlined && style.outline,
				isSelected && style.outline,
				style[`${color}`],
				style[`font-${fontColor}`],
				isSelected && style.white,
				className
			)}>
			{
				{
					none: null,
					search: <SearchIcon filled={iconFilled || isSelected} />,
					location: <LocationIcon filled={iconFilled || isSelected} />,
					login: <LoginIcon filled={iconFilled || isSelected} />,
					location_plane: (
						<LocationPlaneIcon filled={iconFilled || isSelected} />
					),
					book_mark: <BookMarkIcon filled={iconFilled || isSelected} />,
				}[icon]
			}
			{children}
		</button>
	);
};
