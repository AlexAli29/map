import { useSelector } from "react-redux";
import { selectPlaces } from "src/store/slices/user.slice";

export const usePlaces = () => {
	return useSelector(selectPlaces);
};
