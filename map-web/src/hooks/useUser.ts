import { useSelector } from "react-redux";
import { selectUser } from "src/store/slices/user.slice";

export const useUser = () => {
	return useSelector(selectUser);
};
