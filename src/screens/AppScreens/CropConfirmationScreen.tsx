import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Toast from 'react-native-root-toast';

const CropConfirmationScreen = ({ route }) => {
  const imageData = route.params.image;
  console.log(imageData);

  const extractData = async () => {
    console.log('GGGG');
    const result = await TextRecognition.recognize(imageData.path);
    console.log('OCR Text\n');
    Toast.show(result.text + 'Hello', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  };

  return (
    <View style={styles.pageContainer}>
      {/* <Image style={styles.image} source={require('../../assets/images/')} /> */}
      <View style={styles.imageContainer}>
        <Image
          source={
            imageData && imageData.path
              ? { uri: imageData.path }
              : require('../../assets/images/addNewImage.png')
          }
          style={imageData ? styles.image : null}
        />
        <Image source={require('../../assets/images/addNewImage.png')} />
      </View>

      <MainButtonComponent
        title="Extract Card Details"
        onPressing={extractData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    display: 'flex',
    gap: 30,
    paddingVertical: 30,
  },
  image: {
    width: '100%',
    aspectRatio: '5/3',
    borderRadius: 8,
  },
  buttonContainer: {
    height: 50,
  },
});

export default CropConfirmationScreen;
