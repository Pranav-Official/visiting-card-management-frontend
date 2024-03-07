import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CompanyIcon from '../../assets/images/company.svg';
import PhoneIcon from '../../assets/images/phone.svg';
import MailIcon from '../../assets/images/mail.svg';
import WebsiteIcon from '../../assets/images/website.svg';
import DesignationIcon from '../../assets/images/jobTitle.svg';
import colors from '../../utils/colorPallete';
import MainButtonComponent from '../../components/MainButtoncomponent';
import CommonImageComponent from '../../components/CommonImageComponent';
import EditInputComponent from '../../components/InputComponent';
import EditCardNameComponent from '../../components/EditCardNameComponent';
import BackButtonIcon from '../../assets/images/Arrow.svg';
import { editCardDetails } from '../../hooks/editCardHook';
import Constants from '../../utils/Constants';
import { getLocalItem } from '../../utils/Utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';

//Edit Card Details Screen
const EditCardDetails = ({ route }: any) => {
  const [cardDetails, setCardDetails] = useState(route.params.cardDetails);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (route.params.cardDetail) {
      setCardDetails(route.params.cardDetails);
    }
  }, [route.params.cardDetails]);
  //If flag is false, function to save the edits
  const saveChanges = async () => {
    try {
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '{}';
      const token = (await getLocalItem(Constants.USER_JWT)) ?? '{}';

      // Filtering out the edited fields
      const editedData = Object.keys(cardDetails)
        .filter((key) => cardDetails[key] !== route.params.cardDetails[key])
        .reduce((obj: any, key) => {
          obj[key] = cardDetails[key];
          return obj;
        }, {});
      //calling editCardDetails Hook
      const response = await editCardDetails({
        user_id,
        token,
        card_id: route.params.card_id,
        updatedData: editedData,
      });

      const isSaved = response.statusCode;

      //if save successful,navigating to cardDetails screen
      if (isSaved === '200') {
        const cardListScreenUpdater = route.params.cardListScreenUpdater;
        const cardDetailsScreenUpdater = route.params.cardDetailsScreenUpdater;
        cardDetailsScreenUpdater((key) => key + 1);
        cardListScreenUpdater((key) => key + 1);
        navigation.navigate('CardStack', {
          screen: 'CardDetailsScreen',
          params: { card_id: route.params.card_id },
        });
      }
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };

  const handleSave = async () => {
    if (route.params.create) {
      navigation.navigate('SetContactNameScreen', {
        cardDetails: cardDetails,
      });
    } else {
      // If create flag is false, call saveChanges function
      await saveChanges();
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setCardDetails({ ...cardDetails, [key]: value });
  };

  return (
    <View style={styles.editContainer}>
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
      <View style={styles.cardNameHead}>
        <EditCardNameComponent
          placeholder={'Card Name'}
          value={cardDetails.card_name}
          setter={(value: string) => handleInputChange('card_name', value)}
          readonly={!route.params.create}
        />
      </View>
      <View style={styles.inputFieldsContainer}>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <DesignationIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Job title"
              header="Job Title"
              hidden={false}
              value={cardDetails.job_title}
              setter={(value: string) => handleInputChange('job_title', value)}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <CompanyIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Company Name"
              header="Company Name"
              hidden={false}
              value={cardDetails.company_name}
              setter={(value: string) =>
                handleInputChange('company_name', value)
              }
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <PhoneIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Phone Number"
              header="Phone Number"
              hidden={false}
              value={cardDetails.phone}
              setter={(value: string) => handleInputChange('phone', value)}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <MailIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="E-mail"
              header="E-mail"
              hidden={false}
              value={cardDetails.email}
              setter={(value: string) => handleInputChange('email', value)}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <WebsiteIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Website"
              header="Website"
              hidden={false}
              value={cardDetails.company_website}
              setter={(value: string) =>
                handleInputChange('company_website', value)
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.save}>
        <MainButtonComponent
          children={undefined}
          title={'Save'}
          onPressing={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: colors['secondary-light'],
  },
  contactName: {
    paddingStart: 10,
    fontSize: 24,
    color: colors['primary-text'],
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 400,
    height: 250,
    backgroundColor: colors['secondary-light'],
    marginTop: 20,
  },
  cardName: {
    fontSize: 35,
    fontWeight: '700',
    color: colors['primary-text'],
  },
  iconField: {
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors['secondary-grey'],
  },
  input: {
    flex: 10,
    paddingRight: 10,
  },
  save: {
    height: 120,
    padding: 30,
  },
  cardNameHead: {
    marginTop: 5,
    marginBottom: 5,
  },
  inputFieldsContainer: {
    marginRight: 25,
    marginLeft: 25,
  },
  backButton: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
});

export default EditCardDetails;
