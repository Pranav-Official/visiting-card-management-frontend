import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Toast from 'react-native-root-toast';
import {
  NavigationProp,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import { aiDetailsExtraction } from '../../hooks/aiDetailsExtraction';
import colors from '../../utils/colorPallete';

const CropConfirmationScreen = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [extractionError, setExtractionError] = useState(false);
  const [timer, setTimer] = useState(0);

  const imageData = route.params.image;
  // console.log(imageData);
  const navigation = useNavigation<NavigationProp<any>>();

  const startTimer = async (number: number) => {
    for (let i = number; i >= 0; i--) {
      setTimer(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const Predict = async (rawText: string) => {
    try {
      setIsModalVisible(true);
      startTimer(6);
      // const rawText =
      //   'GOLFERS PGA ASSOCIATION PGA TM AMERICA 1916 全米プロゴルフ協会 ケイシー・M・モートン 放送・新規メディアマーケティング担当部長 33418米国フロリダ州パームビーチガーデンズ市 アベニューオブザチャンピオンズ 100番地 : +1 (561 ) 624-8811 : +1 (561) 541-3342 FAX: +1 (561 ) 443-1234 Eメール: cma-pga@pgahq.com • www.pga.com';
      const response = await aiDetailsExtraction(rawText);
      if (response.status) {
        console.log('object received', response.data);
        const card_details = {
          card_name: response.data.fullname,
          job_title: response.data['job-title'],
          email: response.data.email,
          company_name: response.data.company,
          company_website: response.data.website,
          phone: response.data.phone,
        };
        console.log('object made', card_details);
        setIsModalVisible(false);
        const popAction = StackActions.pop(2);
        navigation.dispatch(popAction);
        navigation.navigate('CardStack', {
          screen: 'EditCardScreen',
          params: { create: true, cardDetails: card_details },
        });
      } else {
        setExtractionError(true);
        startTimer(4);
        setTimeout(() => {
          navigation.navigate('CardStack', {
            screen: 'EditCardScreen',
            params: { create: true, cardDetails: {} },
          });
        }, 6000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const extractData = async () => {
    // console.log('GGGG');
    const result = await TextRecognition.recognize(imageData.path);
    // console.log('OCR Text\n');
    Toast.show(result.text + 'Hello', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
    Predict(result.text);
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
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {extractionError ? (
              <>
                <Text style={styles.modalText}>
                  Something went wrong during extraction
                </Text>
                <Text style={styles.modalText}>
                  Please enter details manually
                </Text>
                <Text style={styles.timer}>
                  Moving to manual entry in {timer} seconds
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.modalText}>
                  Please wait while the details are being extracted
                </Text>
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    style={styles.loading}
                    size="large"
                    color={colors['primary-text']}
                  />
                </View>
                <Text style={styles.timer}>
                  Estimated time: {timer} seconds
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  container: {
    backgroundColor: colors['secondary-light'],
    color: colors['primary-text'],
    flex: 1,
  },
  text: {
    color: colors['primary-text'],
    fontSize: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors['primary-text'],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  loading: {
    backgroundColor: colors['secondary-light'],
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
  timer: {
    color: colors['primary-text'],
    fontSize: 15,
  },
});

export default CropConfirmationScreen;
