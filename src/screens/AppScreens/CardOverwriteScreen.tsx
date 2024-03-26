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
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import RadioButton from '../../components/RadioButton';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { overwriteExistingCard } from '../../network/overWriteCardHook';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { overwriteSharedCard } from '../../network/overwriteSharedCard';
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

type routeParams = {
  CardDetailsScreen?: { card_id: string };
  CardStack?: { screen: string; params: { card_id: string } };
};

const RenderItem = ({ item, selected, setter }: renderItemType) => {
  const handlePress = (cardId: string) => {
    if (selected === cardId) {
      setter('');
    } else {
      setter(cardId);
    }
  };

  return (
    <View
      style={[
        styles.similarCardsContainer,
        { flexDirection: 'column', marginBottom: 20, gap: 20 },
      ]}
    >
      <Text style={styles.contactName}>{item.contact_name}</Text>
      {item.cards.map((card) => (
        <View style={{ flexDirection: 'row' }} key={card.card_id}>
          <TouchableOpacity
            style={{ flex: 1, paddingTop: 5 }}
            onPress={() => handlePress(card.card_id)}
          >
            {selected === card.card_id ? (
              <RadioButton selected={true} />
            ) : (
              <RadioButton />
            )}
          </TouchableOpacity>
          <View style={{ flex: 6 }}>
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
    </View>
  );
};

const CardOverwriteScreen = ({ route }: any) => {
  const dispatch = useDispatch();
  const inputList = route.params.similarCardList;
  let cardDetails = route.params.cardDetails;
  const sharing: boolean = route.params.sharing;
  const [cardList] = useState(inputList);
  const navigation = useNavigation<NavigationProp<routeParams>>();
  const [imageUploadProcessing, setImageUploadProcessing] = useState(false);

  const overwriteFunction = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';

    let overwriteResponse;
    if (sharing === true) {
      overwriteResponse = await overwriteSharedCard(
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
      overwriteResponse = await overwriteExistingCard(
        user_id,
        jwtToken,
        selected,
        cardDetails,
      );
    }

    if (overwriteResponse?.statusCode === '200') {
      Toast.show('Card Overwritten Successfully');

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
          params: { card_id: selected },
        });
      }
      // navigation.navigate('CardDetailsScreen', { card_id: selected });
    } else {
      Toast.show('Error Overwriting Card');
      console.log('\n\nError Navigating');
    }
  };

  const [selected, setSelected] = useState('');
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
          Choose Card to Overwrite
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
                title="Overwrite"
                onPressing={overwriteFunction}
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

export default CardOverwriteScreen;
