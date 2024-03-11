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
import { overwriteExistingCard } from '../../hooks/overWriteCardHook';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

type Card = {
  card_id: string;
  card_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
  company_website: string;
};
type ContactCard = {
  contact_name: string;
  cards: Card[];
};
type renderItemType = {
  item: ContactCard;
  selected: string;
  setter: (cardId: string) => void;
};
// type ScreenProps = {
//   route: {
//     params: {
//       similarCardList: ContactCard[];
//       cardDetails: Card;
//     };
//   };
// };
type routeParams = {
  CardDetailsScreen: { card_id: string };
};
const RenderItem = ({ item, selected, setter }: renderItemType) => (
  <View
    style={[
      styles.similarCardsContainer,
      { flexDirection: 'column', marginBottom: 20, gap: 20 },
    ]}
  >
    <Text style={styles.contactName}>{item.contact_name}</Text>
    {item.cards.map((card: Card) => (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flex: 1, paddingTop: 5 }}
          onPress={() => setter(card.card_id)}
        >
          {selected == card.card_id ? (
            <RadioButton selected={true} />
          ) : (
            <RadioButton />
          )}
        </TouchableOpacity>
        <View style={{ flex: 6 }}>
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
      </View>
    ))}
  </View>
);

const CardOverwriteScreen = ({ route }: any) => {
  const inputList = route.params.similarCardList;
  const cardDetails = route.params.cardDetails;
  const [cardList] = useState(inputList);
  const navigation = useNavigation<NavigationProp<routeParams>>();

  const overwriteFunction = async () => {
    console.log('hello');
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    console.log('\n\nUser Id from OverWritecard: ', user_id);
    const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';

    const overwriteResponse = await overwriteExistingCard(
      user_id,
      jwtToken,
      selected,
      cardDetails,
    );

    console.log('\n\nOverWrite Response: ', overwriteResponse);
    if (overwriteResponse?.statusCode === '200') {
      Toast.show('Card Overwritten Successfully');
      navigation.navigate('CardDetailsScreen', { card_id: selected });
    } else {
      Toast.show('Error Overwriting Card');
      console.log('\n\nError Navigating');
    }
  };

  const [selected, setSelected] = useState('');
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
        Choose Card to Overwrite
      </Text>
      <FlatList
        data={cardList}
        renderItem={({ item }) => {
          return (
            <RenderItem item={item} selected={selected} setter={setSelected} />
          );
        }}
        keyExtractor={(item) => item.contact_name}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <MainButtonComponent
            title="Overwrite"
            onPressing={overwriteFunction}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ProfileButtonComponent
            title="Cancel"
            onPressing={() => navigation.goBack()}
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

export default CardOverwriteScreen;
