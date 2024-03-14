import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../utils/colorPallete';
import CardComponent from '../../components/CardComponent';
import RadioButton from '../../components/RadioButton';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import Constants from '../../utils/Constants';
import { addToExistingContact } from '../../hooks/addToContactHook';
import { getLocalItem } from '../../utils/Utils';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { addSharedCardToExistingContact } from '../../hooks/AddToExistingContact';
import cloudinaryUpload from '../../hooks/cloudinaryUpload';

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
  parent_card_id: string;
  cards: Card[];
};
type renderItemType = {
  item: ContactCard;
  selected: string;
  setter: (cardId: string) => void;
};
const RenderItem = ({ item, selected, setter }: renderItemType) => (
  <View
    style={[
      styles.similarCardsContainer,
      { flexDirection: 'column', marginBottom: 20, gap: 20 },
    ]}
  >
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        style={{ flex: 1, paddingTop: 5 }}
        onPress={() => {
          setter(item.parent_card_id);
          console.log('\n\nTHE SETTER IS: ', item.parent_card_id);
        }}
      >
        {selected == item.parent_card_id ? (
          <RadioButton selected={true} />
        ) : (
          <RadioButton />
        )}
      </TouchableOpacity>
      <View style={{ flex: 15 }}>
        <Text style={styles.contactName}>{item.contact_name}</Text>
      </View>
    </View>
    {item.cards.map((card: Card) => (
      <View style={{ flexDirection: 'row' }} key={card.card_id}>
        <View style={{ flex: 1 }}>
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

const AddToContact = ({ route }: any) => {
  const inputList = route.params.similarCardList;
  let cardDetails = route.params.cardDetails;
  const sharing: boolean = route.params.sharing;
  console.log('ADd to contact Screen: sharing page? :', sharing);
  const [cardList] = useState(inputList);
  const [selected, setSelected] = useState('');
  const [imageUploadProcessing, setImageUploadProcessing] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const addToContactFunction = async () => {
    console.log('\n\nADD TO CONTACTS REACHED!!!!!\n\n');
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    console.log('\n\nUser Id from AddToContact: ', user_id);
    const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
    console.log('\n\nTHE CARD DETAILS IN AToC are: ', cardDetails);
    console.log('\n\nSelected Card ID: ', selected);

    let addToContactResponse;
    if (sharing == true) {
      addToContactResponse = await addSharedCardToExistingContact(
        user_id,
        jwtToken,
        selected,
        cardDetails,
      );
      console.log(
        '\n\nADDD to contact Respone from SCREEN: ',
        addToContactResponse.addToExistingContactData,
      );
    } else {
      if (cardDetails.img_front_link) {
        setImageUploadProcessing(true);
        const frontImgURL = await cloudinaryUpload({
          uri: cardDetails.img_front_link,
          type: 'image/jpeg',
          name: 'frontImg.jpg',
        });

        cardDetails = {
          ...cardDetails,
          img_front_link: frontImgURL,
        };
      }
      if (cardDetails.img_back_link) {
        const backImgURL = await cloudinaryUpload({
          uri: cardDetails.img_back_link,
          type: 'image/jpeg',
          name: 'backImg.jpg',
        });

        cardDetails = {
          ...cardDetails,
          img_back_link: backImgURL,
        };
      }
      addToContactResponse = await addToExistingContact(
        user_id,
        jwtToken,
        selected,
        cardDetails,
      );
      console.log(
        '\n\nADDD to contact Respone from SCREEN: ',
        addToContactResponse?.addToExistingContactData,
      );
    }

    if (addToContactResponse?.statusCode === 200) {
      const createdCardId =
        addToContactResponse.addToExistingContactData.data.cardId;
      console.log('\n\nNEWLY CREATED CARD ID: ', createdCardId);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }],
        }),
      );
      navigation.navigate('CardStack', {
        screen: 'CardDetailsScreen',
        params: { card_id: createdCardId },
      });
    } else console.log('\n\nError Navigating');
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
        Choose a contact to add to
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
          {!imageUploadProcessing ? (
            <MainButtonComponent
              title="Add to contact"
              onPressing={() => addToContactFunction()}
            />
          ) : (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={colors['secondary-light']}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <ProfileButtonComponent
            title="Cancel"
            onPressing={() => navigation.dispatch(StackActions.pop(1))}
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
    paddingVertical: 10,
    width: '100%',
    height: 100,
    paddingHorizontal: 10,
  },
  loading: {
    backgroundColor: colors['primary-accent'],
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
});

export default AddToContact;
