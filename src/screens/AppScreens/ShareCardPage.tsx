import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../network/getUserAPI';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import { ShareCard, ShareCardProp } from '../../network/shareCardAPI';
import { shareExternally } from '../../network/externalShare';
import Toast from 'react-native-root-toast';

type ShareProp = {
  user_fullname: string;
  user_id: string;
};

const ShareCardScreen = ({
  card_id,
  visibilitySetter,
  cardDetails,
}: ShareCardProp) => {
  const [shareList, setShareList] = useState<ShareProp[]>([]);
  const [filteredShareList, setFilteredShareList] = useState<ShareProp[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
        const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';

        const result = await listUsers({ user_id, jwt_token });
        setShareList(result.userResp);
      } catch (error) {
        console.log(error);
        setShareList([]);
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
    if (selectedUserIds.includes(user_id)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== user_id));
    } else {
      setSelectedUserIds([...selectedUserIds, user_id]);
    }
  };
  //call function according to selected user id array
  const handleShare = async () => {
    if (selectedUserIds.length > 0) {
      await handleShareInternally();
    } else {
      handleShareExternally();
    }
  };

  //function to share cards internally
  const handleShareInternally = async () => {
    const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
    const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';
    const shareCardProps: ShareCardProp = {
      user_id,
      jwt_token,
      card_id: card_id,
      receiver_user_ids: selectedUserIds,
    };

    try {
      const shareCardResponse = await ShareCard(shareCardProps);
      visibilitySetter && visibilitySetter();
      Toast.show('Shared Card Successfully');
    } catch (error) {
      console.error('Error sharing card Internally:', error);
    }
  };

  //function to share cards externally
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
          data={filteredShareList}
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
            title="Share"
            onPressing={handleShare}
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
    height: 480,
  },
  button_container: {
    position: 'absolute',
    width: '100%',
    height: 70,
    bottom: 50,
  },
  profile_button_container: {
    marginBottom: 10,
    height: 60,
    paddingHorizontal: 20,
    // top:500,
  },
});

export default ShareCardScreen;
