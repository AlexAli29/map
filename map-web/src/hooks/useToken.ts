import { useSelector } from "react-redux";
import { selectToken } from "src/store/slices/auth.slice";

export const useToken = () => {
	return useSelector(selectToken);
};
