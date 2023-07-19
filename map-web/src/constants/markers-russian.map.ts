import { MarkerType } from "src/constants/marker-type.enum";

export const MarkerTypeRussianMap: { [key in MarkerType]: string } = {
	[MarkerType.Food]: "Eда",
	[MarkerType.Misc]: "Разное",
	[MarkerType.Car]: "Автомобиль",
	[MarkerType.Bank]: "Банк",
	[MarkerType.Cafe]: "Кафе",
	[MarkerType.Fuel]: "Топливо",
	[MarkerType.Adult]: "Взрослый",
	[MarkerType.Sleep]: "Место для сна",
	[MarkerType.Sport]: "Спорт",
	[MarkerType.Nature]: "Природа",
	[MarkerType.Culture]: "Культура",
	[MarkerType.History]: "История",
	[MarkerType.Religion]: "Религия",
	[MarkerType.Shopping]: "Магазины",
	[MarkerType.Industrial]: "Индустриальные объекты",
	[MarkerType.Architecture]: "Архитектура",
	[MarkerType.Entertainment]: "Развлечения",
	[MarkerType.Cycling]: "Велосипеды",
};
