import { useSelector } from "react-redux";
import { selectPlaces } from "src/store/slices/user.slice";

export const useUser = () => {
	return useSelector(selectPlaces);
};
