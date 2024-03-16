import React, { useState } from 'react';
import colors from '../../utils/colorPallete';
import {
  Alert,
  Linking,
  Modal,
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
import PrimaryButtonComponent from '../../components/PrimaryButtonComponent';
import DeleteIcon from '../../assets/images/DeleteIcon.svg';
import ShareIcon from '../../assets/images/ShareIcon.svg';
import BackButtonIcon from '../../assets/images/Arrow.svg';
import CardDetailsShimmer from '../../components/Shimmers/CardDetailsShimmer';
import ShareCardScreen from './ShareCardPage';
import { listCardDetails } from '../../hooks/CardDetailHook';
import Constants from '../../utils/Constants';
import { getLocalItem } from '../../utils/Utils';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { isValidWebsiteUrl } from '../../utils/regexCheck';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import { deleteCard } from '../../hooks/deleteCardHook';

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

const CardDetailPage = ({ route }: any) => {
  const [cardDetail, setCardDetail] = useState<CardDetails>({});
  const [translatedCompanyName, setTranslatedCompanyName] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();
  const [ShareModalVisible, setShareModalVisible] = useState(false);

  const toggleShareModal = () => {
    setShareModalVisible(!ShareModalVisible);
  };
  //Function to toggle delete modal visibility
  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };
  //Function to fetch card details
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

  // useEffect hook to fetch data when component mounts or key changes

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  // Function to handle deletion of card
  const handleDeleteCard = async () => {
    try {
      const userId = (await getLocalItem(Constants.USER_ID)) ?? '';
      const userToken = (await getLocalItem(Constants.USER_JWT)) ?? '';

      const { statusCode, deleteCardResp } = await deleteCard({
        user_id: userId,
        jwtToken: userToken,
        card_id: route.params.card_id,
      });

      if (statusCode === '200') {
        navigation.goBack();
      } else {
        console.log('Delete card failed:', deleteCardResp);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  //function to handle phone number press
  const phonePress = (phoneNumber: string) => {
    if (phoneNumber === '') return;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };
  //function to handle email press
  const emailPress = (emailAddress: string) => {
    if (emailAddress === '') return;
    const url = `mailto:${emailAddress}`;
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };
  //function to handle website press
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

  // Function to copy text to clipboard
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

  const handleTranslate = async () => {
    try {
      const res = await translate(cardDetail.company_name?.toString() || '', { to: 'en' });
      setTranslatedCompanyName(res.text); // Update translated text state
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Translation Error', 'Failed to translate text.');
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
        <CommonImageComponent
          frontImageUri={cardDetail.img_front_link}
          backImageUri={cardDetail.img_back_link}
        />
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
        <TouchableOpacity style={styles.buttonStyle}  onPress={handleTranslate}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('EditCardScreen', {
              cardDetails: cardDetail,
              card_id: route.params.card_id,
            });
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Card details display */}
      <View style={styles.cardDetailsContainer}>
        <CardDetailComponent
          onLongPress={() => {
            longPressToCopy(cardDetail.company_name || '');
          }}
          card_detail={translatedCompanyName || cardDetail.company_name || ''}
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
        <View style={styles.deleteModalButton}>
          <TouchableOpacity style={styles.delete}>
            <PrimaryButtonComponent
              children={<DeleteIcon width={40} height={24} />}
              title={'Delete'}
              textColor={colors['primary-danger']}
              onPressing={toggleDeleteModal}
              isHighlighted={true}
              backgroundColor={colors['accent-white']}
            ></PrimaryButtonComponent>
          </TouchableOpacity>
        </View>

        <View style={styles.mainButton}>
          <PrimaryButtonComponent
            children={<ShareIcon width={40} height={24} />}
            title={'Share'}
            onPressing={toggleShareModal}
          ></PrimaryButtonComponent>
          <BottomSheetComponent
            visibility={ShareModalVisible}
            visibilitySetter={setShareModalVisible}
          >
            <ShareCardScreen
              user_id={''}
              jwt_token={''}
              card_id={route.params.card_id}
              receiver_user_ids={[]}
              visibilitySetter={toggleShareModal}
              cardDetails={cardDetail}
            />
          </BottomSheetComponent>
        </View>

        {/* Modal for delete a card confirmation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={toggleDeleteModal}
        >
          <View style={styles.centeredDeleteView}>
            <View style={styles.deleteModalView}>
              <Text style={styles.deleteModalText}>
                Are you sure you want to delete this card?
              </Text>
              <View style={styles.deleteButtonContainer}>
                <PrimaryButtonComponent
                  title={'Delete'}
                  textColor={colors['primary-danger']}
                  onPressing={handleDeleteCard}
                  backgroundColor={colors['accent-white']}
                  isHighlighted={true}
                />
                <PrimaryButtonComponent
                  title={'Cancel'}
                  onPressing={toggleDeleteModal}
                  backgroundColor={colors['secondary-grey']}
                ></PrimaryButtonComponent>
              </View>
            </View>
          </View>
        </Modal>
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
    marginBottom: 10,
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
  deleteModalButton: {
    flex: 1,
    height: 50,
  },
  mainButton: {
    flex: 1,
    height: 50,
  },
  delete: {
    height: '100%',
  },
  centeredDeleteView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  deleteModalView: {
    backgroundColor: colors['secondary-light'],
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors['primary-text'],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteModalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 20,
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
});

export default CardDetailPage;
