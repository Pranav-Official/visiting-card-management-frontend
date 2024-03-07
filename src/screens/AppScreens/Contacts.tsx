import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactListComponent from '../../components/ContactListComponent';
import { getContactList } from '../../hooks/contactListHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import ContactShimmer from '../../components/Shimmers/ContactShimmer';

type contact = {
  card_id: string;
  contact_name: string;
};

const ContactsPage = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [contactList, setContactList] = useState<contact[]>([]);
  const [loading, setLoading] = useState(true);

  const get = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) || '';
    const token = (await getLocalItem(Constants.USER_JWT)) || '';
    const response = await getContactList(user_id, token);
    if (response.status === false) {
      return;
    } else {
      setContactList(
        response.data.sort((a: contact, b: contact) =>
          a.contact_name.localeCompare(b.contact_name),
        ),
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const contactPage = (id: string, name: string) => {
    console.log('contactPage', id, name);

    navigation.navigate('CardStack', {
      screen: 'CardListScreen',
      params: { card_id: id, name: name },
    });
  };

  const goToSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>
      <TouchableOpacity onPress={goToSearchScreen}>
        <SearchBarComponent editable={false} />
      </TouchableOpacity>

      {loading ? (
        <ContactShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
          data={contactList}
          renderItem={({ item }) => (
            <ContactListComponent
              contactName={item.contact_name}
              onPress={() => contactPage(item.card_id, item.contact_name)}
            />
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
