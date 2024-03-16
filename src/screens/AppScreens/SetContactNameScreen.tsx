import React, { useState } from 'react';
import colors from '../../utils/colorPallete';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { newCardDetails } from '../../hooks/createCardHook';
import { acceptNewCard } from '../../hooks/acceptCardHook';
import Toast from 'react-native-root-toast';
import cloudinaryUpload from '../../hooks/cloudinaryUpload';
import CardComponent from '../../components/CardComponent';

const SetContactNameScreen = ({ route }: any) => {
  const { cardDetails, sharing } = route.params;
  const [imageUploadProcessing, setImageUploadProcessing] = useState(false);
  console.log('\n\nSharing Status = ', sharing);
  const navigation = useNavigation<NavigationProp<any>>();
  const [newContactName, setNewContactName] = useState(
    route.params.cardDetails.card_name,
  );

  //Calling create card hook
  const createCard = async (sharing: boolean) => {
    try {
      if (!newContactName.trim()) {
        Toast.show('Please enter a name for the new contact', {
          position: Toast.positions.BOTTOM,
          duration: Toast.durations.LONG,
        });
        return;
      }
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '{}';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '{}';

      // Set the new contact name in the cardDetails
      let updatedCardDetails = {
        ...cardDetails,
        contact_name: newContactName,
      };

      // calling createNewCard Hook
      let response;
      if (sharing == true) {
        response = await acceptNewCard({
          user_id,
          jwtToken,
          card_id: route.params.card_id,
          newData: updatedCardDetails,
        });
      } else {
        if (cardDetails.img_front_link) {
          setImageUploadProcessing(true);
          const frontImgURL = await cloudinaryUpload({
            uri: cardDetails.img_front_link,
            type: 'image/jpeg',
            name: 'frontImg.jpg',
          });

          updatedCardDetails = {
            ...updatedCardDetails,
            img_front_link: frontImgURL,
          };
        }
        if (cardDetails.img_back_link) {
          const backImgURL = await cloudinaryUpload({
            uri: cardDetails.img_back_link,
            type: 'image/jpeg',
            name: 'backImg.jpg',
          });

          updatedCardDetails = {
            ...updatedCardDetails,
            img_back_link: backImgURL,
          };
        }
        response = await newCardDetails({
          user_id,
          jwtToken,
          card_id: route.params.card_id,
          newData: updatedCardDetails,
        });
      }

      const newStatus = response.statusCode;

      // if save successful, navigating to home screen
      if (newStatus === '200') {
        if (sharing === true) {
          navigation.dispatch(StackActions.pop(1));
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'Home' }],
            }),
          );
          navigation.navigate('Home', {});
        }
      }
    } catch (error) {
      console.error('Error creating new card:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CardComponent
        name={cardDetails.card_name}
        job_position={cardDetails.job_title}
        email={cardDetails.email}
        phone_number={cardDetails.Phone}
        company_name={cardDetails.company_name}
      ></CardComponent>
      <Text style={styles.chooseText}>Choose a Name for the</Text>
      <Text style={styles.newContact}>New Contact</Text>
      <View style={styles.inputText}>
        <TextInput
          placeholder={'New Contact Name'}
          style={styles.contactName}
          value={newContactName}
          onChangeText={(text) => setNewContactName(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButtonComponent
          title={'Go Back'}
          onPressing={() => navigation.goBack()}
          backgroundColor={colors['accent-white']}
          textColor={colors['primary-text']}
          isHighlighted={true}
        />
        {!imageUploadProcessing ? (
          <PrimaryButtonComponent
            title="Save"
            onPressing={() => (sharing ? createCard(true) : createCard(false))}
          />
        ) : (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors['secondary-light']}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    flex: 1,
    padding: 40,
    paddingTop: '40%',
  },
  chooseText: {
    color: colors['primary-text'],
    fontSize: 30,
  },
  newContact: {
    color: colors['primary-text'],
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: '50%',
    paddingTop: 10,
    height: '100%',
    gap: 10,
  },
  inputText: {
    borderWidth: 1.5,
    marginTop: 30,
    borderRadius: 5,
  },
  contactName: {
    fontSize: 22,
    color: colors['primary-text'],
  },
  loading: {
    backgroundColor: colors['primary-accent'],
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
});

export default SetContactNameScreen;
