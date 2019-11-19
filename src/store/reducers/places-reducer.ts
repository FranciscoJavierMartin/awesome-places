import {
  IAction,
  IActionAddPlace,
  IActionSetPlaces
} from './../../interfaces/action';
import { IPlaceState } from '../../interfaces/state';
import { ADD_PLACE } from '../actions/places-actions';
import Place from '../../models/Place';

const initialState: IPlaceState = {
  places: []
};

export default (
  state: IPlaceState = initialState,
  action: IAction
): IPlaceState => {
  let newState: IPlaceState;

  switch (action.type) {
    case ADD_PLACE:
      const {
        id,
        title,
        image,
        address,
        coords
      } = action.payload as IActionAddPlace;
      const newPlace = new Place(
        id.toString(),
        title,
        image,
        address,
        coords.lat,
        coords.lng
      );
      newState = {
        ...newState,
        places: state.places.concat(newPlace)
      };
      break;
    case ADD_PLACE:
      const { places } = action.payload as IActionSetPlaces;
      newState = {
        ...state,
        places: places.map(
          (place: Place) =>
            new Place(
              place.id,
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        )
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
