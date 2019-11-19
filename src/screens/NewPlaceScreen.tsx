import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { INewPlaceScreenParams } from '../interfaces/params';
import Colors from '../constants/Colors';
import placesActions from '../store/actions/places-actions';
import { IAction } from '../interfaces/action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

interface INewPlaceScreenProps
  extends NavigationStackScreenProps<
    INewPlaceScreenParams,
    INewPlaceScreenProps
  > {}

const NewPlaceScreen: NavigationStackScreenComponent<
  INewPlaceScreenParams,
  INewPlaceScreenProps
> = (props: INewPlaceScreenProps) => {
  const [titleValue, setTitleValue] = useState<string>('');
  const [selectedImage, setSelectImage] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setSelectImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const locationPickerHandler = useCallback((location: any) => {
    setSelectedLocation(location);
  },[setSelectedLocation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickerHandler}/>
        <Button title='Save place' color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    INewPlaceScreenParams,
    INewPlaceScreenProps
  >
) => {
  return {
    headerTitle: 'Add place'
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
