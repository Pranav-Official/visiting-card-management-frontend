import React, { useEffect, useState } from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const CardDetailPage = ({ route }: any) => {
  const [cardDetail, setCardDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

 

  const navigation = useNavigation();
  const [key, setKey] = useState(0);

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
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

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
        <Text style={styles.cardName}>{cardDetail.card_name}</Text>
        <Text style={styles.jobTitle}>{cardDetail.job_title}</Text>
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
              create: true
            });
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetailsContainer}>
        <CardDetailComponent card_detail={cardDetail.company_name || ''}>
          <CompanyName width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent card_detail={cardDetail.phone || ''}>
          <Phone width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent card_detail={cardDetail.email || ''}>
          <Email width={20} height={20} color={'primary-text'} />
        </CardDetailComponent>

        <CardDetailComponent card_detail={cardDetail.company_website || ''}>
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
            onPressing={function () {
              throw new Error('Function not implemented.');
            }}
          ></MainButtonComponent>
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
});

export default CardDetailPage;
