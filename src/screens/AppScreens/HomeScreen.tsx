import React, { useEffect, useState } from 'react';
import colors from '../../utils/colorPallete';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MainButtonComponent from '../../components/MainButtoncomponent';
import { getLocalItem, setLocalItem } from '../../utils/Utils';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../context/userSlice';
import Constants from '../../utils/Constants';
import { getPendingCards } from '../../hooks/getPendingCardsHook';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import CardComponent from '../../components/CardComponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getSimilarCards } from '../../hooks/getSimilarCardsHook';

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

type ContactCards = {
  contact_name: string;
  cards: Card[];
};

const HomeScreen = () => {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [similarModalVisibility, setSimilarModalVisibility] =
    React.useState(false);
  const [pendingCardList, setPendingCardList] = React.useState<UserData>({
    user_id: '',
    user_fullname: '',
    user_email: '',
    cards: [],
  });
  const [cardDetails, setCardDetails] = useState<Card>();
  const navigation = useNavigation<NavigationProp<any>>();

  const [similarCardList, setSimilarCardList] = React.useState<ContactCards>({
    contact_name: '',
    cards: [],
  });
  const dispatch = useDispatch();

  const Logout = () => {
    setLocalItem(Constants.IS_LOGGED_IN, 'false');
    setLocalItem(Constants.USER_JWT, '');
    setLocalItem(Constants.USER_ID, '');
    dispatch(userLogin(false));
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
        console.log(
          '\n\n[From HomeScreen] PendingCards: ',
          pendingCards.pendingCardList,
        );
        setModalVisibility(true);
        setPendingCardList(pendingCards.pendingCardList);
      } else {
        setModalVisibility(false);
      }
    } catch (error) {
      console.log('\n\nCatch Error\n\n');
    }
  };

  const handleSave = async () => {
    try {
      console.log('\n\nREACHED HANDLE SAVE', pendingCardList);

      // Iterate over each user's pending cards
      for (const user of pendingCardList) {
        // Extract the nested array of cards for the current user
        const cardsArray = user.cards;

        // Ensure that cardsArray is an array
        if (!Array.isArray(cardsArray)) {
          console.log('Invalid cards array:', cardsArray);
          continue; // Move to the next user's pending cards
        }

        // Iterate over each card in the cards array
        for (const card of cardsArray) {
          // Set cardDetails with the details of the current card
          console.log('\n\nREACHED HANDLE SAVE BLAHHH');
          console.log('\n\nHELLO SETTING CARD: ', card);

          //This is Udaayipp
          // const user_id = (await getLocalItem(Constants.USER_ID)) || '';
          // card.user_id = user_id;

          setCardDetails(card);

          const similarCardsExist = await fetchSimilarCards(card);

          console.log('\n\nSimilar Cards FOUND STATUS: ', similarCardList);

          // If similar cards exist for the current card, show the modal
          if (similarCardsExist) {
            setSimilarModalVisibility(true);
          } else {
            console.log('\n\nCard Details to Navigate Are: ', cardDetails);
            // Otherwise, navigate to the "SetContactNameScreen" screen
            navigation.navigate('CardStack', {
              screen: 'SetContactNameScreen',
              params: { cardDetails: card, pageType: 'acceptCard' },
            });
          }
        }
      }
    } catch (error) {
      console.log('Error while handling save:', error);
    }
  };

  const fetchSimilarCards = async (card: Card) => {
    try {
      console.log('\n\nREACHED FETCH SIMILAR Cards\n\n');
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
      console.log('\ncardDetails = ', cardDetails);
      const result = await getSimilarCards({
        user_id,
        card_name: card.card_name,
        phone: card.phone,
        email: card.email,
        jwtToken,
      });

      console.log('Result Is: ', result);

      if (result.statusCode === '200') {
        setSimilarCardList(result.similarCardList);
        console.log('\n\nSimilar Card Data = ', result.similarCardList);
        return true;
      } else {
        console.log('From GSC Hook: Error fetching SimilarCards:', result);
        return false;
      }
    } catch (error) {
      console.log('Error fetching SimilarCards:', error);
      return false;
    }
  };

  // const navigateToPage = async (pageToNavigate: string, card: Card) => {
  //   console.log(
  //     '\n\nSIMILAR CARD LIST: from Edit Card Screen',
  //     similarCardList,
  //     card,
  //   );
  //   const user_id = (await getLocalItem(Constants.USER_ID)) || '';
  //   card.user_id = user_id;
  //   navigation.navigate('CardStack', {
  //     screen: pageToNavigate,
  //     params: { cardDetails: card, pageType: 'acceptCard' },
  //   });
  // };

  useEffect(() => {
    try {
      getPendingCardsList();
    } catch (error) {
      console.log('\n\nCatch Error\n\n');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <MainButtonComponent title="Logout" onPressing={Logout} />

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
              onPressing={() => handleSave()}
            ></MainButtonComponent>
            <ProfileButtonComponent
              title="I'll do it later"
              onPressing={() => setModalVisibility(false)}
              danger={true}
            ></ProfileButtonComponent>
          </View>
        </View>
      </BottomSheetComponent>

      <BottomSheetComponent
        visibility={similarModalVisibility}
        visibilitySetter={setSimilarModalVisibility}
      >
        <View style={styles.modalView}>
          <Text style={styles.similarCardsText}>
            Similar Cards Alredy Exists!
          </Text>

          <FlatList
            data={similarCardList}
            renderItem={renderItem}
            keyExtractor={(item) => item.cards}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.similarCardsText}>Choose an Option</Text>
            <MainButtonComponent
              title="Overwrite Existing Card"
              onPressing={() => {
                navigation.navigate('CardStack', {
                  screen: 'CardOverwriteScreen',
                  params: { similarCardList, cardDetails },
                });
              }}
            ></MainButtonComponent>
            <MainButtonComponent
              title="Add to Existing Contacts"
              onPressing={() => {
                navigation.navigate('CardStack', {
                  screen: 'AddToContactScreen',
                  params: { similarCardList, cardDetails },
                });
              }}
            ></MainButtonComponent>
            <MainButtonComponent
              title="Add as a New Contact"
              onPressing={() => {
                navigation.navigate('CardStack', {
                  screen: 'SetContactNameScreen',
                  params: { cardDetails, pageType: 'acceptCard' },
                });
              }}
            ></MainButtonComponent>
          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    color: colors['primary-text'],
    flex: 1,
  },
  text: {
    color: colors['primary-text'],
    fontSize: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 20,
  },
  loading: {
    backgroundColor: colors['secondary-light'],
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
  timer: {
    color: colors['primary-text'],
    fontSize: 15,
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
  similarCardsText: {
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    height: 200,
    marginBottom: 25,
  },
});

export default HomeScreen;
