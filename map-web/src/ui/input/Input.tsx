import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import {
	SearchIcon,
	LocationIcon,
	LoginIcon,
	LocationPlaneIcon,
	BookMarkIcon,
} from "../icons";
import { IconType } from "src/types/icon.type";
import style from "./input.module.scss";
import cn from "classnames";

interface IInputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	leftIcon?: IconType;
	leftIconFilled?: boolean;
	rightIcon?: IconType;
	rightIconFilled?: boolean;
	border?: boolean;
	error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
	(
		{
			type,
			leftIcon = "none",
			leftIconFilled = true,
			rightIcon = "none",
			rightIconFilled = true,
			placeholder,
			className,
			border = true,
			error = false,
			onChange,
			...rest
		},
		ref
	) => {
		return (
			<>
				<div className={style["left-icon-container"]}>
					{
						{
							none: null,
							search: <SearchIcon filled={leftIconFilled} isNeutral={true} />,
							location: <LocationIcon filled={leftIconFilled} />,
							login: <LoginIcon filled={leftIconFilled} />,
							location_plane: <LocationPlaneIcon filled={leftIconFilled} />,
							book_mark: <BookMarkIcon filled={leftIconFilled} />,
						}[leftIcon]
					}
				</div>
				<div className={style["input-container"]}>
					<input
						placeholder={placeholder}
						ref={ref}
						className={cn(
							className,
							style.input,
							border && style.border,
							leftIcon == "none" && style["input-without-icon"],
							error && style["error-border"]
						)}
						onChange={onChange}
						type={type}
						{...rest}
					/>
				</div>
				<div className={style["right-icon-container"]}>
					{
						{
							none: null,
							search: <SearchIcon filled={rightIconFilled} />,
							location: <LocationIcon filled={rightIconFilled} />,
							login: <LoginIcon filled={rightIconFilled} />,
							location_plane: <LocationPlaneIcon filled={rightIconFilled} />,
							book_mark: <BookMarkIcon filled={rightIconFilled} />,
						}[rightIcon]
					}
				</div>
			</>
		);
	}
);
