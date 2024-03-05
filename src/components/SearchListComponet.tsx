import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import nameToColor from '../hooks/nameToHex';
type Contact = {
  contactName: string;
  onPress?: () => void;
  matchIndex: number;
  matchType: string;
};
const SearchListComponent = ({
  contactName,
  onPress,
  matchIndex,
  matchType,
}: Contact) => {
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
      fontSize: matchType === 'name' ? 26 : 22,
      fontFamily: 'roberto',
    },
    circle: {
      borderRadius: 27,
      height: 54,
      width: 54,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subTestContainer: {
      flexDirection: 'row',
      display: matchType === 'name' ? 'none' : 'flex',
    },
    subtext: {
      color: colors['primary-text'],
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[styles.circle, { backgroundColor: nameToColor(contactName) }]}
        >
          <Text style={styles.alphabet}>{contactName[0]}</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.nameText}>Mak</Text>
            <Text style={[styles.nameText, { fontWeight: 'bold' }]}>oto</Text>
            <Text style={styles.nameText}>Shinkai</Text>
          </View>
          <View style={styles.subTestContainer}>
            <Text style={styles.subtext}>342</Text>
            <Text style={[styles.subtext, { fontWeight: 'bold' }]}>0987</Text>
            <Text style={styles.subtext}>212</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchListComponent;
