import { Link } from "react-router-dom";
import { AuthType } from "../../enums/auth-type.enum";
import { Button } from "../../components/ui/button/button";
export const IndexPage = () => {
	return (
		<>
			<Link to={`auth/${AuthType.Login}`}>login</Link>
			<br />
			<Link to={`auth/${AuthType.Register}`}>register</Link>
			<Button size="small" icon="book_mark" outlined={true}></Button>
		</>
	);
};
