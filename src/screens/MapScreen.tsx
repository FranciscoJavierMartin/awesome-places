import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import MapView, { Marker } from 'react-native-maps';
import { IMapScreenParams } from '../interfaces/params';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';
import Colors from '../constants/Colors';

interface IMapScreenProps
  extends NavigationStackScreenProps<IMapScreenParams, IMapScreenProps> {}

const MapScreen: NavigationStackScreenComponent<
  IMapScreenParams,
  IMapScreenProps
> = (props: IMapScreenProps) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 0,
    longitude: initialLocation ? initialLocation.lng : 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = (event: any): void => {
    if (!readonly) {
      setSelectedLocation({
        lat: event.nativeEvent.coordinate.latitude,
        lng: event.nativeEvent.coordinate.longitude
      });
    }
  };

  const savedPickedLocation = useCallback((): void => {
    if (selectedLocation) {
      props.navigation.navigate('NewPlace', {
        pickedLocation: selectedLocation
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savedPickedLocation });
  }, [savedPickedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked location' coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<IMapScreenParams, IMapScreenProps>
) => {
  const saveFn = navigationData.navigation.getParam('saveLocation');
  const readonly = navigationData.navigation.getParam('readonly');

  return readonly
    ? {}
    : {
        headerRight: (
          <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        )
      };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
