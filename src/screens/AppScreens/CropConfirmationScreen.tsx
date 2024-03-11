import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import Toast from 'react-native-root-toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const CropConfirmationScreen = ({ route }) => {
  const imageData = route.params.image;
  const prevImageData = route.params.prevImage ?? undefined;

  console.log(imageData);
  const navigation = useNavigation<NavigationProp<any>>();
  const extractData = async () => {
    const firstSideData =
      prevImageData == undefined
        ? await TextRecognition.recognize(
            prevImageData.path,
            TextRecognitionScript.JAPANESE,
          )
        : await TextRecognition.recognize(
            imageData.path,
            TextRecognitionScript.JAPANESE,
          );
    const secondSideData =
      prevImageData != undefined
        ? await TextRecognition.recognize(
            imageData.path,
            TextRecognitionScript.JAPANESE,
          )
        : undefined;

    const ocrText =
      secondSideData != undefined
        ? firstSideData.text + secondSideData.text
        : firstSideData.text;
    Toast.show(ocrText, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    navigation.navigate('CardStack', {
      screen: 'EditCardScreen',
      params: {
        create: true,
        cardDetails: {
          card_name: '',
          email: '',
          phone: '',
          job_title: '',
          company_name: '',
          company_website: '',
        },
      },
    });
  };

  const takeImage = async (prevImage) => {
    ImagePicker.openCamera({
      cropping: true,
      width: 3000,
      height: 1500,
      freeStyleCropEnabled: true,
    }).then(async (image) => {
      navigation.navigate('CardStack', {
        screen: 'CropConfirmationScreen',
        params: { image, prevImage },
      });
    });
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={
            prevImageData && prevImageData.path
              ? { uri: prevImageData.path }
              : imageData && imageData.path
              ? { uri: imageData.path }
              : require('../../assets/images/addNewImage.png')
          }
          style={styles.image}
        />
        {prevImageData == undefined ? (
          <TouchableOpacity onPress={() => takeImage(imageData)}>
            <Image source={require('../../assets/images/addNewImage.png')} />
          </TouchableOpacity>
        ) : (
          <Image
            source={
              imageData && imageData.path
                ? { uri: imageData.path }
                : require('../../assets/images/addNewImage.png')
            }
            style={styles.image}
          />
        )}
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
