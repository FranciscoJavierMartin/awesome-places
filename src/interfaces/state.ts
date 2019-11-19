import Place from '../models/Place';

export interface IPlaceState {
  places: Place[];
}

export interface IGlobalState {
  places: IPlaceState;
}
