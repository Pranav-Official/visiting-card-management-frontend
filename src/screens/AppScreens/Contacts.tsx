/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactListComponent from '../../components/ContactListComponent';
import { getContactList } from '../../hooks/contactListHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import ContactShimmer from '../../components/Shimmers/ContactShimmer';

const DATA = [
  {
    card_id: '1',
    contact_name: '',
  },
];

const ContactsPage = () => {
  const [contactList, setContactList] = useState(DATA);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(DATA);
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);

  const get = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) || '';
    const token = (await getLocalItem(Constants.USER_JWT)) || '';
    const response = await getContactList(user_id, token);
    if (response.status === false) {
      return;
    } else {
      setContactList(
        response.data.sort((a: any, b: any) =>
          a.contact_name.localeCompare(b.contact_name),
        ),
      );
      setSearchResults(
        response.data.sort((a: any, b: any) =>
          a.contact_name.localeCompare(b.contact_name),
        ),
      );
      // console.log(' get', 'user_id ' + user_id, 'token ' + token);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log('useEffect', searchText);
    if (searchText === '') {
      setSearchResults(contactList);
    } else {
      setSearchResults(
        contactList
          .filter((contact: any) =>
            contact.contact_name
              .toLowerCase()
              .includes(searchText.toLowerCase()),
          )
          .sort((a, b) => {
            const indexA = a.contact_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase());
            const indexB = b.contact_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase());
            return indexA - indexB;
          }),
      );
    }
  }, [searchText]);

  const flatListRef = useRef(null);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    get();
  }, []);

  const contactPage = (id: string, name: string) => {
    const navigation = useNavigation<NavigationProp<any>>();
    navigation.navigate('CardListStack', { name: name, id: id });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>
      <SearchBarComponent />
      {loading ? (
        <ContactShimmer />
      ) : (
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
          data={searchResults}
          renderItem={({ item }) => (
            <ContactListComponent contactName={item.contact_name} />
          )}
          keyExtractor={(item) => item.card_id}
          scrollEventThrottle={16}
        />
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 50,
          right: 30,
          backgroundColor: colors['primary-accent'],
          borderRadius: 18,
          padding: 9,
          paddingTop: 7,
        }}
      >
        <Ionicons name="camera" size={48} color={colors['secondary-accent']} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    padding: 28,
    paddingTop: 36,
    backgroundColor: colors['secondary-light'],
    height: '100%',
    overflow: 'scroll',
  },
  headerContainer: {},
  headerTitle: {
    fontSize: 50,
    marginTop: 60,
    color: colors['primary-text'],
  },
});

export default ContactsPage;
