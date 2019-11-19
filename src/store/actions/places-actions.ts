import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import { IAction } from './../../interfaces/action';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

const addPlace = (
  title: string,
  image: string,
  location: any
): ThunkAction<{}, {}, {}, IAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, IAction>): Promise<void> => {
    const response = await fetch('');

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    const address = resData.results[0].formatted_address;
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        // FIXME: Works properly, but has a wrong type
        payload: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = (): ThunkAction<{}, {}, {}, IAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, IAction>): Promise<void> => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
    } catch (error) {
      throw error;
    }
  };
};

export default {
  addPlace,
  loadPlaces
};
