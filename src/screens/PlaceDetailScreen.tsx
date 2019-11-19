import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { IPlaceDetailScreenParams } from '../interfaces/params';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import MapPreview from '../components/MapPreview';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../interfaces/state';
import Place from '../models/Place';
import Colors from '../constants/Colors';

interface IPlaceDetailScreenProps
  extends NavigationStackScreenProps<
    IPlaceDetailScreenParams,
    IPlaceDetailScreenProps
  > {}

const PlaceDetailScreen: NavigationStackScreenComponent<
  IPlaceDetailScreenParams,
  IPlaceDetailScreenProps
> = (props: IPlaceDetailScreenProps) => {
  const placeId = props.navigation.getParam('placeId');
  const selectedPlace = useSelector<IGlobalState, Place>(
    (state: IGlobalState) =>
      state.places.places.find((place: Place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = (): void => {
    props.navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation
    });
  };
  
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          location={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IPlaceDetailScreenParams,
    IPlaceDetailScreenProps
  >
) => {
  return {
    headerTitle: navigationData.navigation.getParam('placeTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
