import React, { useEffect } from 'react';
import { StyleSheet, Platform, FlatList } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import placesActions from '../store/actions/places-actions';
import { IPlacesListScreenParams } from '../interfaces/params';
import { IGlobalState } from '../interfaces/state';
import Place from '../models/Place';
import PlaceItem from '../components/PlaceItem';

interface IPlacesListScreenProps
  extends NavigationStackScreenProps<
    IPlacesListScreenParams,
    IPlacesListScreenProps
  > {}

const PlacesListScreen: NavigationStackScreenComponent<
  IPlacesListScreenParams,
  IPlacesListScreenProps
> = (props: IPlacesListScreenProps) => {
  const places = useSelector<IGlobalState, Place[]>(
    (state: IGlobalState) => state.places.places
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item: Place) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          image={item.imageUri}
          title={item.title}
          address={item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetailScreen',{
              placeTitle: item.title,
              placeId: item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IPlacesListScreenParams,
    IPlacesListScreenProps
  >
) => {
  return {
    headerTitle: 'All places',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navigationData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
