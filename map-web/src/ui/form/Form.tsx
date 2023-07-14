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
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Form = ({ type }: { type: AuthType }) => {
	const { setToken, setUser } = useActions();
	const navigate = useNavigate();
	const errorToast = (error: string) => {
		toast.error(`${error}`, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 1500,
			toastId: "1",
			theme: "colored",
		});
	};
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
		reset: resetLogin,
	} = useForm<ILoginUserDto>();
	const {
		register: registerRegister,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerValidationErrors },
		reset: resetRegister,
	} = useForm<IRegisterUserDto>();

	const onLoginSubmit: SubmitHandler<ILoginUserDto> = (data) => {
		login(data);
	};

	const onRegisterSubmit: SubmitHandler<IRegisterUserDto> = (data) => {
		register(data);
	};

	useEffect(() => {
		if (isGetUserSuccess && GetUserData) {
			setUser(GetUserData);
			resetLogin();
			resetRegister();
			navigate("/");
		}
		if (isGetUserError && GetUserError) {
			if ("data" in GetUserError) {
				errorToast((GetUserError.data as any).message);
			}
		}
	}, [isGetUserError, isGetUserSuccess, GetUserData, GetUserError]);

	useEffect(() => {
		if (isRegisterSuccess && RegisterData) {
			setToken(RegisterData);
			getCurrentUser();
		}
		if (isRegisterError && RegisterError) {
			if ("data" in RegisterError) {
				errorToast((RegisterError.data as any).message);
			}
		}
		if (isLoginSuccess && LoginData) {
			setToken(LoginData);
			getCurrentUser();
		}
		if (isLoginError && LoginError) {
			if ("data" in LoginError) {
				errorToast((LoginError.data as any).message);
			}
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
	]);

	return (
		<>
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
								error={loginValidationErrors?.identifier && true}
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
								error={loginValidationErrors?.password && true}
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
								error={registerValidationErrors?.name && true}
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
								error={registerValidationErrors?.email && true}
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
										message: "Password is at least 8 symbols",
									},
								})}
								type="password"
								placeholder="password"
								error={registerValidationErrors?.password && true}
							/>
							{registerValidationErrors?.password && (
								<div className={styles["form__field_error"]}>
									{registerValidationErrors.password.message}
								</div>
							)}
						</div>

						<span>
							Have an account?
							<Link to={`/auth/${AuthType.Login}`}>Login</Link>
						</span>
					</>
				)}
				<Button fontColor="white" color="blue" size="default">
					{type}
				</Button>
			</form>
			<ToastContainer />
		</>
	);
};
