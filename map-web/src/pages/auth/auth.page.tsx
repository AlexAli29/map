import { useParams } from "react-router-dom";

import { AuthType } from "src/enums/auth-type.enum";
import { Form } from "src/ui";

export const AuthPage = () => {
	const { authType } = useParams<{ authType: AuthType }>();
	return <Form type={authType ?? AuthType.Login} />;
};
