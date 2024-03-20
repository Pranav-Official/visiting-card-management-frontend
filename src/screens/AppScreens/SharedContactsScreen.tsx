import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TopBackButton from '../../components/BackButton';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import CardComponent from '../../components/CardComponent';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import colors from '../../utils/colorPallete';
import { acceptedCardslist } from '../../hooks/getAcceptedCardsHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';

const SharedContactsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [acceptedCardList, setCardList] = useState<CardParameters[]>();
  const arr = [1, 2, 3, 4, 5, 6, 7];
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

  const fetchAcceptedCardList = async () => {
    try {
      const userId = (await getLocalItem(Constants.USER_ID)) ?? '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';

      const result = await acceptedCardslist({
        user_id: userId,
        jwt_token: jwtToken,
      });
      if (result && result.cardResp && Array.isArray(result.cardResp.data)) {
        setCardList(result.cardResp.data);
      } else {
        console.log('Invalid data format received');
      }
      console.log(acceptedCardList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAcceptedCardList();
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
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TopBackButton color="black" />
        <Text style={styles.heading}>Shared Contacts</Text>
      </View>
      {!isLoading ? (
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          showsVerticalScrollIndicator={false}
          data={acceptedCardList}
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
          renderItem={() => <ShimmerComponent />}
          keyExtractor={(item) => item.toString()}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: colors['secondary-light'],
  },
  cardcontainer: {
    width: '100%',
    height: 170,
    elevation: 5,
    // paddingHorizontal: 20,
    paddingTop: 10,
  },
  flatListStyle: {
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 70,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: colors['primary-accent'],
  },
  heading: {
    fontSize: 30,
    color: 'black',
  },
});
export default SharedContactsScreen;
