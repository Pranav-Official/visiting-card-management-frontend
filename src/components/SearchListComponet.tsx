import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import nameToColor from '../hooks/nameToHex';
type Contact = {
  contactName: string;
  onPress?: () => void;
  matchIndex: number;
  matchType: string;
  matchString: string;
  matchLength: number;
  searchText: string;
};
const SearchListComponent = ({
  contactName,
  onPress,
  matchIndex,
  matchString,
  matchType,
  matchLength,
  searchText,
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
      fontSize: matchType === 'name' || matchType === 'none' ? 26 : 22,
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
      display:
        matchType === 'contact_name' || matchType === 'none' ? 'none' : 'flex',
    },
    subtext: {
      color: colors['primary-text'],
      fontSize: 14,
    },
  });

  const [maintext, setmaintext] = useState({
    part1: contactName,
    part2: '',
    part3: '',
  });
  const [subtext, setsubtext] = useState({ part1: '', part2: '', part3: '' });

  useEffect(() => {
    if (searchText !== '') {
      if (matchType == 'contact_name') {
        setmaintext({
          part1: contactName.slice(0, matchIndex),
          part2: contactName.slice(matchIndex, matchIndex + matchLength),
          part3: contactName.slice(
            matchIndex + matchLength,
            matchString.length,
          ),
        });
      } else {
        setmaintext({ part1: contactName, part2: '', part3: '' });
        setsubtext({
          part1: matchString.slice(0, matchIndex),
          part2: matchString.slice(matchIndex, matchIndex + matchLength),
          part3: matchString.slice(
            matchIndex + matchLength,
            matchString.length,
          ),
        });
      }
    }
  }, [searchText]);

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
            <Text style={styles.nameText}>{maintext.part1}</Text>
            <Text style={[styles.nameText, { fontWeight: 'bold' }]}>
              {maintext.part2}
            </Text>
            <Text style={styles.nameText}>{maintext.part3}</Text>
          </View>
          <View style={styles.subTestContainer}>
            <Text style={styles.subtext}>{subtext.part1}</Text>
            <Text style={[styles.subtext, { fontWeight: 'bold' }]}>
              {subtext.part2}
            </Text>
            <Text style={styles.subtext}>{subtext.part3}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchListComponent;
