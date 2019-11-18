import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; 
import HeaderButton from '../components/HeaderButton';

import { IPlacesListScreenParams } from '../interfaces/params';

interface IPlacesListScreenProps
  extends NavigationStackScreenProps<
    IPlacesListScreenParams,
    IPlacesListScreenProps
  > {}

const PlacesListScreen: NavigationStackScreenComponent<
  IPlacesListScreenParams,
  IPlacesListScreenProps
> = (props: IPlacesListScreenProps) => {
  return <View></View>;
};

PlacesListScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IPlacesListScreenParams,
    IPlacesListScreenProps
  >
) => {
  return {
    headerTitle: 'All places',
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Add place' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => {
        navigationData.navigation.navigate('NewPlace');
      }}/>

    </HeaderButtons>
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
