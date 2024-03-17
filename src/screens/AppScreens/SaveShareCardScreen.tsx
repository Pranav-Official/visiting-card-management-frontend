import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../utils/colorPallete';
import CardComponent from '../../components/CardComponent';
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import RadioButton from '../../components/RadioButton';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import SimilarCardsComponent from '../../components/SimilarCardsComponent';
import { getSimilarCards } from '../../hooks/getSimilarCardsHook';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCardIds } from '../../context/selectedCardsSlice';
import { RootState } from '../../context/store';

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

type renderItemType = {
  item: UserData;
  selected: string[];
  setter: (cardIdList: string[]) => void;
};

const RenderItem = ({ item, selected, setter }: renderItemType) => {
  const handleCardPress = (
    selectedCardList: string[],
    currentCardId: string,
  ) => {
    if (selectedCardList.includes(currentCardId)) {
      setter(selectedCardList.filter((cardId) => cardId != currentCardId));
    } else {
      setter([...selected, currentCardId]);
    }
  };

  return (
    <View
      style={[
        styles.similarCardsContainer,
        { flexDirection: 'column', marginBottom: 20, gap: 20 },
      ]}
    >
      <Text style={styles.contactName}> From User: {item.user_fullname}</Text>
      {item.cards.map((card: Card) => (
        <View style={{ flexDirection: 'row' }} key={card.card_id}>
          <TouchableOpacity
            style={{ flex: 1, paddingTop: 5 }}
            onPress={() => handleCardPress(selected, card.card_id)}
          >
            {selected?.includes(card.card_id) ? (
              <RadioButton selected={true} />
            ) : (
              <RadioButton />
            )}
          </TouchableOpacity>
          <View style={{ flex: 6 }}>
            <CardComponent
              alignToSides={false}
              job_position={card.job_title}
              name={card.card_name}
              email={card.email}
              phone_number={card.phone}
              company_name={card.company_name}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const SaveShareCardScreen = ({ route }: any) => {
  const dispatch = useDispatch();
  const [similarModalVisibility, setSimilarModalVisibility] =
    React.useState(false);

  const pendingCardList: UserData[] = route.params.pendingCardList;

  const [similarCardList, setSimilarCardList] = React.useState<ContactCards>({
    contact_name: '',
    cards: [],
  });
  const [cardDetails, setCardDetails] = useState<Card>();
  const [cardList] = useState(pendingCardList);
  const [selected, setSelected] = useState<string[]>([]);
  const reduxSelectedCardIds = useSelector(
    (state: RootState) => state.selectedCardReducer.selectedCardIds,
  );
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSave = async () => {
    try {
      dispatch(setSelectedCardIds(selected));
    } catch (error) {
      console.log('Error while handling save:', error);
    }
  };

  const fetchSimilarCards = async (card: Card) => {
    try {
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error fetching SimilarCards:', error);
      return false;
    }
  };
  return (
    <View style={{ padding: 18, flex: 1 }}>
      <Text
        style={{
          fontSize: 28,
          color: colors['primary-text'],
          fontWeight: '600',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Choose the cards to save
      </Text>
      <FlatList
        data={cardList}
        renderItem={({ item }) => {
          return (
            <RenderItem item={item} selected={selected} setter={setSelected} />
          );
        }}
        keyExtractor={(item) => item.user_id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <PrimaryButtonComponent title="Save" onPressing={handleSave} />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButtonComponent
            title="Later"
            backgroundColor={colors['accent-white']}
            textColor={colors['primary-text']}
            onPressing={() => navigation.goBack()}
            isHighlighted={true}
          />
        </View>
      </View>

      <BottomSheetComponent
        visibility={similarModalVisibility}
        visibilitySetter={setSimilarModalVisibility}
      >
        <SimilarCardsComponent
          similarCardList={similarCardList}
          cardDetails={cardDetails}
          sharing={true}
          modalVisibilitySetter={setSimilarModalVisibility}
        ></SimilarCardsComponent>
      </BottomSheetComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors['secondary-light'],
  },
  similarCardsText: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  similarCardsContainer: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    borderRadius: 14,
    width: '100%',
  },
  contactName: {
    paddingStart: 10,
    fontSize: 24,
    color: colors['secondary-accent'],
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    height: 100,
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default SaveShareCardScreen;
