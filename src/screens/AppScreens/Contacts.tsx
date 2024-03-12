/* eslint-disable react-native/no-inline-styles */
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
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import ContactShimmer from '../../components/Shimmers/ContactShimmer';
import { getPendingCards } from '../../hooks/getPendingCardsHook';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import CardComponent from '../../components/CardComponent';

const DATA = [
  {
    card_id: '1',
    contact_name: '',
  },
];

type Card = {
  card_id: string;
  card_name: string;
  img_front_link: string;
  img_back_link: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  contact_name: string;
  user_id: string;
};

type UserData = {
  user_id: string;
  user_fullname: string;
  user_email: string;
  cards: Card[];
};

const ContactsPage = () => {
  const [cardDetail, setCardDetail] = useState({
    card_name: '',
    job_title: '',
    email: '',
    phone: '',
    company_name: '',
    company_website: '',
  });
  const navigation = useNavigation<NavigationProp<any>>();
  const [contactList, setContactList] = useState(DATA);
  const [loading, setLoading] = useState(true);

  const [pendingCardList, setPendingCardList] = React.useState<UserData>({
    user_id: '',
    user_fullname: '',
    user_email: '',
    cards: [],
  });

  const [modalVisibility, setModalVisibility] = React.useState(false);

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
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.pendingCardsContainer}>
      <Text style={styles.userNameInModal}>From {item.user_fullname}</Text>

      {item.cards.map((card: Card) => (
        <View style={styles.singleCard} key={card.user_id}>
          <CardComponent
            key={card.card_id}
            alignToSides={false}
            job_position={card.job_title}
            name={card.card_name}
            email={card.email}
            phone_number={card.phone}
            company_name={card.company_name}
          />
        </View>
      ))}
    </View>
  );

  //calling get pending cards function
  const getPendingCardsList = async () => {
    try {
      const user_id = (await getLocalItem(Constants.USER_ID)) || '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) || '';
      const pendingCards = await getPendingCards({ user_id, jwtToken });

      if (pendingCards.statusCode !== '200') {
        return;
      }

      if (
        pendingCards.pendingCardList &&
        pendingCards.pendingCardList.length > 0
      ) {
        setModalVisibility(true);
        setPendingCardList(pendingCards.pendingCardList);
      } else {
        setModalVisibility(false);
      }
    } catch (error) {
      console.log('\n\nCatch Error\n\n');
    }
  };
  useEffect(() => {
    try {
      getPendingCardsList();
    } catch (error) {
      console.log('\n\nCatch Error\n\n');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await get();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []),
  );

  const contactPage = (id: string, name: string) => {
    console.log('contactPage', id, name);

    navigation.navigate('CardStack', {
      screen: 'CardListScreen',
      params: { card_id: id, name: name },
    });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('search');
        }}
      >
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
        onPress={() => {
          navigation.navigate('CardStack', {
            screen: 'EditCardScreen',
            params: { create: true, cardDetails: cardDetail },
          });
        }}
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

      <BottomSheetComponent
        visibility={modalVisibility}
        visibilitySetter={setModalVisibility}
      >
        <View style={styles.modalView}>
          <Text style={styles.pendingCardsText}>
            The following cards have been shared with you.
          </Text>

          <FlatList
            data={pendingCardList}
            renderItem={renderItem}
            keyExtractor={(item) => item.card_id}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.pendingCardsText}>Choose an Option</Text>
            <MainButtonComponent
              title="Save shared cards"
              onPressing={() => setModalVisibility(false)}
            ></MainButtonComponent>
            <ProfileButtonComponent
              title="I'll do it later"
              onPressing={() => setModalVisibility(false)}
              danger={true}
            ></ProfileButtonComponent>
          </View>
        </View>
      </BottomSheetComponent>
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
  //Modal Stylings
  modalView: {
    marginHorizontal: 25,
    height: '100%',
  },
  pendingCardsText: {
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pendingCardsContainer: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
  userNameInModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors['primary-text'],
    paddingVertical: 10,
    marginLeft: 10,
  },
  singleCard: {
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    height: 200,
    marginBottom: 25,
  },
});

export default ContactsPage;
