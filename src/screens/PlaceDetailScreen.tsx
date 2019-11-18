import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IPlaceDetailScreenParams } from "../interfaces/params";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from "react-navigation-stack";

interface IPlaceDetailScreenProps
  extends NavigationStackScreenProps<
    IPlaceDetailScreenParams,
    IPlaceDetailScreenProps
  > {}

const PlaceDetailScreen: NavigationStackScreenComponent<
  IPlaceDetailScreenParams,
  IPlaceDetailScreenProps
> = (props: IPlaceDetailScreenProps) => {
  return <View></View>;
};

PlaceDetailScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IPlaceDetailScreenParams,
    IPlaceDetailScreenProps
  >
) => {
  return {};
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
