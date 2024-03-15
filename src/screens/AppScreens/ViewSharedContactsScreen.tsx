import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewSharedButton from '../../components/ViewSharedButton';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import TopBackButton from '../../components/BackButton';
import colors from '../../utils/colorPallete';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { acceptedCardslist } from '../../hooks/getAcceptedCardsHook';

const ViewSharedContactsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const handlePress = () => {
    navigation.navigate('CardStack', {
      screen: 'SharedContactsScreen',
    });
  };
  const[noOfCards,setNoOfCards]=useState(0)
  const fetchAcceptedCardList = async () => {
    try {
      const userId = (await getLocalItem(Constants.USER_ID)) ?? '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';

      const result = await acceptedCardslist({
        user_id: userId,
        jwt_token: jwtToken,
      });
      if (result.cardResp.data.length == 0) {
        navigation.goBack();
      }
      else {
        setNoOfCards(result.cardResp.data.length);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
 
  useFocusEffect(
    useCallback(() => {
      fetchAcceptedCardList();
    }, []),
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TopBackButton color="black" />
        <Text style={styles.heading}>Shared Contacts</Text>
      </View>
      <View style={styles.shareContainer}>
        <ViewSharedButton
          title="Accepted Cards"
          number={noOfCards.toString()}
          onPressing={() => handlePress()}
        />
        <ViewSharedButton
          title="Pending Shares"
          number="5"
          onPressing={() => handlePress()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  shareContainer: {
    padding: 20,
    gap:20,
    justifyContent: 'space-between',
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
export default ViewSharedContactsScreen;
