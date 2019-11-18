import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from "react-navigation-stack";
import { IMapScreenParams } from "../interfaces/params";

interface IMapScreenProps extends NavigationStackScreenProps<
IMapScreenParams,
IMapScreenProps
> {}

const MapScreen:  NavigationStackScreenComponent<
IMapScreenParams,
IMapScreenProps> = (props: IMapScreenProps) => {
  return(
    <View></View>
  );
};

MapScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IMapScreenParams,
    IMapScreenProps
  >
) => {
  return {};
};

const styles = StyleSheet.create({

});

export default MapScreen;