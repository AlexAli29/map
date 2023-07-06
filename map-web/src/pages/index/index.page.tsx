import { Link } from "react-router-dom";
import { AuthType } from "../../enums/auth-type.enum";
export const IndexPage = () => {
	return (
		<>
			<Link to={`auth/${AuthType.Login}`}>login</Link>
			<br />
			<Link to={`auth/${AuthType.Register}`}>register</Link>
		</>
	);
};
