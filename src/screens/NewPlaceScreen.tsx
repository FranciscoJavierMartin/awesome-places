import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { INewPlaceScreenParams } from "../interfaces/params";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from "react-navigation-stack";

interface INewPlaceScreenProps
  extends NavigationStackScreenProps<
    INewPlaceScreenParams,
    INewPlaceScreenProps
  > {}

const NewPlaceScreen: NavigationStackScreenComponent<
  INewPlaceScreenParams,
  INewPlaceScreenProps
> = (props: INewPlaceScreenProps) => {
  return <View></View>;
};

NewPlaceScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    INewPlaceScreenParams,
    INewPlaceScreenProps
  >
) => {
  return {
    headerTitle: 'Add place',
  };
};

const styles = StyleSheet.create({});

export default NewPlaceScreen;
