import { useEffect } from "react";
import { AuthType } from "src/enums/auth-type.enum";
import { ILoginUserDto } from "src/interfaces/login-user-dto.interface";
import { IRegisterUserDto } from "src/interfaces/register-user-dto.interface";
import {
	useGetCurrentUserMutation,
	useLoginMutation,
	useRegisterMutation,
} from "src/services/auth/auth.api";
import { Button } from "../button/button";
import { useActions } from "src/hooks/useActions";
import styles from "./form.module.scss";
import { Input } from "..";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export const Form = ({ type }: { type: AuthType }) => {
	const { setToken, setUser } = useActions();
	const [
		login,
		{
			isError: isLoginError,
			isSuccess: isLoginSuccess,
			data: LoginData,
			error: LoginError,
		},
	] = useLoginMutation();
	const [
		register,
		{
			isError: isRegisterError,
			isSuccess: isRegisterSuccess,
			data: RegisterData,
			error: RegisterError,
		},
	] = useRegisterMutation();
	const [
		getCurrentUser,
		{
			isError: isGetUserError,
			isSuccess: isGetUserSuccess,
			data: GetUserData,
			error: GetUserError,
		},
	] = useGetCurrentUserMutation();
	const {
		register: loginRegister,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginValidationErrors },
	} = useForm<ILoginUserDto>();
	const {
		register: registerRegister,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerValidationErrors },
	} = useForm<IRegisterUserDto>();

	const onLoginSubmit: SubmitHandler<ILoginUserDto> = (data) => {
		login(data);
	};

	const onRegisterSubmit: SubmitHandler<IRegisterUserDto> = (data) => {
		console.log(data);
		register(data);
	};

	useEffect(() => {
		if (isRegisterSuccess && RegisterData) {
			setToken(RegisterData);
			getCurrentUser();
		}
		if (isRegisterError && RegisterError) {
			alert(JSON.stringify(RegisterError));
		}
		if (isLoginSuccess && LoginData) {
			setToken(LoginData);
			getCurrentUser();
		}
		if (isLoginError && LoginError) {
			alert(JSON.stringify(LoginError));
		}
		if (isGetUserSuccess && GetUserData) {
			setUser(GetUserData);
			alert(GetUserData.name);
		}
		if (isGetUserError && GetUserError) {
			// Handle error case
		}
	}, [
		isRegisterSuccess,
		isRegisterError,
		RegisterData,
		RegisterError,
		isLoginSuccess,
		LoginData,
		isLoginError,
		LoginError,
		isGetUserError,
		isGetUserSuccess,
		GetUserError,
	]);

	return (
		<form
			className={styles.form}
			onSubmit={
				type === "register"
					? handleRegisterSubmit(onRegisterSubmit)
					: handleLoginSubmit(onLoginSubmit)
			}>
			<p>{type}</p>
			{type === "login" ? (
				<>
					<div className={styles["form__input_wrapper"]}>
						<Input
							{...loginRegister("identifier", {
								required: "Identifier is required field",
							})}
							type="text"
							placeholder="name or email"
						/>
						{loginValidationErrors?.identifier && (
							<div className={styles["form__field_error"]}>
								{loginValidationErrors.identifier.message}
							</div>
						)}
					</div>
					<div className={styles["form__input_wrapper"]}>
						<Input
							{...loginRegister("password", {
								required: "Password is required field",
							})}
							type="password"
							placeholder="password"
						/>
						{loginValidationErrors?.password && (
							<div className={styles["form__field_error"]}>
								{loginValidationErrors.password.message}
							</div>
						)}
					</div>
					<span>
						Don't have an account?
						<Link to={`/auth/${AuthType.Register}`}>Register</Link>
					</span>
				</>
			) : (
				<>
					<div className={styles["form__input_wrapper"]}>
						<Input
							{...registerRegister("name", {
								required: "Name is required field",
							})}
							type="text"
							placeholder="name"
						/>
						{registerValidationErrors?.name && (
							<div className={styles["form__field_error"]}>
								{registerValidationErrors.name.message}
							</div>
						)}
					</div>
					<div className={styles["form__input_wrapper"]}>
						<Input
							{...registerRegister("email", {
								required: "Email is required field",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Enter valid email",
								},
							})}
							type="text"
							placeholder="email"
						/>
						{registerValidationErrors?.email && (
							<div className={styles["form__field_error"]}>
								{registerValidationErrors.email.message}
							</div>
						)}
					</div>
					<div className={styles["form__input_wrapper"]}>
						<Input
							{...registerRegister("password", {
								required: "Password is required field",
								minLength: {
									value: 8,
									message: "Password must contain at least 8 symbols",
								},
							})}
							type="password"
							placeholder="password"
						/>
						{registerValidationErrors?.password && (
							<div className={styles["form__field_error"]}>
								{registerValidationErrors.password.message}
							</div>
						)}
					</div>

					<span>
						Already have an account?
						<Link to={`/auth/${AuthType.Login}`}>Login</Link>
					</span>
				</>
			)}
			<Button fontColor="white" color="blue" size="default">
				{type}
			</Button>
		</form>
	);
};
