import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import { IAction } from './../../interfaces/action';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

const addPlace = (
  title: string,
  image: string
): ThunkAction<{}, {}, {}, IAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, IAction>): Promise<void> => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(title, newPath, 'Dummy', 1, 1);
      dispatch({
        type: ADD_PLACE,
        // FIXME: Works properly, but has a wrong type
        payload: { id: dbResult.insertId, title: title, image: newPath }
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = (): ThunkAction<{}, {}, {}, IAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, IAction>): Promise<void> => {

    try{
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
    } catch(error){
      throw error;
    }

  };
};

export default {
  addPlace,
  loadPlaces
};
