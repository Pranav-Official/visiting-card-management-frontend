import React, { useEffect, useState } from 'react';
import colors from '../../utils/colorPallete';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CompanyName from '../../assets/images/organisation.svg';
import CommonImageComponent from '../../components/CommonImageComponent';
import CardDetailComponent from '../../components/CardDetailComponent';
import Phone from '../../assets/images/phone.svg';
import Email from '../../assets/images/mail.svg';
import Website from '../../assets/images/website.svg';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import MainButtonComponent from '../../components/MainButtoncomponent';
import DeleteIcon from '../../assets/images/DeleteIcon.svg';
import ShareIcon from '../../assets/images/ShareIcon.svg';
import BackButtonIcon from '../../assets/images/Arrow.svg';
import { listCardDetails } from '../../hooks/CardDetailHook';
import Constants from '../../utils/Constants';
import { getLocalItem } from '../../utils/Utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { isValidWebsiteUrl } from '../../utils/regexCheck';
import BottomSheetComponent from '../../components/BottomSheetComponent';

type CardDetails = {
  card_name: string;
  img_front_link?: string;
  img_back_link?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  company_name?: string;
  company_website?: string;
  description?: string | null;
};
import CardDetailsShimmer from '../../components/Shimmers/CardDetailsShimmer';
import ShareCardScreen from './ShareCardPage';

const CardDetailPage = ({ route }: any) => {
  const [cardDetail, setCardDetail] = useState<CardDetails>({});
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<any>>();
  const [key, setKey] = useState(0);
  const [ShareModalVisible, setShareModalVisible] = useState(false);

  const toggleShareModal = () => {
    setShareModalVisible(!ShareModalVisible);
  };

  const fetchData = async () => {
    try {
      const userId = (await getLocalItem(Constants.USER_ID)) ?? '{}';
      const userToken = (await getLocalItem(Constants.USER_JWT)) ?? '{}';
      const card_id = route.params.card_id;

      const { cardDetailsResp } = await listCardDetails({
        user_id: userId,
        jwtToken: userToken,
        card_id: card_id,
      });

      setCardDetail(cardDetailsResp.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const phonePress = (phoneNumber: string) => {
    if (phoneNumber === '') return;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };

  const emailPress = (emailAddress: string) => {
    if (emailAddress === '') return;
    const url = `mailto:${emailAddress}`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };

  const websitePress = (webUrl: string) => {
    if (webUrl === '') return;
    const webUrlSplit = webUrl.split('.');

    if (!isValidWebsiteUrl(webUrl)) return;

    if (webUrlSplit[0] === 'www') {
      webUrl = 'https://' + webUrl;
    } else {
      webUrl = 'https://www.' + webUrl;
    }

    Linking.openURL(webUrl).catch((err) =>
      console.log('An error occurred', err),
    );
  };

  const longPressToCopy = async (string: string) => {
    try {
      await Clipboard.setString(string);
      Alert.alert(
        'Copied to Clipboard',
        `Content "${string}" copied to clipboard successfully.`,
      );
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackButtonIcon width={30} height={30} rotation={180} />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <CommonImageComponent />
      </View>
      <View style={styles.conatctHead}>
        {isLoading ? (
          <>
            <View style={styles.shimmerContainer}>
              <CardDetailsShimmer />
            </View>
            <View style={styles.shimmerContainer}>
              <CardDetailsShimmer />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.cardName}>{cardDetail.card_name}</Text>
            <Text style={styles.jobTitle}>{cardDetail.job_title}</Text>
          </>
        )}
      </View>

      <View style={styles.headerStyle}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('EditCardScreen', {
              cardDetails: cardDetail,
              card_id: route.params.card_id,
              cardListScreenUpdater: route.params.cardListScreenUpdater,
              cardDetailsScreenUpdater: setKey,
            });
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetailsContainer}>
        <CardDetailComponent
          onLongPress={() => {
            longPressToCopy(cardDetail.company_name || '');
          }}
          card_detail={cardDetail.company_name || ''}
          isLoading={isLoading}
        >
          <CompanyName width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent
          onLongPress={() => {
            longPressToCopy(cardDetail.phone || '');
          }}
          onPress={() => phonePress(cardDetail.phone || '')}
          card_detail={cardDetail.phone || ''}
          isLoading={isLoading}
        >
          <Phone width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent
          onLongPress={() => {
            longPressToCopy(cardDetail.email || '');
          }}
          onPress={() => emailPress(cardDetail.email || '')}
          card_detail={cardDetail.email || ''}
          isLoading={isLoading}
        >
          <Email width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent
          onLongPress={() => {
            longPressToCopy(cardDetail.company_website || '');
          }}
          onPress={() => websitePress(cardDetail.company_website || '')}
          card_detail={cardDetail.company_website || ''}
          isLoading={isLoading}
        >
          <Website width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>
      </View>

      <View style={styles.editButtons}>
        <View style={styles.profileButton}>
          <ProfileButtonComponent
            children={<DeleteIcon width={40} height={24} />}
            title={'Delete'}
            danger={true}
            onPressing={function () {
              throw new Error('Function not implemented.');
            }}
          ></ProfileButtonComponent>
        </View>

        <View style={styles.mainButton}>
          <MainButtonComponent
            children={<ShareIcon width={40} height={24} />}
            title={'Share'}
            onPressing={toggleShareModal}
          ></MainButtonComponent>
          <BottomSheetComponent
          visibility = {ShareModalVisible}
          visibilitySetter= {setShareModalVisible}
          >
            <ShareCardScreen user_id={''} jwt_token={''} card_id={route.params.card_id} receiver_user_ids={[]} />
          </BottomSheetComponent>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['secondary-light'],
    color: colors['primary-text'],
    flex: 1,
  },
  imageContainer: {
    height: 250,
    marginTop: 10,
  },
  conatctHead: {
    flexDirection: 'column',
    // marginTop: '3%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 35,
    fontWeight: '700',
    color: colors['primary-text'],
  },
  jobTitle: {
    color: colors['accent-grey'],
    fontSize: 24,
  },
  shimmerContainer: {
    marginBottom: 10, // Adjust the margin bottom as needed
  },
  cardButton: {
    alignItems: 'center',
    backgroundColor: colors['secondary-grey'],
    height: 50,
    width: 30,
    borderRadius: 8,
    flex: 0.5,
    padding: 10,
    fontWeight: '700',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardButtonTitle: {
    fontWeight: 'bold',
    color: colors['primary-text'],
    alignSelf: 'center',
    fontSize: 18,
  },
  editButtons: {
    flexDirection: 'row',
    marginHorizontal: 30,
    gap: 10,
  },
  backButton: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
  cardDetailsContainer: {
    backgroundColor: colors['secondary-light'],
    marginLeft: 30,
    alignItems: 'stretch',
    marginBottom: 8,
  },
  headerStyle: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  buttonText: {
    color: colors['primary-text'],
    fontSize: 16,
    fontWeight: 'bold',
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
  profileButton: {
    flex: 1,
    height: 50,
  },
  mainButton: {
    flex: 1,
    height: 50,
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: 600,
    marginBottom: 0,
    marginTop: '60%',
    backgroundColor: colors['secondary-light'],
    width: '100%',
    margin: 0,
  },
  closeButton: {
    height: 10,
  },
  closeButtonText: {
    fontFamily: 'Roboto',
  },
});

export default CardDetailPage;
