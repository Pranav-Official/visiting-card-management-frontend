import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
type Contact = { contactName: string,card_id:string };
const ContactListComponent = ({ contactName,card_id }: Contact) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: colors['primary-danger']}]}>
        <Text style={styles.alphabet}>{contactName[0]}</Text>
      </View>
      <View>
        <Text style={styles.nameText}>{contactName}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 20,
  },
  alphabet: {
    color: '#FFFF',
    fontSize: 25,
    marginTop: 2,
  },
  nameText: {
    color: 'black',
    fontSize: 20,
    marginTop: 23,
    fontFamily: 'roberto',
  },
  circle: {
    borderRadius:27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default ContactListComponent;
