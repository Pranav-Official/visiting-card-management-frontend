import nameToColor from '../../network/nameToHex';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { listCards } from '../../network/cardListAPI';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import colors from '../../utils/colorPallete';
import TopBackButton from '../../components/BackButton';
import TopMenuButton from '../../components/MenuButton';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { editCardDetails } from '../../network/editCardAPI';
import NewCardComponent from '../../components/NewCardListScreenComponent';
import Swiper from 'react-native-swiper';
import { RootStackParamList } from '../../types/navigationTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';

const CardListScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const arr = [1, 2, 3, 4, 5, 6];
  const [changeContactName, setChangeContactName] = useState(false);
  const [contactName, setContactName] = useState(route.params.name ?? '');
  const [temporaryContactName, setTemporaryContactName] = useState(contactName);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const changeContactNameFunction = () => {
    setChangeContactName(true);
  };
  const editedData = { contact_name: temporaryContactName };

  const changeContact = async () => {
    //To change the contactname ,we call the edit card hook
    try {
      if (editedData.contact_name.trim()) {
        const user_id = (await getLocalItem(Constants.USER_ID)) ?? '{}';
        const token = (await getLocalItem(Constants.USER_JWT)) ?? '{}';
        const response = await editCardDetails({
          user_id,
          token,
          card_id: route.params.card_id,
          updatedData: editedData,
        });
        const contactNameSetStatus = response.statusCode;
        if (contactNameSetStatus == '200') {
          setContactName(temporaryContactName);
          setChangeContactName(false);
          setTemporaryContactName(temporaryContactName);
        } else {
          console.log('Error in editing contact name');
          setChangeContactName(false);
          Toast.show('Error in editing contact name', {
            position: Toast.positions.BOTTOM,
            duration: Toast.durations.SHORT,
          });
        }
      } else {
        setChangeContactName(false);
      }
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };
  const ShimmerComponent = () => {
    return (
      <View>
        <ShimmerPlaceholder
          style={styles.cardcontainer}
          LinearGradient={LinearGradient}
        ></ShimmerPlaceholder>
      </View>
    );
  };

  interface CardParameters {
    company_name: string;
    card_id: string;
    card_name: string;
    email: string;
    phone: string;
    job_title: string;
  }

  const fetchCardList = async () => {
    try {
      const userId = (await getLocalItem(Constants.USER_ID)) ?? '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
      const cardId = route.params.card_id ?? '';

      const result = await listCards({
        user_id: userId,
        jwt_token: jwtToken,
        card_id: cardId,
      });
      if (result.cardResp.data.length == 0) {
        navigation.goBack();
      }

      setCardList(result.cardResp.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [cardList, setCardList] = useState<CardParameters[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchCardList();
    }, []),
  );
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'CardDetailsScreen'>>();
  const handlePress = (card_id: string) => {
    navigation.navigate('CardDetailsScreen', { card_id: card_id });
  };

  useEffect(() => {
    // Update total number of cards when cardList changes
    setTotalCards(cardList.length);
  }, [cardList]);

  // Function to handle card swipe
  const handleCardSwipe = (index: number) => {
    setCurrentCardIndex(index);
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: nameToColor(contactName) },
      ]}
    >
      <View style={styles.topIconContainer}>
        <TopBackButton />
        <TopMenuButton
          options={[
            {
              label: 'Edit Contact Name',
              onSelect: changeContactNameFunction,
            },
          ]}
        />
      </View>
      <View style={styles.letterCardContainer}>
        <View
          style={[
            styles.letterCircle,
            { backgroundColor: nameToColor(contactName) },
          ]}
        >
          <Text style={styles.letter}>{contactName[0]}</Text>
        </View>
        <View style={styles.cardContainer}>
          {!changeContactName ? (
            <View style={styles.contactNameContainer}>
              <Text style={styles.contactName}>{contactName}</Text>
            </View>
          ) : (
            <View style={styles.contactNameContainer}>
              <TextInput
                placeholder={contactName}
                style={styles.contactName}
                value={temporaryContactName}
                onChangeText={(val) => setTemporaryContactName(val)}
                underlineColorAndroid="transparent"
              />
              <View style={styles.headerStyle}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    changeContact();
                  }}
                >
                  <MaterialIcons name="check" size={32} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => setChangeContactName(false)}
                >
                  <MaterialIcons
                    name="close"
                    size={32}
                    color={colors['primary-danger']}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Text style={styles.cardHeading}>Cards</Text>
          {!isLoading ? (
            <Swiper
              style={styles.flatListStyle}
              horizontal={true}
              showsPagination={false}
              loop={false}
              onIndexChanged={handleCardSwipe}
              snapToOffsets={[0, 390, 740]}
            >
              {cardList.map((item, index) => (
                <View style={styles.swiperList}>
                  <NewCardComponent
                    key={index}
                    name={item.card_name ? item.card_name : 'Add Card Name'}
                    job_position={
                      item.job_title ? item.job_title : 'Add Job Title'
                    }
                    email={item.email ? item.email : 'Add Email'}
                    phone_number={
                      item.phone ? item.phone : 'Add Contact Number'
                    }
                    company_name={
                      item.company_name ? item.company_name : 'Add Company Name'
                    }
                    clickFunc={() => handlePress(item.card_id)}
                    alignToSides={true}
                  />
                  <View style={styles.swiperList}></View>
                </View>
              ))}
            </Swiper>
          ) : (
            <FlatList
              contentContainerStyle={styles.flatListStyle}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={arr}
              renderItem={() => <ShimmerComponent />}
              keyExtractor={(item) => item.toString()}
            />
          )}
        </View>
      </View>
      <View style={styles.bottomCounterContainer}>
        <Text style={styles.bottomCounterText}>{`${
          currentCardIndex + 1
        } of ${totalCards}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  headerStyle: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: colors['secondary-grey'],
    width: 120,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors['primary-text'],
    fontSize: 16,
    fontWeight: '500',
  },
  cardcontainer: {
    width: '100%',
    height: 300,
    elevation: 5,
    paddingRight: 20,
    paddingTop: 10,
  },
  container: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  letterCircle: {
    borderRadius: 90,
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors['secondary-light'],
    borderWidth: 2,
    zIndex: 1,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '-25%',
  },
  topIconContainer: {
    paddingTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  letterCardContainer: {
    flexDirection: 'column',
  },
  letter: {
    fontSize: 60,
    color: colors['secondary-light'],
  },
  icon: {
    color: colors['secondary-light'],
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: colors['secondary-light'],
    height: '100%',
    width: '100%',
    marginTop: '15%',
    borderRadius: 26,
    paddingHorizontal: 20,
  },
  contactNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListStyle: {
    gap: 40,
    paddingBottom: 150,
  },
  swiperList: {
    paddingHorizontal: 15,
  },
  contactName: {
    color: colors['primary-text'],
    fontSize: 40,
    marginTop: 60,
  },
  cardHeading: {
    color: colors['primary-text'],
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bottomCounterContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors['accent-grey'],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bottomCounterText: {
    color: colors['accent-white'],
    fontSize: 16,
  },
});
export default CardListScreen;
