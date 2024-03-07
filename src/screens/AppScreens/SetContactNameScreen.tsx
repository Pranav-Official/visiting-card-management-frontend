import React, { useState } from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { newCardDetails } from '../../hooks/createCardHook';

const SetContactNameScreen = ({ route }: any) => {

  const { cardDetails } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();
  const [newContactName, setNewContactName] = useState('');

  const createCard = async () => {
    try {
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '{}';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '{}';

      // Set the new contact name in the cardDetails
      const updatedCardDetails = {
        ...cardDetails,
        contact_name: newContactName,
      };

      // calling createNewCard Hook
      const response = await newCardDetails({
        user_id,
        jwtToken,
        card_id: route.params.card_id,
        newData: updatedCardDetails,
      });

      const newStatus = response.statusCode;

      // if save successful, navigating to home screen 
      if (newStatus === '200') {
          navigation.navigate('Home', {});
      }
    } catch (error) {
      console.error('Error creating new card:', error);
    }
  };

  return (
    <View style={styles.container}>
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
        <ProfileButtonComponent title={'Go Back'} danger={true} />
        <MainButtonComponent
          title="Save"
          onPressing={createCard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    flex: 1,
    padding: 40,
    paddingTop: '70%',
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
});

export default SetContactNameScreen;
