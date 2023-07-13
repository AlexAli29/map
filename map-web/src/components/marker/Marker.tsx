import { MarkerType } from "src/enums/marker-type.enum";
import {
	FoodMarker,
	MiscMarker,
	CarMarker,
	BankMarker,
	CafeMarker,
	FuelMarker,
	AdultMarker,
	SleepMarker,
	SportMarker,
	NatureMarker,
	CultureMarker,
	CyclingMarker,
	HistoryMarker,
	ReligionMarker,
	ShoppingMarker,
	IndustrialMarker,
	ArchitectureMarker,
	EntertainmentMarker,
} from "src/ui/icons/markers";

export const Marker = ({ markerType }: { markerType: MarkerType }) => {
	return {
		food: <FoodMarker />,
		misc: <MiscMarker />,
		car: <CarMarker />,
		bank: <BankMarker />,
		cafe: <CafeMarker />,
		fuel: <FuelMarker />,
		adult: <AdultMarker />,
		sleep: <SleepMarker />,
		sport: <SportMarker />,
		nature: <NatureMarker />,
		culture: <CultureMarker />,
		cycling: <CyclingMarker />,
		history: <HistoryMarker />,
		religion: <ReligionMarker />,
		shopping: <ShoppingMarker />,
		industrial: <IndustrialMarker />,
		architecture: <ArchitectureMarker />,
		entertainment: <EntertainmentMarker />,
	}[markerType];
};
