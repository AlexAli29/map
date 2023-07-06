import { useState } from "react";
import { AuthType } from "../../enums/auth-type.enum";
import { ILoginUserDto } from "../../interfaces/login-user-dto.interface";
import { IRegisterUserDto } from "../../interfaces/register-user-dto.interface";
import {
	useLoginMutation,
	useRegisterMutation,
} from "../../services/auth/auth.api";
import { useDispatch } from "react-redux";
import { setToken } from "../../slices/auth.slice";

export const Form = ({ type }: { type: AuthType }) => {
	const dispatch = useDispatch();
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const [loginData, setLoginData] = useState<ILoginUserDto>({
		identifier: "",
		password: "",
	});
	const [registerData, setRegisterData] = useState<IRegisterUserDto>({
		name: "",
		email: "",
		password: "",
	});

	const onFormSubmit = async () => {
		if (type == "register") {
			const res = await register(registerData);
			if ("data" in res) {
				dispatch(setToken(res.data));
			}
		} else {
			const res = await login(loginData);
			if ("data" in res) {
				dispatch(setToken(res.data));
			}
		}
	};

	return (
		<form onSubmit={onFormSubmit}>
			<p>{type}</p>
			{
				{
					login: (
						<>
							<input
								onChange={(e) =>
									setLoginData((prev) => ({
										...prev,
										identifier: e.target.value,
									}))
								}
								type="text"
								placeholder="name or email"
							/>
							<br />
							<input
								onChange={(e) =>
									setLoginData((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								type="text"
								placeholder="password"
							/>
							<br />
						</>
					),
					register: (
						<>
							<input
								onChange={(e) =>
									setRegisterData((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								type="text"
								placeholder="name"
							/>
							<br />
							<input
								onChange={(e) =>
									setRegisterData((prev) => ({
										...prev,
										email: e.target.value,
									}))
								}
								type="text"
								placeholder="email"
							/>
							<br />
							<input
								onChange={(e) =>
									setRegisterData((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								type="text"
								placeholder="password"
							/>
							<br />
						</>
					),
				}[type]
			}
			<button>{type}</button>
		</form>
	);
};
