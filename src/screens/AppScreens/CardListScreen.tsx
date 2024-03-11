import nameToColor from '../../hooks/nameToHex';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import CardComponent from '../../components/CardComponent';
import { listCards } from '../../hooks/CardListHook';
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
import { editCardDetails } from '../../hooks/editCardHook';

const CardListScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6];
  const [changeContactName, setChangeContactName] = useState(false);
  const [contactName, setContactName] = useState(route.params.name ?? '');
  const [temporaryContactName, setTemporaryContactName] = useState('');
  const changeContactNameFunction = () => {
    setChangeContactName(true);
  };
  const editedData = { contact_name: temporaryContactName };
  const changeContact = async () => {  //To change the contactname ,we call the edit card hook
    try {
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
        setTemporaryContactName('');
      } else {
        console.log('Error in editing contact name');
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
  // const contact_name = route.params.name ?? '';

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
  const navigation = useNavigation<NavigationProp<any>>();
  const handlePress = (card_id: string) => {
    navigation.navigate('CardStack', {
      screen: 'CardDetailsScreen',
      params: { card_id: card_id },
    });
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
              label: 'Change Contact Name',
              onSelect: changeContactNameFunction,
            },
            {
              label: 'Change Card Detail',
              onSelect: changeContactNameFunction,
            },
            // Add more menu options as needed
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
                //readOnly={readonly}
              />
              <View style={styles.headerStyle}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    changeContact();
                  }}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => setChangeContactName(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Text style={styles.cardHeading}>Cards</Text>
          {!isLoading ? (
            <FlatList
              contentContainerStyle={styles.flatListStyle}
              showsVerticalScrollIndicator={false}
              data={cardList}
              renderItem={({ item }) => (
                <CardComponent
                  name={item.card_name}
                  job_position={item.job_title}
                  email={item.email}
                  phone_number={item.phone}
                  company_name={item.company_name}
                  clickFunc={() => handlePress(item.card_id)}
                  alignToSides={true}
                />
              )}
              keyExtractor={(item) => item.card_id}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.flatListStyle}
              showsVerticalScrollIndicator={false}
              data={arr}
              renderItem={({ item }) => <ShimmerComponent />}
              keyExtractor={(item) => item.toString()}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  buttonStyle: {
    padding: 15,
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
  contactNameSetButton: {
    top: '35%',
  },
  contactNameChangeText: {
    backgroundColor: 'lightblue',
    fontSize: 40,
    fontFamily: 'roberto',
  },
  mainContainer: {},
  cardcontainer: {
    width: '100%',
    height: 170,
    elevation: 5,
    paddingRight: 20,
    paddingTop: 10,
  },
  letterCircle: {
    borderRadius: 60,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: colors['secondary-light'],
    borderWidth: 2,
    zIndex: 1,
    marginBottom: -40,
    marginLeft: 140,
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
    marginTop: 10,
  },
  letter: {
    fontSize: 48,
    color: colors['secondary-light'],
  },
  icon: {
    color: colors['secondary-light'],
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: colors['secondary-light'],
    height: 700,
    width: '100%',
    borderRadius: 26,
    paddingHorizontal: 20,
  },
  contactNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListStyle: {
    gap: 20,
    paddingHorizontal: 10,
    paddingBottom: 150,
  },
  contactName: {
    color: colors['primary-text'],
    fontSize: 40,
    marginTop: 40,
  },
  cardHeading: {
    color: colors['primary-text'],
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
export default CardListScreen;
