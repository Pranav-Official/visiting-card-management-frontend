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
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import RadioButton from '../../components/RadioButton';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
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
      <Text style={styles.contactName}>{item.user_fullname}</Text>
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
  const pendingCardList: UserData[] = route.params.pendingCardList;
  const [cardList] = useState(pendingCardList);
  

  const [selected, setSelected] = useState<string[]>(['']);
  const navigation=useNavigation();
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
        Save the Cards
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
          <MainButtonComponent title="Save"  />
        </View>
        <View style={{ flex: 1 }}>
          <ProfileButtonComponent
            title="Later"
            onPressing={()=>navigation.goBack()}
          />
        </View>
      </View>
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
    color: colors['primary-text'],
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
