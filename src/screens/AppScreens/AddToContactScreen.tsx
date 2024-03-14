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
import Toast from 'react-native-root-toast';

const RenderItem = ({ item, selected, setter }) => {
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
      {item.cards.map((card: any) => (
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
  const cardDetails = route.params.cardDetails;
  const sharing: boolean = route.params.sharing;
  console.log('ADd to contact Screen: sharing page? :', sharing);
  const [cardList, setCardList] = useState(inputList);
  const [selected, setSelected] = useState('');
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
      Toast.show('Card Added Successfully!');
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
          <MainButtonComponent
            title="Add to contact"
            onPressing={() => addToContactFunction()}
            children={<></>}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ProfileButtonComponent
            title="Cancel"
            onPressing={() => navigation.dispatch(StackActions.pop(1))}
            // proButtonBgColor={colors['accent-white']}
            // proButtonTextColor={colors['primary-danger']}
            children={<></>}
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
});

export default AddToContact;
