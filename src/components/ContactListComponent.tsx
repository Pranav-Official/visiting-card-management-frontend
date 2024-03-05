import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import nameToColor from '../hooks/nameToHex';
type Contact = { contactName: string; onPress?: () => void };
const ContactListComponent = ({ contactName, onPress }: Contact) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View
        style={[styles.circle, { backgroundColor: nameToColor(contactName) }]}
      >
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
    marginBottom: 16,
    alignItems: 'center',
  },
  alphabet: {
    color: colors['secondary-light'],
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 0,
  },
  nameText: {
    color: colors['primary-text'],
    fontSize: 25,
    fontFamily: 'roberto',
  },
  circle: {
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
export default ContactListComponent;
 