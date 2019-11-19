import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import ENV from '../env';

interface IMapPreviewProps {
  onPress: () => void;
  style?: any;
  location: any;
  children?: any;
}

const MapPreview = (props: IMapPreviewProps) => {
  let imagePreviewUrl = props.location ? `` : '';

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
