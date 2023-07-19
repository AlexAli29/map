import { ApiIconTypeMapping } from "src/constants/marker-icons-api.map.enum";
import { MarkerIconsLinks } from "src/constants/marker-icons-links.enum";

export const getMatchingIcon = (placeTypes: string[]): MarkerIconsLinks => {
	for (let key in ApiIconTypeMapping) {
		if (placeTypes.some((placeType) => placeType.includes(key))) {
			return ApiIconTypeMapping[key];
		}
	}

	return MarkerIconsLinks.Misc;
};
