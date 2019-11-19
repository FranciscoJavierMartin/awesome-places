import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { enableScreens } from 'react-native-screens';
import PlacesNavigation from './src/navigation/PlacesNavigation';
import placesReducer from './src/store/reducers/places-reducer';
import { IGlobalState } from './src/interfaces/state';
import { init } from './src/helpers/db';

init();

enableScreens();

const rootReducer = combineReducers<IGlobalState>({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}
