import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../hooks/GetUserHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import { ShareCard, ShareCardProp } from '../../hooks/ShareCardHook';
import Share from 'react-native-share';
import { shareCardDetails, shareExternally } from '../../hooks/externalShare';

type ShareProp = {
  user_fullname: string;
  user_id: string;
};

const ShareCardScreen = ({
  card_id,
  visibilitySetter,
  cardDetails,
}: ShareCardProp) => {
  console.log('card_id in beginning', card_id);
  const [shareList, setShareList] = useState<ShareProp[]>([]);
  const [filteredShareList, setFilteredShareList] = useState<ShareProp[]>([]); //new
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); //new

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
    const filteredList = shareList.filter((item) =>
      item.user_fullname.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredShareList(filteredList);
  }, [searchQuery, shareList]);

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
    console.log('handleshare user_id', user_id);
    const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';
    console.log('handleshare jwt_token', jwt_token);
    const shareCardProps: ShareCardProp = {
      user_id,
      jwt_token,
      card_id: card_id, // Replace with the actual card ID
      receiver_user_ids: selectedUserIds,
    };
    console.log('card_id handle press', card_id),
      console.log('receiver user id handle press', selectedUserIds);

    try {
      const shareCardResponse = await ShareCard(shareCardProps);
      console.log('Share Card Response:', shareCardResponse);
      // Handle the response accordingly
      visibilitySetter && visibilitySetter();
    } catch (error) {
      console.error('Error sharing card Internally:', error);
      // Handle errors
    }
  };

  const handleShareExternally = () => {
    const filteredDetails: any = {};
    for (const key in cardDetails) {
      if (
        key !== 'img_front_link' &&
        key !== 'img_back_link' &&
        cardDetails[key] !== null &&
        cardDetails[key] !== ''
      ) {
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        filteredDetails[formattedKey] = cardDetails[key];
      }
    }

    let formattedDetails = '';
    for (const key in filteredDetails) {
      formattedDetails += `${key}: ${filteredDetails[key]},\n`;
    }
    shareExternally(formattedDetails);
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.search_bar_container}>
        <SearchBarComponent value={searchQuery} setter={setSearchQuery} />
      </View>
      <View style={styles.contact_area}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          showsVerticalScrollIndicator={true}
          data={filteredShareList} //chnaged
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
      <View style={styles.button_container}>
        <View style={styles.profile_button_container}>
          <PrimaryButtonComponent
            title={'Share Internally'}
            onPressing={handleShareInternally}
          ></PrimaryButtonComponent>
        </View>
        <View style={styles.main_button_container}>
          <PrimaryButtonComponent
            title={'Share Externally'}
            onPressing={handleShareExternally}
          ></PrimaryButtonComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    marginTop: 20,
    paddingBottom: 5,
  },
  search_bar_container: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 0,
  },
  flatListStyle: {
    padding: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  contact_area: {
    width: '100%',
    paddingHorizontal: 10,
    height: 450,
  },
  button_container: {
    position: 'absolute',
    width: '100%',
    height: 120,
    bottom: 50,
  },
  profile_button_container: {
    marginBottom: 10,
    height: 60,
    paddingHorizontal: 20,
    // top:500,
  },
  main_button_container: {
    marginBottom: 0,
    height: 70,
    paddingHorizontal: 20,
  },
});

export default ShareCardScreen;
