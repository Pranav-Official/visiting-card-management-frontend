import React from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';

const SetContactNameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.chooseText}>Choose a Name for the</Text>
      <Text style={styles.newContact}>New Contact</Text>
      <View style={styles.inputText}>
        <TextInput
          placeholder={'New Contact Name'}
          style={styles.contactName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ProfileButtonComponent title={'Go Back'} danger={true} />
        <MainButtonComponent
          title="Save"
          onPressing={() => {
            console.log('Save');
          }}
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
