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
import { addToExistingContact } from '../../network/AddToExistingContact';
import { getLocalItem } from '../../utils/Utils';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { addSharedCardToExistingContact } from '../../network/addSharedToExistingContact';
import Toast from 'react-native-root-toast';
import cloudinaryUpload from '../../network/cloudinaryUpload';
import { useDispatch } from 'react-redux';
import {
  removeAllSelectedCards,
  removeSelectedCardId,
} from '../../store/selectedCardsSlice';
import { removeCardById } from '../../store/pendingCardsSlice';
import { setSharingProcess } from '../../store/sharingProcessSlice';

type Card = {
  card_id: string;
  card_name: string | null;
  company_name: string | null;
  company_website: string | null;
  contact_name: string | null;
  email: string | null;
  img_back_link: string | null;
  img_front_link: string | null;
  job_title: string | null;
  phone: string | null;
  user_id: string | null;
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
  const dispatch = useDispatch();
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

      //Navigate to SaveSharedCard Screen if sharing is true (for saving Multiple Cards)
      if (sharing === true) {
        navigation.dispatch(StackActions.pop(1));
        dispatch(removeSelectedCardId(cardDetails.card_id));
        dispatch(removeCardById({ card_id: cardDetails.card_id }));
      } else {
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
      }
    } else {
      Toast.show('Error Adding Card');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.newCardContainer}>
        <CardComponent
          name={cardDetails.card_name}
          job_position={cardDetails.job_title}
          phone_number={cardDetails.phone}
          email={cardDetails.email}
          company_name={cardDetails.company_name}
        ></CardComponent>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={{
            fontSize: 28,
            color: colors['primary-text'],
            fontWeight: '600',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Choose a Contact to Add To
        </Text>
        <FlatList
          data={cardList}
          renderItem={({ item }) => {
            return (
              <RenderItem
                item={item}
                selected={selected}
                setter={setSelected}
              />
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
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color={colors['secondary-light']}
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButtonComponent
              title="Cancel"
              onPressing={() => {
                dispatch(setSharingProcess(false));
                dispatch(removeAllSelectedCards());
                navigation.dispatch(StackActions.pop(1));
              }}
              backgroundColor={colors['secondary-grey']}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors['primary-accent'],
    flex: 1,
  },
  newCardContainer: {
    paddingVertical: 50,
    padding: 25,
  },
  bottomContainer: {
    backgroundColor: colors['secondary-light'],
    padding: 18,
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    shadowColor: colors['primary-text'],
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
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
