import React, { useEffect, useState } from 'react';
import colors from '../../utils/colorPallete';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import { getLocalItem, setLocalItem } from '../../utils/Utils';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../context/userSlice';
import Constants from '../../utils/Constants';
import { getPendingCards } from '../../hooks/getPendingCardsHook';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import CardComponent from '../../components/CardComponent';
import { NavigationProp, useNavigation } from '@react-navigation/native';

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

const HomeScreen = () => {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [pendingCardList, setPendingCardList] = React.useState<UserData>({
    user_id: '',
    user_fullname: '',
    user_email: '',
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
    console.log('Saved');
  };

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
      <PrimaryButtonComponent title="Logout" onPressing={Logout} />

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
            <PrimaryButtonComponent
              title="Save shared cards"
              onPressing={() => handleSave()}
            ></PrimaryButtonComponent>
            <PrimaryButtonComponent
              title="I'll do it later"
              onPressing={() => setModalVisibility(false)}
              backgroundColor={colors['accent-white']}
              textColor={colors['primary-danger']}
            ></PrimaryButtonComponent>
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
