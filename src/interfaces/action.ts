import Place from "../models/Place";

export interface IActionAddPlace {
  id: number;
  title: string;
  image: string;
}

export interface IActionSetPlaces {
  places: Place[];
}

export interface IAction {
  type: string;
  payload: IActionAddPlace | IActionSetPlaces;
}

