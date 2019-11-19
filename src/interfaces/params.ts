
export interface IMapScreenParams {
  saveLocation: () => void;
  readonly: boolean;
  initialLocation: any;
}

export interface INewPlaceScreenParams {
  pickedLocation: any;
}

export interface IPlaceDetailScreenParams{
  placeTitle: string;
  placeId: string;
}

export interface IPlacesListScreenParams {
  
}