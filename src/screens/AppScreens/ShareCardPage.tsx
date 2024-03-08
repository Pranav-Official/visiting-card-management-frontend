import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../hooks/GetUserHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import MainButtonComponent from '../../components/MainButtoncomponent';
import { ShareCard, ShareCardProp} from '../../hooks/ShareCardHook';

interface ShareProp {
  user_fullname: string;
  user_id: string;
}

const ShareCardScreen = ({ card_id }: ShareCardProp) => {
  console.log('card_id in beginning', card_id)  
  const [shareList, setShareList] = useState<ShareProp[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
        const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';

        const result = await listUsers({ user_id, jwt_token });
        console.log('result:', result);
        setShareList(result.userResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Selected User IDs:', selectedUserIds);
  }, [selectedUserIds]); // Log selectedUserIds whenever it changes

  const handleCardPress = (user_id: string) => {
    console.log('clicked');
    if (selectedUserIds.includes(user_id)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== user_id));
    } else {
      setSelectedUserIds([...selectedUserIds, user_id]);
    }
  };

  const handleShareInternally = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    console.log('handleshare user_id',user_id);
    const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';
    console.log('handleshare jwt_token',jwt_token);
    const shareCardProps: ShareCardProp = {
      user_id,
      jwt_token,
      card_id: card_id, // Replace with the actual card ID
      receiver_user_ids: selectedUserIds,      
    };
    console.log('card_id handle press',card_id),
      console.log('receiver user id handle press',selectedUserIds);
   

    try {
      const shareCardResponse = await ShareCard(shareCardProps);
      console.log('Share Card Response:', shareCardResponse);
      // Handle the response accordingly
    } catch (error) {
      console.error('Error sharing card Internally:', error);
      // Handle errors
    }
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.search_bar_container}>
        <SearchBarComponent />
      </View>
      <View style={styles.contact_area}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          showsVerticalScrollIndicator={true}
          data={shareList}
          renderItem={({ item }) => (
            <ShareCardComponent
              user_fullname={item.user_fullname}
              user_id={item.user_id}
              onCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item.user_id}
        />
      </View>
      <View style={styles.profile_button_container}>
        <MainButtonComponent
          title={'Share Internally'}
          onPressing={handleShareInternally}
        ></MainButtonComponent>
      </View>
      <View style={styles.main_button_container}>
        <MainButtonComponent title={'Share Externally'}></MainButtonComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    flexDirection: 'column',
    height: 400,
    marginBottom: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop:30,
  },
  search_bar_container: {
    width: '100%',
    paddingHorizontal: 30,
  },
  flatListStyle: {
    padding: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  contact_area: {
    width: '100%',
    paddingHorizontal: 10,
  },
  profile_button_container: {
    marginBottom: 10,
    height: 60,
    paddingHorizontal: 20,
  },
  main_button_container: {
    marginBottom: 0,
    height: 70,
    paddingHorizontal: 20,
  },
});

export default ShareCardScreen;
