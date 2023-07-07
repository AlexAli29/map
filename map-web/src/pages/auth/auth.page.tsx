import { useParams } from "react-router-dom";
import { Form } from "../../components/ui/form/form";
import { AuthType } from "../../enums/auth-type.enum";

export const AuthPage = () => {
	const { authType } = useParams<{ authType: AuthType }>();
	return <Form type={authType ?? AuthType.Login} />;
};
