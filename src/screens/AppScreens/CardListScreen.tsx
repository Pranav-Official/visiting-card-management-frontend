import nameToColor from '../../hooks/nameToHex';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardComponent from '../../components/CardComponent';
import { listCards } from '../../hooks/CardListHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import colors from '../../utils/colorPallete';
import TopBackButton from '../../components/BackButton';
import TopMenuButton from '../../components/MenuButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const CardListScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const arr = [1, 2, 3, 4, 5];
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
  const contact_name = route.params.name ?? '';
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
  useEffect(() => {
    fetchCardList();
  }, [key]);

  const navigation = useNavigation<NavigationProp<any>>();
  const handlePress = (card_id: string) => {
    navigation.navigate('CardStack', {
      screen: 'CardDetailsScreen',
      params: { card_id: card_id, cardListScreenUpdater: setKey },
    });
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: nameToColor(contact_name) },
      ]}
    >
      <View style={styles.topIconContainer}>
        <TopBackButton />
        <TopMenuButton />
      </View>
      <View style={styles.letterCardContainer}>
        <View
          style={[
            styles.letterCircle,
            { backgroundColor: nameToColor(contact_name) },
          ]}
        >
          <Text style={styles.letter}>{contact_name[0]}</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.contactNameContainer}>
            <Text style={styles.contactName}>{contact_name}</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
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
