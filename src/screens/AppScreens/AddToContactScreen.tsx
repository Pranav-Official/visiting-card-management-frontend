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
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import Constants from '../../utils/Constants';
import { addToExistingContact } from '../../hooks/AddToExistingContact';
import { getLocalItem } from '../../utils/Utils';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { addSharedCardToExistingContact } from '../../hooks/addSharedToExistingContact';
import Toast from 'react-native-root-toast';
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
  setter: any;
};

const RenderItem = ({ item, selected, setter }: renderItemType) => {
  const handlePress = () => {
    if (selected === item.parent_card_id) {
      setter('');
    } else {
      setter(item.parent_card_id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.similarCardsContainer,
        { flexDirection: 'column', marginBottom: 20, gap: 20 },
      ]}
      activeOpacity={1}
      onPress={handlePress} // Use the handlePress function
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, paddingTop: 5 }}>
          {selected === item.parent_card_id ? (
            <RadioButton selected={true} />
          ) : (
            <RadioButton />
          )}
        </View>
        <View style={{ flex: 15 }}>
          <Text style={styles.contactName}>{item.contact_name}</Text>
        </View>
      </View>
      {item.cards.map((card: Card) => (
        <View style={{ flexDirection: 'row' }} key={card.card_id}>
          <View style={{ flex: 1 }}>
            <CardComponent
              card_id={card.card_id}
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
    </TouchableOpacity>
  );
};

const AddToContact = ({ route }: any) => {
  const inputList = route.params.similarCardList;
  let cardDetails = route.params.cardDetails;
  const sharing: boolean = route.params.sharing;
  const [cardList] = useState(inputList);
  const [selected, setSelected] = useState('');
  const [imageUploadProcessing, setImageUploadProcessing] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const addToContactFunction = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
    let addToContactResponse;
    if (sharing == true) {
      addToContactResponse = await addSharedCardToExistingContact(
        user_id,
        jwtToken,
        selected,
        cardDetails,
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
    }

    if (addToContactResponse?.statusCode === 200) {
      const createdCardId =
        addToContactResponse.addToExistingContactData.data.cardId;
      Toast.show('Card Added Successfully!');
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
    } else {
      Toast.show('Error Adding Card');
      console.log('\n\nError Adding Screen');
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
            <PrimaryButtonComponent
              title="Add to contact"
              onPressing={() => addToContactFunction()}
            />
          ) : (
            <PrimaryButtonComponent title="">
              <ActivityIndicator
                size="large"
                color={colors['secondary-light']}
              />
            </PrimaryButtonComponent>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButtonComponent
            title="Cancel"
            onPressing={() => navigation.dispatch(StackActions.pop(1))}
            backgroundColor={colors['secondary-grey']}
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
    zIndex: 1,
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
