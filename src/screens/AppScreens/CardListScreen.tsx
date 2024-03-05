import nameToColor from '../../hooks/nameToHex';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardComponent from '../../components/CardComponent';
import { listCards } from '../../hooks/CardListHook';
import { getItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';

const CardListScreen = ({route}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const arr = [1, 2, 3, 4, 5];
  const ShimmerComponent = () => {
    return (
      <View>
        <ShimmerPlaceholder
          style={styles.cardcontainer}
          LinearGradient={LinearGradient}></ShimmerPlaceholder>
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
  const [cardList, setCardList] = useState<CardParameters[]>([]);
  useEffect(() => {
    const fetchCardList = async () => {
      try {
        const userId = (await getItem(Constants.USER_ID)) ?? '';
        const jwtToken = (await getItem(Constants.JWT_TOKEN)) ?? '';
        const cardId = route.params.card_id ?? '';
        console.log('cardlist screen' + cardId);

        const result = await listCards({user_id:userId, jwt_token:jwtToken, card_id:cardId});

        setCardList(result.cardResp.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCardList();
  }, []);

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: nameToColor(contact_name)},
      ]}>
      <View style={styles.topIconContainer}>
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back"
            color={'black'}
            size={34}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="more-vert"
            color={'black'}
            size={34}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.letterCardContainer}>
        <View
          style={[
            styles.letterCircle,
            {backgroundColor: nameToColor(contact_name)},
          ]}>
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
              renderItem={({item}) => (
                <CardComponent
                  name={item.card_name}
                  job_position={item.job_title}
                  email={item.email}
                  card_id={item.card_id}
                  phone_number={item.phone}
                  company_name={item.company_name}
                  alignToSides={true}
                />
              )}
              keyExtractor={item => item.card_id}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.flatListStyle}
              showsVerticalScrollIndicator={false}
              data={arr}
              renderItem={({item}) => <ShimmerComponent />}
              keyExtractor={item => item.toString()}
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
    borderColor: '#FFFF',
    borderWidth: 2,
    zIndex: 1,
    marginBottom: -40,
    marginLeft: 140,
  },
  topIconContainer: {
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
    color: '#ffff',
  },
  icon: {
    color: '#ffff',
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: '#ffff',
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
    color: '#0B0B0B',
    fontSize: 40,
    marginTop: 40,
  },
  cardHeading: {
    color: '#0B0B0B',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
export default CardListScreen;
