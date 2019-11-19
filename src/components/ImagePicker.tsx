import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { verifyPermissions } from '../helpers/permissions';
import Colors from '../constants/Colors';

interface IImageSelecterProps {
  onImageTaken: (uri: string) => void;
}

const ImagePkr = (props: IImageSelecterProps) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async (): Promise<void> => {
    const hasPermission = await verifyPermissions(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
      });

      if (!image.cancelled) {
        // FIXME: Change the type properly, now works but show an error.
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
      }
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
        <Button
          title='Take image'
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImagePkr;
